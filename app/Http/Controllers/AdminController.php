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
     * List all patient accounts with search, status filtering, and 10 records per page.
     */
    public function users(Request $request): Response
    {
        $query = PatientProfile::query()
            ->with(['user', 'appointments.doctor.user']);

        if ($search = trim((string) $request->input('search'))) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($uq) use ($search) {
                    $uq->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            if (in_array($status, ['active', 'suspended'])) {
                $query->whereHas('user', function ($uq) use ($status) {
                    $uq->where('status', $status);
                });
            }
        }

        return Inertia::render('admin/users', [
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', 'all'),
            ],
            'patients' => PatientProfileResource::collection(
                $query->orderByDesc('created_at')->paginate(12)->withQueryString(),
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
     * List doctors with search, specialization filter, and performance stats.
     */
    public function doctors(Request $request): Response
    {
        $query = DoctorProfile::query()
            ->with(['user', 'schedules'])
            ->withCount(['appointments', 'appointments as completed_appointments_count' => fn ($q) => $q->where('status', 'completed')])
            ->withAvg('reviews', 'rating');

        if ($search = trim((string) $request->input('search'))) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($uq) use ($search) {
                    $uq->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                    ->orWhere('specialization', 'like', "%{$search}%")
                    ->orWhere('qualification', 'like', "%{$search}%");
            });
        }

        if ($specialization = $request->input('specialization')) {
            if ($specialization !== 'all') {
                $query->where('specialization', $specialization);
            }
        }

        if ($status = $request->input('status')) {
            if (in_array($status, ['active', 'suspended'])) {
                $query->whereHas('user', fn ($uq) => $uq->where('status', $status));
            }
        }

        $specializations = DoctorProfile::distinct()->pluck('specialization')->filter()->values();

        return Inertia::render('admin/doctors', [
            'filters' => [
                'search' => $request->input('search', ''),
                'specialization' => $request->input('specialization', 'all'),
                'status' => $request->input('status', 'all'),
            ],
            'specializations' => $specializations,
            'doctors' => DoctorProfileResource::collection(
                $query->orderBy('id')->paginate(12)->withQueryString(),
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
     * View all appointments with multi-parameter server-side filtering.
     */
    public function appointments(Request $request): Response
    {
        $query = Appointment::query()
            ->with(['patient.user', 'doctor.user', 'consultation', 'bill']);

        if ($search = trim((string) $request->input('search'))) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('patient.user', fn ($puq) => $puq->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"))
                    ->orWhereHas('doctor.user', fn ($duq) => $duq->where('name', 'like', "%{$search}%"))
                    ->orWhere('reason', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            if ($status !== 'all' && in_array($status, ['pending', 'confirmed', 'completed', 'cancelled', 'rejected', 'no_show'])) {
                $query->where('status', $status);
            }
        }

        if ($doctorId = $request->input('doctor_id')) {
            if ($doctorId !== 'all') {
                $query->where('doctor_id', $doctorId);
            }
        }

        if ($dateFrom = $request->input('date_from')) {
            $query->whereDate('appointment_date', '>=', $dateFrom);
        }

        if ($dateTo = $request->input('date_to')) {
            $query->whereDate('appointment_date', '<=', $dateTo);
        }

        $sortBy = $request->input('sort_by', 'appointment_date');
        $sortOrder = strtolower((string) $request->input('sort_order', 'desc')) === 'asc' ? 'asc' : 'desc';

        if ($sortBy === 'id') {
            $query->orderBy('id', $sortOrder);
        } elseif ($sortBy === 'status') {
            $query->orderBy('status', $sortOrder);
        } else {
            $query->orderBy('appointment_date', $sortOrder)->orderBy('appointment_time', $sortOrder);
        }

        $doctors = DoctorProfile::with('user:id,name')->get()->map(fn ($d) => [
            'id' => $d->id,
            'name' => $d->user?->name ?? 'Doctor',
            'specialization' => $d->specialization,
        ]);

        return Inertia::render('admin/appointments', [
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', 'all'),
                'doctor_id' => $request->input('doctor_id', 'all'),
                'date_from' => $request->input('date_from', ''),
                'date_to' => $request->input('date_to', ''),
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
            'doctors' => $doctors,
            'appointments' => AppointmentResource::collection(
                $query->paginate(12)->withQueryString()
            ),
        ]);
    }

    /**
     * Update appointment status directly by Admin.
     */
    public function updateAppointmentStatus(Request $request, Appointment $appointment): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,confirmed,completed,cancelled,rejected,no_show'],
            'cancel_reason' => ['nullable', 'string', 'max:500'],
            'reject_reason' => ['nullable', 'string', 'max:500'],
        ]);

        $data = ['status' => $validated['status']];

        if ($validated['status'] === 'cancelled') {
            $data['cancelled_by'] = 'doctor';
            $data['cancel_reason'] = $validated['cancel_reason'] ?? 'Cancelled by Admin';
        } elseif ($validated['status'] === 'rejected') {
            $data['reject_reason'] = $validated['reject_reason'] ?? 'Rejected by Admin';
        }

        $appointment->update($data);

        return redirect()->back()->with('status', 'Appointment status updated successfully!');
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
     * View all consultations with server-side search.
     */
    public function consultations(Request $request): Response
    {
        $query = Consultation::query()
            ->with(['appointment.patient.user', 'appointment.doctor.user', 'prescription.items']);

        if ($search = trim((string) $request->input('search'))) {
            $query->where(function ($q) use ($search) {
                $q->where('symptoms', 'like', "%{$search}%")
                    ->orWhere('diagnosis', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%")
                    ->orWhereHas('appointment.patient.user', fn ($puq) => $puq->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('appointment.doctor.user', fn ($duq) => $duq->where('name', 'like', "%{$search}%"));
            });
        }

        $sortOrder = strtolower((string) $request->input('sort_order', 'desc')) === 'asc' ? 'asc' : 'desc';

        return Inertia::render('admin/consultations', [
            'filters' => [
                'search' => $request->input('search', ''),
                'sort_order' => $sortOrder,
            ],
            'consultations' => ConsultationResource::collection(
                $query->orderBy('consultations.id', $sortOrder)->paginate(12)->withQueryString()
            ),
        ]);
    }

    /**
     * View all prescriptions with medicine search.
     */
    public function prescriptions(Request $request): Response
    {
        $query = Prescription::query()
            ->with(['consultation.appointment.patient.user', 'consultation.appointment.doctor.user', 'items']);

        if ($search = trim((string) $request->input('search'))) {
            $query->where(function ($q) use ($search) {
                $q->where('instructions', 'like', "%{$search}%")
                    ->orWhereHas('items', fn ($iq) => $iq->where('medicine_name', 'like', "%{$search}%"))
                    ->orWhereHas('consultation.appointment.patient.user', fn ($puq) => $puq->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('consultation.appointment.doctor.user', fn ($duq) => $duq->where('name', 'like', "%{$search}%"));
            });
        }

        return Inertia::render('admin/prescriptions', [
            'filters' => [
                'search' => $request->input('search', ''),
            ],
            'prescriptions' => PrescriptionResource::collection(
                $query->orderByDesc('created_at')->paginate(12)->withQueryString()
            ),
        ]);
    }

    /**
     * View all bills with financial summary and status filtering.
     */
    public function bills(Request $request): Response
    {
        $query = Bill::query()
            ->with(['appointment.patient.user', 'appointment.doctor.user']);

        if ($search = trim((string) $request->input('search'))) {
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                    ->orWhere('amount', 'like', "%{$search}%")
                    ->orWhereHas('appointment.patient.user', fn ($puq) => $puq->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('appointment.doctor.user', fn ($duq) => $duq->where('name', 'like', "%{$search}%"));
            });
        }

        if ($status = $request->input('status')) {
            if ($status !== 'all' && in_array($status, ['paid', 'unpaid'])) {
                $query->where('status', $status);
            }
        }

        $sortOrder = strtolower((string) $request->input('sort_order', 'desc')) === 'asc' ? 'asc' : 'desc';
        $query->orderBy('bills.id', $sortOrder);

        $totalRevenue = (float) Bill::sum('amount');
        $paidRevenue = (float) Bill::where('status', 'paid')->sum('amount');
        $unpaidRevenue = (float) Bill::where('status', 'unpaid')->sum('amount');
        $paidCount = Bill::where('status', 'paid')->count();
        $unpaidCount = Bill::where('status', 'unpaid')->count();

        return Inertia::render('admin/bills', [
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', 'all'),
                'sort_order' => $sortOrder,
            ],
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'paidRevenue' => $paidRevenue,
                'unpaidRevenue' => $unpaidRevenue,
                'paidCount' => $paidCount,
                'unpaidCount' => $unpaidCount,
            ],
            'bills' => BillResource::collection(
                $query->paginate(12)->withQueryString()
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
