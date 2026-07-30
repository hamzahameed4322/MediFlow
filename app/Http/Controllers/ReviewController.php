<?php

namespace App\Http\Controllers;

use App\Http\Requests\Patient\StoreReviewRequest;
use App\Http\Requests\Patient\UpdateReviewRequest;
use App\Models\Appointment;
use App\Models\DoctorProfile;
use App\Models\DoctorReview;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Store a new review for a completed appointment.
     */
    public function store(StoreReviewRequest $request, Appointment $appointment): RedirectResponse
    {
        $patientProfile = Auth::user()->patientProfile;

        // Ensure the appointment belongs to this patient
        abort_if($appointment->patient_id !== $patientProfile->id, 403);

        // Ensure appointment is completed
        abort_if($appointment->status !== 'completed', 422, 'You can only review completed appointments.');

        // Ensure review does not already exist
        abort_if(DoctorReview::where('appointment_id', $appointment->id)->exists(), 422, 'You have already reviewed this appointment.');

        DoctorReview::create([
            'appointment_id' => $appointment->id,
            'patient_id' => $patientProfile->id,
            'doctor_id' => $appointment->doctor_id,
            'rating' => $request->validated()['rating'],
            'comment' => $request->validated()['comment'] ?? null,
        ]);

        return redirect()->back()->with('status', 'Review submitted successfully!');
    }

    /**
     * Update an existing review (edit only, no delete).
     */
    public function update(UpdateReviewRequest $request, DoctorReview $review): RedirectResponse
    {
        Gate::authorize('update', $review);

        $review->update([
            'rating' => $request->validated()['rating'],
            'comment' => $request->validated()['comment'] ?? null,
        ]);

        return redirect()->back()->with('status', 'Review updated successfully!');
    }

    /**
     * Admin: list all reviews for a specific doctor.
     */
    public function adminDoctorReviews(DoctorProfile $doctor): Response
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
}
