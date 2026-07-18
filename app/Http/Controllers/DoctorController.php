<?php

namespace App\Http\Controllers;

use App\Http\Requests\Doctor\CancelAppointmentRequest;
use App\Http\Requests\Doctor\RejectAppointmentRequest;
use App\Http\Requests\Doctor\StoreConsultationRequest;
use App\Http\Requests\Doctor\StoreScheduleRequest;
use App\Http\Requests\Doctor\UpdateDoctorProfileRequest;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\BillResource;
use App\Http\Resources\PatientProfileResource;
use App\Models\Appointment;
use App\Models\Bill;
use App\Models\DoctorSchedule;
use App\Models\PatientProfile;
use App\Services\ClinicWorkflowService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DoctorController extends Controller
{
    /**
     * Render the doctor dashboard.
     */
    public function dashboard(): Response
    {
        $doctorProfile = Auth::user()->doctorProfile;
        $today = now()->toDateString();

        // Today's Appointments
        $todayAppointments = Appointment::query()
            ->select(['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'reason', 'status', 'cancelled_by', 'cancel_reason', 'reject_reason', 'created_at', 'updated_at'])
            ->with(['patient.user:id,name,email', 'patient:id,user_id,phone,gender,dob,address,allergies,major_diseases'])
            ->where('doctor_id', $doctorProfile->id)
            ->whereDate('appointment_date', $today)
            ->whereIn('status', ['confirmed', 'completed'])
            ->orderBy('appointment_time')
            ->get();

        // Pending Requests
        $pendingRequests = Appointment::query()
            ->select(['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'reason', 'status', 'cancelled_by', 'cancel_reason', 'reject_reason', 'created_at', 'updated_at'])
            ->with(['patient.user:id,name,email', 'patient:id,user_id,phone,gender,dob,address,allergies,major_diseases'])
            ->where('doctor_id', $doctorProfile->id)
            ->where('status', 'pending')
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->get();

        // Recent Patients
        $recentPatients = PatientProfile::query()
            ->select(['id', 'user_id', 'phone', 'gender', 'dob', 'address', 'allergies', 'major_diseases', 'created_at', 'updated_at'])
            ->with(['user:id,name,email'])
            ->withMax([
                'appointments as last_seen_at' => function ($query) use ($doctorProfile) {
                    $query->where('doctor_id', $doctorProfile->id)
                        ->whereIn('status', ['confirmed', 'completed']);
                },
            ], 'appointment_date')
            ->whereHas('appointments', function ($query) use ($doctorProfile) {
                $query->where('doctor_id', $doctorProfile->id)
                    ->whereIn('status', ['confirmed', 'completed']);
            })
            ->orderByDesc('last_seen_at')
            ->limit(5)
            ->get();

        return Inertia::render('doctor/dashboard', [
            'todayAppointments' => AppointmentResource::collection($todayAppointments),
            'pendingRequests' => AppointmentResource::collection($pendingRequests),
            'recentPatients' => PatientProfileResource::collection($recentPatients),
        ]);
    }

    /**
     * Edit doctor profile.
     */
    public function editProfile(): Response
    {
        $user = Auth::user();
        $doctorProfile = $user->doctorProfile()->withCount([
            'schedules',
            'appointments',
            'appointments as pending_appointments_count' => function ($query) {
                $query->where('status', 'pending');
            },
            'appointments as completed_appointments_count' => function ($query) {
                $query->where('status', 'completed');
            },
        ])->firstOrFail();

        return Inertia::render('doctor/profile', [
            'doctor' => [
                'id' => $doctorProfile->id,
                'name' => $user->name,
                'email' => $user->email,
                'specialization' => $doctorProfile->specialization,
                'qualification' => $doctorProfile->qualification,
                'experience' => $doctorProfile->experience,
                'consultation_fee' => (float) $doctorProfile->consultation_fee,
                'schedules_count' => $doctorProfile->schedules_count,
                'appointments_count' => $doctorProfile->appointments_count,
                'pending_appointments_count' => $doctorProfile->pending_appointments_count,
                'completed_appointments_count' => $doctorProfile->completed_appointments_count,
            ],
        ]);
    }

    /**
     * Update doctor profile.
     */
    public function updateProfile(UpdateDoctorProfileRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $doctorProfile = $user->doctorProfile;
        $validated = $request->validated();

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        $doctorProfile->update([
            'specialization' => $validated['specialization'],
            'qualification' => $validated['qualification'],
            'experience' => $validated['experience'],
            'consultation_fee' => $validated['consultation_fee'],
        ]);

        return redirect()->back()->with('status', 'Profile updated successfully!');
    }

    /**
     * List schedules.
     */
    public function schedules(): Response
    {
        $doctorProfile = Auth::user()->doctorProfile;
        $schedules = DoctorSchedule::query()
            ->select(['id', 'doctor_id', 'day', 'start_time', 'end_time', 'duration', 'created_at', 'updated_at'])
            ->where('doctor_id', $doctorProfile->id)
            ->orderByRaw("CASE day
                WHEN 'Monday' THEN 1
                WHEN 'Tuesday' THEN 2
                WHEN 'Wednesday' THEN 3
                WHEN 'Thursday' THEN 4
                WHEN 'Friday' THEN 5
                WHEN 'Saturday' THEN 6
                WHEN 'Sunday' THEN 7
                ELSE 8
            END")
            ->orderBy('start_time')
            ->get();

        return Inertia::render('doctor/schedules', [
            'schedules' => $schedules,
        ]);
    }

    /**
     * Store Doctor Schedule.
     */
    public function storeSchedule(StoreScheduleRequest $request): RedirectResponse
    {
        $doctorProfile = Auth::user()->doctorProfile;
        $validated = $request->validated();

        $start = Carbon::parse($validated['start_time'])->format('H:i:s');
        $end = Carbon::parse($validated['end_time'])->format('H:i:s');

        if ($start >= $end) {
            return redirect()->back()->withErrors(['start_time' => 'Start time must be before end time.']);
        }

        // Check for overlaps on the same day for this doctor
        $overlap = DoctorSchedule::where('doctor_id', $doctorProfile->id)
            ->where('day', $validated['day'])
            ->where(function ($query) use ($start, $end) {
                $query->where(function ($q) use ($start) {
                    $q->where('start_time', '<=', $start)->where('end_time', '>', $start);
                })->orWhere(function ($q) use ($end) {
                    $q->where('start_time', '<', $end)->where('end_time', '>=', $end);
                })->orWhere(function ($q) use ($start, $end) {
                    $q->where('start_time', '>=', $start)->where('end_time', '<=', $end);
                });
            })
            ->exists();

        if ($overlap) {
            return redirect()->back()->withErrors(['day' => 'This schedule overlaps with an existing schedule on '.$validated['day']]);
        }

        DoctorSchedule::create([
            'doctor_id' => $doctorProfile->id,
            'day' => $validated['day'],
            'start_time' => $start,
            'end_time' => $end,
            'duration' => $validated['duration'],
        ]);

        return redirect()->back()->with('status', 'Schedule created successfully!');
    }

    /**
     * Delete Doctor Schedule.
     */
    public function deleteSchedule(DoctorSchedule $schedule): RedirectResponse
    {
        Gate::authorize('delete', $schedule);

        $schedule->delete();

        return redirect()->back()->with('status', 'Schedule deleted successfully!');
    }

    /**
     * List appointments.
     */
    public function appointments(Request $request): Response
    {
        $doctorProfile = Auth::user()->doctorProfile;

        $query = Appointment::query()
            ->select(['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'reason', 'status', 'cancelled_by', 'cancel_reason', 'reject_reason', 'created_at', 'updated_at'])
            ->with(['patient.user:id,name,email', 'patient:id,user_id,phone,gender,dob,address,allergies,major_diseases'])
            ->where('doctor_id', $doctorProfile->id);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('patient.user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        $appointments = $query->orderByDesc('appointment_date')
            ->orderByDesc('appointment_time')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('doctor/appointments', [
            'appointments' => AppointmentResource::collection($appointments),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Approve a pending appointment.
     */
    public function approveAppointment(Appointment $appointment, ClinicWorkflowService $workflow): RedirectResponse
    {
        Gate::authorize('update', $appointment);

        $workflow->approveAppointment(Auth::user(), $appointment);

        return redirect()->back()->with('status', 'Appointment confirmed successfully!');
    }

    /**
     * Reject a pending appointment.
     */
    public function rejectAppointment(RejectAppointmentRequest $request, Appointment $appointment, ClinicWorkflowService $workflow): RedirectResponse
    {
        Gate::authorize('update', $appointment);

        $workflow->rejectAppointment(Auth::user(), $appointment, $request->validated()['reject_reason']);

        return redirect()->back()->with('status', 'Appointment rejected successfully!');
    }

    /**
     * Cancel a confirmed appointment.
     */
    public function cancelAppointment(CancelAppointmentRequest $request, Appointment $appointment, ClinicWorkflowService $workflow): RedirectResponse
    {
        Gate::authorize('update', $appointment);

        $workflow->cancelAppointment(Auth::user(), $appointment, $request->validated()['cancel_reason'], 'doctor');

        return redirect()->back()->with('status', 'Confirmed appointment cancelled successfully!');
    }

    /**
     * Mark a confirmed appointment as No Show.
     */
    public function markNoShow(Appointment $appointment, ClinicWorkflowService $workflow): RedirectResponse
    {
        Gate::authorize('update', $appointment);

        $workflow->markNoShow(Auth::user(), $appointment);

        return redirect()->back()->with('status', 'Appointment marked as No Show.');
    }

    /**
     * Store consultation, prescription and generate bill.
     */
    public function storeConsultation(StoreConsultationRequest $request, Appointment $appointment, ClinicWorkflowService $workflow): RedirectResponse
    {
        Gate::authorize('update', $appointment);

        $workflow->recordConsultation(Auth::user(), $appointment, $request->validated());

        return redirect()->route('doctor.appointments')->with('status', 'Consultation recorded & prescription/bill generated successfully!');
    }

    /**
     * View Bills.
     */
    public function bills(Request $request): Response
    {
        $doctorProfile = Auth::user()->doctorProfile;

        $query = Bill::with(['appointment.patient.user'])
            ->whereHas('appointment', function ($q) use ($doctorProfile) {
                $q->where('doctor_id', $doctorProfile->id);
            });

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('appointment.patient.user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        $bills = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('doctor/bills', [
            'bills' => BillResource::collection($bills),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Update payment status of a bill.
     */
    public function markBillPaid(Bill $bill, ClinicWorkflowService $workflow): RedirectResponse
    {
        Gate::authorize('update', $bill);

        $workflow->markBillPaid(Auth::user(), $bill);

        return redirect()->back()->with('status', 'Bill marked as Paid successfully!');
    }

    /**
     * View patient history.
     */
    public function patientHistory(PatientProfile $patient): Response
    {
        $history = Appointment::query()
            ->select(['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'reason', 'status', 'cancelled_by', 'cancel_reason', 'reject_reason', 'created_at', 'updated_at'])
            ->with([
                'consultation:id,appointment_id,symptoms,diagnosis,notes,created_at,updated_at',
                'consultation.prescription:id,consultation_id,instructions,created_at,updated_at',
                'consultation.prescription.items:id,prescription_id,medicine_name,dosage,frequency,duration,created_at,updated_at',
                'doctor.user:id,name,email',
            ])
            ->where('patient_id', $patient->id)
            ->where('status', 'completed')
            ->orderByDesc('appointment_date')
            ->orderByDesc('appointment_time')
            ->get();

        return Inertia::render('doctor/patient-history', [
            'patient' => new PatientProfileResource($patient->load('user:id,name,email')),
            'history' => AppointmentResource::collection($history),
        ]);
    }
}
