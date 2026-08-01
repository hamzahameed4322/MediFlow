<?php

namespace App\Http\Controllers;

use App\Http\Requests\Patient\BookAppointmentRequest;
use App\Http\Requests\Patient\CancelAppointmentRequest;
use App\Http\Requests\Patient\UpdatePatientProfileRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Models\Bill;
use App\Models\DoctorProfile;
use App\Models\DoctorReview;
use App\Models\Prescription;
use App\Services\ClinicWorkflowService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PatientController extends Controller
{
    /**
     * Render the patient dashboard.
     */
    public function dashboard(): Response
    {
        $user = Auth::user();
        $patientProfile = $user->patientProfile;
        $today = now()->toDateString();

        // Upcoming Appointment
        $upcomingAppointment = Appointment::query()
            ->select(['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'reason', 'status', 'cancelled_by', 'cancel_reason', 'reject_reason', 'created_at', 'updated_at'])
            ->with(['doctor.user:id,name,email', 'doctor:id,user_id,specialization,qualification,experience,consultation_fee'])
            ->where('patient_id', $patientProfile->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->whereDate('appointment_date', '>=', $today)
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->first();

        // Latest Prescription
        $latestPrescription = Prescription::query()
            ->select(['id', 'consultation_id', 'instructions', 'created_at', 'updated_at'])
            ->with([
                'consultation:id,appointment_id,symptoms,diagnosis,notes,created_at,updated_at',
                'consultation.appointment:id,patient_id,doctor_id,appointment_date,appointment_time,status,created_at,updated_at',
                'consultation.appointment.doctor.user:id,name,email',
                'items:id,prescription_id,medicine_name,dosage,frequency,duration,created_at,updated_at',
            ])
            ->whereHas('consultation.appointment', function ($query) use ($patientProfile) {
                $query->where('patient_id', $patientProfile->id);
            })
            ->latest('created_at')
            ->first();

        // Recent Bills
        $recentBills = Bill::query()
            ->select(['id', 'appointment_id', 'amount', 'status', 'created_at', 'updated_at'])
            ->with(['appointment:id,patient_id,doctor_id,appointment_date,appointment_time,status,created_at,updated_at', 'appointment.doctor.user:id,name,email'])
            ->whereHas('appointment', function ($query) use ($patientProfile) {
                $query->where('patient_id', $patientProfile->id);
            })
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();

        return Inertia::render('patient/dashboard', [
            'upcomingAppointment' => $upcomingAppointment,
            'latestPrescription' => $latestPrescription,
            'recentBills' => $recentBills,
        ]);
    }

    /**
     * View/Edit Patient Profile.
     */
    public function editProfile(): Response
    {
        $user = Auth::user();
        $patientProfile = $user->patientProfile;

        $profileSummary = Appointment::query()
            ->where('patient_id', $patientProfile->id)
            ->selectRaw('COUNT(*) as total_appointments')
            ->selectRaw("SUM(CASE WHEN status IN ('pending', 'confirmed') THEN 1 ELSE 0 END) as upcoming_appointments")
            ->selectRaw("SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_appointments")
            ->first();

        return Inertia::render('patient/profile', [
            'patient' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $patientProfile->phone,
                'gender' => $patientProfile->gender,
                'dob' => $patientProfile->dob ? $patientProfile->dob->format('Y-m-d') : null,
                'address' => $patientProfile->address,
                'allergies' => $patientProfile->allergies,
                'major_diseases' => $patientProfile->major_diseases,
            ],
            'stats' => [
                'totalAppointments' => (int) ($profileSummary->total_appointments ?? 0),
                'upcomingAppointments' => (int) ($profileSummary->upcoming_appointments ?? 0),
                'completedAppointments' => (int) ($profileSummary->completed_appointments ?? 0),
            ],
        ]);
    }

    /**
     * Update Patient Profile.
     */
    public function updateProfile(UpdatePatientProfileRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $patientProfile = $user->patientProfile;
        $validated = $request->validated();

        $user->update([
            'name' => $validated['name'],
        ]);

        $patientProfile->update([
            'phone' => $validated['phone'],
            'gender' => $validated['gender'],
            'dob' => $validated['dob'] ?? null,
            'address' => $validated['address'] ?? null,
            'allergies' => $validated['allergies'] ?? null,
            'major_diseases' => $validated['major_diseases'] ?? null,
        ]);

        return redirect()->back()->with('status', 'Profile updated successfully!');
    }

    /**
     * Browse active doctors.
     */
    public function browseDoctors(Request $request): Response
    {
        $patientProfile = Auth::user()->patientProfile;

        $query = DoctorProfile::query()
            ->select(['id', 'user_id', 'specialization', 'qualification', 'experience', 'consultation_fee', 'created_at', 'updated_at'])
            ->with([
                'user:id,name,email,status',
                'schedules:id,doctor_id,day,start_time,end_time,duration,created_at,updated_at',
                'reviews' => function ($q) {
                    $q->with('patient.user:id,name')->latest()->take(5);
                },
            ])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->whereHas('user', function ($q) {
                $q->where('status', 'active');
            });

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('specialization', 'like', "%{$search}%")
                    ->orWhere('qualification', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($u) use ($search) {
                        $u->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $doctors = $query->orderBy('specialization')
            ->orderBy('id')
            ->paginate(12)
            ->withQueryString();

        // Which appointments has this patient already reviewed?
        $reviewedAppointmentIds = DoctorReview::where('patient_id', $patientProfile->id)
            ->pluck('appointment_id')
            ->toArray();

        return Inertia::render('patient/doctors', [
            'doctors' => $doctors,
            'filters' => $request->only('search'),
            'reviewedAppointmentIds' => $reviewedAppointmentIds,
        ]);
    }

    /**
     * Get available slots for a doctor on a specific date.
     */
    public function availableSlots(Request $request, DoctorProfile $doctor, ClinicWorkflowService $workflow): JsonResponse
    {
        $request->validate([
            'date' => ['required', 'date', 'after_or_equal:today'],
        ]);

        return response()->json($workflow->availableSlots($doctor, $request->date));
    }

    /**
     * Book appointment.
     */
    public function bookAppointment(BookAppointmentRequest $request, ClinicWorkflowService $workflow): RedirectResponse
    {
        $workflow->bookAppointment($request->user(), $request->validated());

        return redirect()->route('patient.appointments')->with('status', 'Appointment requested successfully!');
    }

    /**
     * View appointments list.
     */
    public function appointments(Request $request): Response
    {
        $patientProfile = Auth::user()->patientProfile;

        $query = Appointment::query()
            ->select(['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'reason', 'status', 'cancelled_by', 'cancel_reason', 'reject_reason', 'created_at', 'updated_at'])
            ->with(['doctor.user:id,name,email', 'doctor:id,user_id,specialization,qualification,experience,consultation_fee'])
            ->where('patient_id', $patientProfile->id);

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $status = $request->input('status');

            if ($status === 'cancelled_by_patient') {
                $query->where('status', 'cancelled')->where('cancelled_by', 'patient');
            } elseif ($status === 'cancelled_by_doctor') {
                $query->where('status', 'cancelled')->where('cancelled_by', 'doctor');
            } else {
                $query->where('status', $status);
            }
        }

        $appointments = $query->orderByDesc('appointment_date')
            ->orderByDesc('appointment_time')
            ->paginate(10)
            ->withQueryString();

        $counts = [
            'pending' => Appointment::where('patient_id', $patientProfile->id)->where('status', 'pending')->count(),
            'confirmed' => Appointment::where('patient_id', $patientProfile->id)->where('status', 'confirmed')->count(),
        ];

        return Inertia::render('patient/appointments', [
            'appointments' => AppointmentResource::collection($appointments),
            'filters' => $request->only(['status']),
            'counts' => $counts,
        ]);
    }

    /**
     * Cancel an appointment.
     */
    public function cancelAppointment(CancelAppointmentRequest $request, Appointment $appointment, ClinicWorkflowService $workflow): RedirectResponse
    {
        $workflow->cancelAppointment($request->user(), $appointment, $request->validated()['cancel_reason'], 'patient');

        return redirect()->back()->with('status', 'Appointment cancelled successfully!');
    }

    /**
     * View My Reviews page (pending + submitted).
     */
    public function reviews(): Response
    {
        $patientProfile = Auth::user()->patientProfile;

        // Completed appointments that don't have a review yet
        $pendingReviews = Appointment::query()
            ->select(['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'status'])
            ->with(['doctor.user:id,name,email', 'doctor:id,user_id,specialization'])
            ->where('patient_id', $patientProfile->id)
            ->where('status', 'completed')
            ->whereDoesntHave('review')
            ->orderByDesc('appointment_date')
            ->get();

        // Reviews already submitted by this patient
        $submittedReviews = DoctorReview::query()
            ->where('patient_id', $patientProfile->id)
            ->with([
                'doctor.user:id,name,email',
                'doctor:id,user_id,specialization',
                'appointment:id,appointment_date',
            ])
            ->latest()
            ->get();

        return Inertia::render('patient/reviews', [
            'pendingReviews' => $pendingReviews,
            'submittedReviews' => $submittedReviews,
        ]);
    }

    /**
     * View Bills list.
     */
    public function bills(): Response
    {
        $patientProfile = Auth::user()->patientProfile;

        $bills = Bill::query()
            ->select(['id', 'appointment_id', 'amount', 'status', 'created_at', 'updated_at'])
            ->with(['appointment:id,patient_id,doctor_id,appointment_date,appointment_time,status,created_at,updated_at', 'appointment.doctor.user:id,name,email'])
            ->whereHas('appointment', function ($query) use ($patientProfile) {
                $query->where('patient_id', $patientProfile->id);
            })
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('patient/bills', [
            'bills' => $bills,
        ]);
    }

    /**
     * View Medical History.
     */
    public function medicalHistory(): Response
    {
        $patientProfile = Auth::user()->patientProfile;

        $history = Appointment::query()
            ->select(['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'reason', 'status', 'cancelled_by', 'cancel_reason', 'reject_reason', 'created_at', 'updated_at'])
            ->with([
                'consultation:id,appointment_id,symptoms,diagnosis,notes,created_at,updated_at',
                'consultation.prescription:id,consultation_id,instructions,created_at,updated_at',
                'consultation.prescription.items:id,prescription_id,medicine_name,dosage,frequency,duration,created_at,updated_at',
                'doctor.user:id,name,email',
            ])
            ->where('patient_id', $patientProfile->id)
            ->where('status', 'completed')
            ->orderByDesc('appointment_date')
            ->orderByDesc('appointment_time')
            ->get();

        return Inertia::render('patient/medical-history', [
            'history' => $history,
            'patient' => [
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
                'phone' => $patientProfile->phone,
                'gender' => $patientProfile->gender,
                'dob' => $patientProfile->dob ? $patientProfile->dob->format('Y-m-d') : null,
            ],
        ]);
    }
}
