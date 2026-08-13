<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Consultation;
use App\Models\DoctorProfile;
use App\Models\DoctorReview;
use App\Models\PatientProfile;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index(): Response
    {
        $doctors = DoctorProfile::with('user')
            ->whereHas('user', function ($query) {
                $query->where('status', 'active');
            })
            ->orderBy('id')
            ->limit(3)
            ->get()
            ->map(function ($doctor, $index) {
                // Compute initials
                $cleanName = preg_replace('/^dr\.?\s+/i', '', $doctor->user->name);
                $words = explode(' ', $cleanName);
                $initials = '';
                foreach ($words as $w) {
                    if (! empty($w)) {
                        $initials .= strtoupper($w[0]);
                    }
                }
                $initials = substr($initials, 0, 2);
                if (empty($initials)) {
                    $initials = 'DR';
                }

                $color = 'bg-primary text-primary-foreground';

                return [
                    'name' => $doctor->user->name,
                    'specialty' => $doctor->specialization,
                    'experience' => $doctor->experience.'+ years experience',
                    'initials' => $initials,
                    'color' => $color,
                ];
            });

        $reviews = DoctorReview::with(['patient.user', 'doctor.user'])
            ->whereNotNull('comment')
            ->where('rating', '>=', 4)
            ->latest()
            ->get()
            ->filter(function ($review) {
                return strlen(trim((string) $review->comment)) >= 15;
            })
            ->unique('comment')
            ->take(3)
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'patient' => $review->patient?->user?->name ?: 'Verified Patient',
                    'doctor' => $review->doctor?->user?->name ?: 'Doctor Profile',
                    'specialty' => $review->doctor?->specialization ?: 'Specialty Consultation',
                    'rating' => (int) $review->rating,
                    'comment' => preg_replace('/Dr\.\s+Dr\./i', 'Dr.', (string) $review->comment),
                    'date' => $review->created_at ? $review->created_at->diffForHumans() : 'Recently',
                ];
            })
            ->values();

        $stats = [
            'appointments' => Appointment::count(),
            'doctors' => DoctorProfile::whereHas('user', function ($query) {
                $query->where('status', 'active');
            })->count(),
            'reviews' => DoctorReview::count(),
            'patients' => PatientProfile::count(),
            'consultations' => Consultation::count(),
        ];

        $specializations = DoctorProfile::whereHas('user', fn ($q) => $q->where('status', 'active'))
            ->distinct()
            ->pluck('specialization')
            ->filter()
            ->values()
            ->toArray();

        $averageRating = round((float) DoctorReview::avg('rating'), 1);

        return Inertia::render('welcome', [
            'featuredDoctors' => $doctors,
            'featuredReviews' => $reviews,
            'stats' => $stats,
            'specializations' => $specializations,
            'averageRating' => $averageRating,
        ]);
    }
}
