<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\StoreDoctorRequest;
use App\Http\Requests\Admin\UpdateDoctorRequest;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\BillResource;
use App\Http\Resources\ConsultationResource;
use App\Http\Resources\DoctorProfileResource;
use App\Http\Resources\PatientProfileResource;
use App\Http\Resources\PrescriptionResource;
use App\Models\Appointment;
use App\Models\Bill;
use App\Models\Consultation;
use App\Models\DoctorProfile;
use App\Models\DoctorReview;
use App\Models\PatientProfile;
use App\Models\Prescription;
use App\Models\User;
use App\Notifications\DoctorCredentialsNotification;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class AdminController extends Controller
{
    /**
     * Render the admin dashboard.
     */
    public function dashboard(): Response
    {
        $today = now()->toDateString();

        $totalPatients = User::where('role', 'patient')->count();
        $totalDoctors = User::where('role', 'doctor')->count();
        $totalAppointments = Appointment::count();
        $totalClinics = 1;

        $todayAppointments = Appointment::whereDate('appointment_date', $today)->count();
        $pendingAppointments = Appointment::where('status', 'pending')->count();
        $cancelledAppointments = Appointment::where('status', 'cancelled')->count();
        $completedConsultations = Consultation::count();
        $todayRevenue = (float) Bill::where('status', 'paid')->whereDate('created_at', $today)->sum('amount');
        $monthlyRevenue = (float) Bill::where('status', 'paid')->whereMonth('created_at', now()->month)->whereYear('created_at', now()->year)->sum('amount');
        $newRegistrations = User::whereDate('created_at', $today)->count();

        $revenuePaid = Bill::where('status', 'paid')->sum('amount');
        $revenueUnpaid = Bill::where('status', 'unpaid')->sum('amount');

        $monthlyBookings = Appointment::selectRaw(
            DB::connection()->getDriverName() === 'sqlite'
                ? "strftime('%Y-%m', appointment_date) as month, count(id) as count"
                : "DATE_FORMAT(appointment_date, '%Y-%m') as month, count(id) as count"
        )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalPatients' => $totalPatients,
                'totalDoctors' => $totalDoctors,
                'totalAppointments' => $totalAppointments,
                'totalClinics' => $totalClinics,
                'todayAppointments' => $todayAppointments,
                'pendingAppointments' => $pendingAppointments,
                'cancelledAppointments' => $cancelledAppointments,
                'completedConsultations' => $completedConsultations,
                'todayRevenue' => $todayRevenue,
                'monthlyRevenue' => $monthlyRevenue,
                'newRegistrations' => $newRegistrations,
                'revenuePaid' => (float) $revenuePaid,
                'revenueUnpaid' => (float) $revenueUnpaid,
            ],
            'monthlyBookings' => Inertia::defer(fn () => $monthlyBookings, rescue: true),
            'statusDistribution' => Inertia::defer(fn () => [
                'pending' => Appointment::where('status', 'pending')->count(),
                'confirmed' => Appointment::where('status', 'confirmed')->count(),
                'completed' => Appointment::where('status', 'completed')->count(),
                'cancelled' => Appointment::where('status', 'cancelled')->count(),
                'rejected' => Appointment::where('status', 'rejected')->count(),
                'no_show' => Appointment::where('status', 'no_show')->count(),
            ], rescue: true),
        ]);
    }

    /**
     * List all patient accounts.
     */
    public function users(): Response
    {
        return Inertia::render('admin/users', [
            'patients' => PatientProfileResource::collection(
                PatientProfile::query()->with('user')->orderByDesc('created_at')->paginate(10),
            ),
        ]);
    }

    /**
     * Toggle status (active/suspended) of a patient.
     */
    public function toggleUserStatus(User $user): RedirectResponse
    {
        if ($user->role === 'admin') {
            abort(403);
        }

        $newStatus = $user->status === 'suspended' ? 'active' : 'suspended';
        $user->update(['status' => $newStatus]);

        return redirect()->back()->with('status', 'User status updated successfully to '.$newStatus);
    }

    /**
     * List doctors.
     */
    public function doctors(): Response
    {
        return Inertia::render('admin/doctors', [
            'doctors' => DoctorProfileResource::collection(
                DoctorProfile::query()->with(['user', 'schedules'])->orderBy('id')->get(),
            ),
        ]);
    }

    /**
     * Store new doctor user and profile.
     */
    public function storeDoctor(StoreDoctorRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $createdDoctor = DB::transaction(function () use ($validated): User {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'doctor',
                'status' => 'active',
            ]);

            DoctorProfile::create([
                'user_id' => $user->id,
                'specialization' => $validated['specialization'],
                'qualification' => $validated['qualification'],
                'experience' => $validated['experience'],
                'consultation_fee' => $validated['consultation_fee'],
            ]);

            return $user;
        });

        try {
            $createdDoctor->notify(new DoctorCredentialsNotification($validated['password']));
        } catch (TransportExceptionInterface $exception) {
            report($exception);
        }

        return redirect()->back()->with('status', 'Doctor account created successfully!');
    }

    /**
     * Update doctor profile.
     */
    public function updateDoctor(UpdateDoctorRequest $request, DoctorProfile $doctor): RedirectResponse
    {
        $user = $doctor->user;
        $validated = $request->validated();

        DB::transaction(function () use ($user, $doctor, $validated): void {
            $user->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
            ]);

            $doctor->update([
                'specialization' => $validated['specialization'],
                'qualification' => $validated['qualification'],
                'experience' => $validated['experience'],
                'consultation_fee' => $validated['consultation_fee'],
            ]);
        });

        return redirect()->back()->with('status', 'Doctor profile updated successfully!');
    }

    /**
     * Toggle doctor active/suspended status.
     */
    public function toggleDoctorStatus(DoctorProfile $doctor): RedirectResponse
    {
        $user = $doctor->user;
        $newStatus = $user->status === 'suspended' ? 'active' : 'suspended';
        $user->update(['status' => $newStatus]);

        return redirect()->back()->with('status', 'Doctor status updated successfully to '.$newStatus);
    }

    /**
     * View all appointments.
     */
    public function appointments(): Response
    {
        return Inertia::render('admin/appointments', [
            'appointments' => AppointmentResource::collection(
                Appointment::query()
                    ->with(['patient.user', 'doctor.user'])
                    ->orderByDesc('appointment_date')
                    ->orderByDesc('appointment_time')
                    ->paginate(10),
            ),
        ]);
    }

    /**
     * View all reviews for a specific doctor (admin).
     */
    public function doctorReviews(DoctorProfile $doctor): Response
    {
        $reviews = DoctorReview::query()
            ->where('doctor_id', $doctor->id)
            ->with([
                'patient.user:id,name,email',
                'appointment:id,appointment_date,appointment_time',
            ])
            ->latest()
            ->paginate(15);

        $stats = [
            'average_rating' => round((float) DoctorReview::where('doctor_id', $doctor->id)->avg('rating'), 1),
            'total_reviews' => DoctorReview::where('doctor_id', $doctor->id)->count(),
        ];

        return Inertia::render('admin/doctor-reviews', [
            'doctor' => $doctor->load('user:id,name,email'),
            'reviews' => $reviews,
            'stats' => $stats,
        ]);
    }

    /**
     * View all consultations.
     */
    public function consultations(): Response
    {
        return Inertia::render('admin/consultations', [
            'consultations' => ConsultationResource::collection(
                Consultation::with(['appointment.patient.user', 'appointment.doctor.user'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10)
            ),
        ]);
    }

    /**
     * View all prescriptions.
     */
    public function prescriptions(): Response
    {
        return Inertia::render('admin/prescriptions', [
            'prescriptions' => PrescriptionResource::collection(
                Prescription::with(['consultation.appointment.patient.user', 'consultation.appointment.doctor.user', 'items'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10)
            ),
        ]);
    }

    /**
     * View all bills.
     */
    public function bills(): Response
    {
        return Inertia::render('admin/bills', [
            'bills' => BillResource::collection(
                Bill::with(['appointment.patient.user', 'appointment.doctor.user'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10)
            ),
        ]);
    }

    /**
     * View operational reports.
     */
    public function reports(Request $request): Response
    {
        $dateFrom = Carbon::parse($request->input('date_from', now()->subMonth()->toDateString()));
        $dateTo = Carbon::parse($request->input('date_to', now()->toDateString()));

        $cacheKey = 'reports:'.$dateFrom->toDateString().':'.$dateTo->toDateString();

        $appointmentStats = Cache::remember("{$cacheKey}:appointmentStats", 300, function () use ($dateFrom, $dateTo) {
            $counts = Appointment::query()
                ->whereBetween('appointment_date', [$dateFrom, $dateTo])
                ->selectRaw('COUNT(*) as total, status')
                ->groupBy('status')
                ->pluck('total', 'status');

            return array_merge([
                'pending' => 0,
                'confirmed' => 0,
                'completed' => 0,
                'cancelled' => 0,
                'rejected' => 0,
                'no_show' => 0,
            ], $counts->toArray());
        });

        $totalReviews = DoctorReview::count();
        $doctorReviewStats = [
            'total_reviews' => $totalReviews,
            'average_rating' => round((float) DoctorReview::avg('rating'), 1),
            'five_star_percentage' => $totalReviews > 0
                ? round((DoctorReview::where('rating', 5)->count() / $totalReviews) * 100)
                : 0,
            'with_comments_count' => DoctorReview::whereNotNull('comment')->where('comment', '!=', '')->count(),
            'rating_distribution' => [
                ['name' => '5 Stars', 'count' => DoctorReview::where('rating', 5)->count(), 'fill' => '#10b981'],
                ['name' => '4 Stars', 'count' => DoctorReview::where('rating', 4)->count(), 'fill' => '#14b8a6'],
                ['name' => '3 Stars', 'count' => DoctorReview::where('rating', 3)->count(), 'fill' => '#f59e0b'],
                ['name' => '2 Stars', 'count' => DoctorReview::where('rating', 2)->count(), 'fill' => '#f97316'],
                ['name' => '1 Star',  'count' => DoctorReview::where('rating', 1)->count(), 'fill' => '#ef4444'],
            ],
        ];

        return Inertia::render('admin/reports', [
            'appointmentStats' => $appointmentStats,
            'doctorReviewStats' => $doctorReviewStats,
            'filters' => [
                'date_from' => $dateFrom->toDateString(),
                'date_to' => $dateTo->toDateString(),
            ],
            'doctorStats' => Inertia::defer(fn () => $this->loadDoctorStats($dateFrom, $dateTo, $cacheKey), rescue: true),
            'specialtyCounts' => Inertia::defer(fn () => $this->loadSpecialtyCounts($dateFrom, $dateTo, $cacheKey), rescue: true),
            'peakHours' => Inertia::defer(fn () => $this->loadPeakHours($dateFrom, $dateTo, $cacheKey), rescue: true),
            'revenueTrend' => Inertia::defer(fn () => $this->loadRevenueTrend($dateFrom, $dateTo, $cacheKey), rescue: true),
            'dayOfWeekDistribution' => Inertia::defer(fn () => $this->loadDayOfWeekDistribution($dateFrom, $dateTo, $cacheKey), rescue: true),
        ]);
    }

    private function loadDoctorStats(string $dateFrom, string $dateTo, string $cacheKey): array
    {
        return Cache::remember("{$cacheKey}:doctorStats", 300, function () use ($dateFrom, $dateTo) {
            $revenueByDoctor = Bill::query()
                ->selectRaw('appointments.doctor_id as doctor_id, SUM(bills.amount) as revenue')
                ->join('appointments', 'appointments.id', '=', 'bills.appointment_id')
                ->where('bills.status', 'paid')
                ->whereBetween('appointments.appointment_date', [$dateFrom, $dateTo])
                ->groupBy('appointments.doctor_id')
                ->pluck('revenue', 'doctor_id');

            return DoctorProfile::query()
                ->with('user:id,name')
                ->withCount([
                    'appointments as total_appointments',
                    'appointments as completed_appointments' => fn ($q) => $q->where('status', 'completed'),
                ])
                ->whereHas('appointments', fn ($q) => $q->whereBetween('appointment_date', [$dateFrom, $dateTo]))
                ->get()
                ->map(fn ($doc) => [
                    'name' => $doc->user->name,
                    'specialization' => $doc->specialization,
                    'total_appointments' => $doc->total_appointments,
                    'completed_appointments' => $doc->completed_appointments,
                    'revenue' => (float) ($revenueByDoctor[$doc->id] ?? 0),
                ])
                ->values()
                ->toArray();
        });
    }

    private function loadSpecialtyCounts(string $dateFrom, string $dateTo, string $cacheKey): array
    {
        return Cache::remember("{$cacheKey}:specialtyCounts", 300, fn () => DoctorProfile::query()
            ->join('appointments', 'appointments.doctor_id', '=', 'doctor_profiles.id')
            ->whereBetween('appointments.appointment_date', [$dateFrom, $dateTo])
            ->select('doctor_profiles.specialization', DB::raw('COUNT(appointments.id) as total'))
            ->groupBy('doctor_profiles.specialization')
            ->orderByDesc('total')
            ->get()
            ->toArray()
        );
    }

    private function loadPeakHours(string $dateFrom, string $dateTo, string $cacheKey): array
    {
        return Cache::remember("{$cacheKey}:peakHours", 300, fn () => Appointment::query()
            ->whereBetween('appointment_date', [$dateFrom, $dateTo])
            ->selectRaw('appointment_time, COUNT(*) as total')
            ->groupBy('appointment_time')
            ->orderByDesc('total')
            ->get()
            ->toArray()
        );
    }

    private function loadRevenueTrend(string $dateFrom, string $dateTo, string $cacheKey): array
    {
        return Cache::remember("{$cacheKey}:revenueTrend", 300, function () use ($dateFrom, $dateTo) {
            $monthExpr = DB::connection()->getDriverName() === 'sqlite'
                ? "strftime('%Y-%m', bills.created_at) as month"
                : "DATE_FORMAT(bills.created_at, '%Y-%m') as month";

            return Bill::query()
                ->where('status', 'paid')
                ->whereBetween('created_at', [$dateFrom, $dateTo])
                ->selectRaw("{$monthExpr}, SUM(amount) as revenue")
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->toArray();
        });
    }

    private function loadDayOfWeekDistribution(string $dateFrom, string $dateTo, string $cacheKey): array
    {
        return Cache::remember("{$cacheKey}:dayOfWeek", 300, function () use ($dateFrom, $dateTo) {
            $isSqlite = DB::connection()->getDriverName() === 'sqlite';
            $dayExpr = $isSqlite
                ? "strftime('%w', appointment_date) as day_num"
                : 'DAYOFWEEK(appointment_date) as day_num';

            return Appointment::query()
                ->whereBetween('appointment_date', [$dateFrom, $dateTo])
                ->selectRaw("{$dayExpr}, COUNT(*) as total")
                ->groupBy('day_num')
                ->orderBy('day_num')
                ->get()
                ->map(function ($row) use ($isSqlite) {
                    $dayNum = (int) $row->day_num;
                    if (! $isSqlite) {
                        // MySQL DAYOFWEEK: 1 = Sunday, ..., 7 = Saturday
                        // Convert to 0-6 format (0 = Sunday)
                        $dayNum = $dayNum - 1;
                    }

                    return [
                        'day' => match ($dayNum) {
                            0 => 'Sunday',
                            1 => 'Monday',
                            2 => 'Tuesday',
                            3 => 'Wednesday',
                            4 => 'Thursday',
                            5 => 'Friday',
                            6 => 'Saturday',
                            default => 'Unknown',
                        },
                        'total' => $row->total,
                    ];
                })
                ->toArray();
        });
    }
}
