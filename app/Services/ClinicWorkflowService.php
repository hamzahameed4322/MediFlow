<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\Bill;
use App\Models\Consultation;
use App\Models\DoctorProfile;
use App\Models\DoctorSchedule;
use App\Models\PatientProfile;
use App\Models\Prescription;
use App\Models\PrescriptionItem;
use App\Models\User;
use App\Notifications\AppointmentCancelledNotification;
use App\Notifications\AppointmentNoShowNotification;
use App\Notifications\AppointmentRejectedNotification;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class ClinicWorkflowService
{
    /**
     * Get the available slots for a doctor on a specific date.
     *
     * @return array<int, string>
     */
    public function availableSlots(DoctorProfile $doctor, string $date): array
    {
        $dayOfWeek = Carbon::parse($date)->format('l');

        $schedule = DoctorSchedule::where('doctor_id', $doctor->id)
            ->where('day', $dayOfWeek)
            ->first();

        if (! $schedule) {
            return [];
        }

        $startTime = Carbon::createFromFormat('H:i:s', $schedule->start_time);
        $endTime = Carbon::createFromFormat('H:i:s', $schedule->end_time);
        $duration = $schedule->duration;

        $slots = [];
        $current = $startTime->copy();

        while ($current->copy()->addMinutes($duration)->lte($endTime)) {
            $slots[] = $current->format('H:i:s');
            $current->addMinutes($duration);
        }

        $bookedTimes = Appointment::where('doctor_id', $doctor->id)
            ->whereDate('appointment_date', $date)
            ->whereIn('status', ['pending', 'confirmed', 'completed'])
            ->pluck('appointment_time')
            ->map(fn (string $time): string => Carbon::parse($time)->format('H:i:s'))
            ->all();

        $available = array_values(array_filter($slots, fn (string $slot): bool => ! in_array($slot, $bookedTimes, true)));

        if (Carbon::parse($date)->isToday()) {
            $nowString = Carbon::now()->format('H:i:s');
            $available = array_values(array_filter($available, fn (string $slot): bool => $slot > $nowString));
        }

        return $available;
    }

    /**
     * Create a new appointment request for a patient.
     */
    public function bookAppointment(User $user, array $data): Appointment
    {
        $patientProfile = $this->patientProfile($user);
        $doctor = DoctorProfile::with('user')->findOrFail((int) $data['doctor_id']);

        if ($doctor->user->status !== 'active') {
            throw ValidationException::withMessages([
                'doctor_id' => 'This doctor is currently not active.',
            ]);
        }

        $timeString = Carbon::parse($data['appointment_time'])->format('H:i:s');

        return DB::transaction(function () use ($patientProfile, $doctor, $data, $timeString): Appointment {
            $duplicate = Appointment::where('patient_id', $patientProfile->id)
                ->whereDate('appointment_date', $data['appointment_date'])
                ->where('appointment_time', $timeString)
                ->whereIn('status', ['pending', 'confirmed'])
                ->exists();

            if ($duplicate) {
                throw ValidationException::withMessages([
                    'appointment_time' => 'You already have a pending or confirmed appointment booked at this exact date and time.',
                ]);
            }

            $slotBooked = Appointment::where('doctor_id', $doctor->id)
                ->whereDate('appointment_date', $data['appointment_date'])
                ->where('appointment_time', $timeString)
                ->whereIn('status', ['pending', 'confirmed', 'completed'])
                ->exists();

            if ($slotBooked) {
                throw ValidationException::withMessages([
                    'appointment_time' => 'This slot is no longer available.',
                ]);
            }

            return Appointment::create([
                'patient_id' => $patientProfile->id,
                'doctor_id' => $doctor->id,
                'appointment_date' => $data['appointment_date'],
                'appointment_time' => $timeString,
                'reason' => $data['reason'] ?? null,
                'status' => 'pending',
            ]);
        });
    }

    /**
     * Cancel an appointment for either a patient or a doctor.
     */
    public function cancelAppointment(User $user, Appointment $appointment, string $reason, string $actor): Appointment
    {
        if (! in_array($appointment->status, ['pending', 'confirmed'], true)) {
            throw ValidationException::withMessages([
                'status' => 'Cannot cancel appointments that are not pending or confirmed.',
            ]);
        }

        if ($actor === 'patient') {
            $patientProfile = $this->patientProfile($user);

            if ($appointment->patient_id !== $patientProfile->id) {
                throw new AuthorizationException('You cannot cancel another patient\'s appointment.');
            }
        } else {
            $doctorProfile = $this->doctorProfile($user);

            if ($appointment->doctor_id !== $doctorProfile->id) {
                throw new AuthorizationException('You cannot manage another doctor\'s appointment.');
            }
        }

        $appointment->update([
            'status' => 'cancelled',
            'cancelled_by' => $actor,
            'cancel_reason' => $reason,
        ]);

        $appointment->refresh();

        $appointment->load(['patient.user', 'doctor.user']);
        try {
            if ($actor === 'patient') {
                $appointment->doctor->user->notify(new AppointmentCancelledNotification($appointment, $actor, $reason));
            } else {
                $appointment->patient->user->notify(new AppointmentCancelledNotification($appointment, $actor, $reason));
            }
        } catch (TransportExceptionInterface $exception) {
            report($exception);
        }

        return $appointment;
    }

    /**
     * Approve a pending appointment.
     */
    public function approveAppointment(User $user, Appointment $appointment): Appointment
    {
        $doctorProfile = $this->doctorProfile($user);

        $this->ensureDoctorOwnsAppointment($doctorProfile, $appointment);

        if ($appointment->status !== 'pending') {
            throw ValidationException::withMessages([
                'status' => 'Only pending appointments can be approved.',
            ]);
        }

        $appointment->update([
            'status' => 'confirmed',
        ]);

        return $appointment->refresh();
    }

    /**
     * Reject a pending appointment.
     */
    public function rejectAppointment(User $user, Appointment $appointment, string $reason): Appointment
    {
        $doctorProfile = $this->doctorProfile($user);

        $this->ensureDoctorOwnsAppointment($doctorProfile, $appointment);

        if ($appointment->status !== 'pending') {
            throw ValidationException::withMessages([
                'status' => 'Only pending appointments can be rejected.',
            ]);
        }

        $appointment->update([
            'status' => 'rejected',
            'reject_reason' => $reason,
        ]);

        $appointment->refresh();

        $appointment->load(['patient.user', 'doctor.user']);
        try {
            $appointment->patient->user->notify(new AppointmentRejectedNotification($appointment, $reason));
        } catch (TransportExceptionInterface $exception) {
            report($exception);
        }

        return $appointment;
    }

    /**
     * Mark a confirmed appointment as no-show.
     */
    public function markNoShow(User $user, Appointment $appointment): Appointment
    {
        $doctorProfile = $this->doctorProfile($user);

        $this->ensureDoctorOwnsAppointment($doctorProfile, $appointment);

        if ($appointment->status !== 'confirmed') {
            throw ValidationException::withMessages([
                'status' => 'Only confirmed appointments can be marked as No Show.',
            ]);
        }

        $appointment->update([
            'status' => 'no_show',
        ]);

        $appointment->refresh();

        $appointment->load(['patient.user', 'doctor.user']);
        try {
            $appointment->patient->user->notify(new AppointmentNoShowNotification($appointment));
        } catch (TransportExceptionInterface $exception) {
            report($exception);
        }

        return $appointment;
    }

    /**
     * Record the consultation, prescription, and bill for a confirmed appointment.
     */
    public function recordConsultation(User $user, Appointment $appointment, array $data): Appointment
    {
        $doctorProfile = $this->doctorProfile($user);

        $this->ensureDoctorOwnsAppointment($doctorProfile, $appointment);

        if ($appointment->status !== 'confirmed') {
            throw ValidationException::withMessages([
                'status' => 'Consultations can only be recorded for confirmed appointments.',
            ]);
        }

        return DB::transaction(function () use ($appointment, $doctorProfile, $data): Appointment {
            $consultation = Consultation::create([
                'appointment_id' => $appointment->id,
                'symptoms' => $data['symptoms'],
                'diagnosis' => $data['diagnosis'],
                'notes' => $data['notes'] ?? null,
            ]);

            $prescription = Prescription::create([
                'consultation_id' => $consultation->id,
                'instructions' => $data['instructions'] ?? null,
            ]);

            foreach ($data['medicines'] as $item) {
                PrescriptionItem::create([
                    'prescription_id' => $prescription->id,
                    'medicine_name' => $item['medicine_name'],
                    'dosage' => $item['dosage'],
                    'frequency' => $item['frequency'],
                    'duration' => $item['duration'],
                ]);
            }

            Bill::create([
                'appointment_id' => $appointment->id,
                'amount' => $doctorProfile->consultation_fee,
                'status' => 'unpaid',
            ]);

            $appointment->update([
                'status' => 'completed',
            ]);

            return $appointment->refresh();
        });
    }

    /**
     * Mark a bill as paid.
     */
    public function markBillPaid(User $user, Bill $bill): Bill
    {
        $doctorProfile = $this->doctorProfile($user);
        $bill->loadMissing('appointment');

        if ($bill->appointment->doctor_id !== $doctorProfile->id) {
            throw new AuthorizationException('You cannot manage another doctor\'s bill.');
        }

        $bill->update([
            'status' => 'paid',
        ]);

        return $bill->refresh();
    }

    /**
     * Resolve a patient's profile or fail.
     */
    private function patientProfile(User $user): PatientProfile
    {
        $patientProfile = $user->patientProfile;

        if (! $patientProfile) {
            throw new ModelNotFoundException('Patient profile not found.');
        }

        return $patientProfile;
    }

    /**
     * Resolve a doctor's profile or fail.
     */
    private function doctorProfile(User $user): DoctorProfile
    {
        $doctorProfile = $user->doctorProfile;

        if (! $doctorProfile) {
            throw new ModelNotFoundException('Doctor profile not found.');
        }

        return $doctorProfile;
    }

    /**
     * Ensure the doctor owns the appointment.
     */
    private function ensureDoctorOwnsAppointment(DoctorProfile $doctorProfile, Appointment $appointment): void
    {
        if ($appointment->doctor_id !== $doctorProfile->id) {
            throw new AuthorizationException('You cannot manage another doctor\'s appointment.');
        }
    }
}
