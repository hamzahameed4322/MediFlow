<?php

namespace App\Policies;

use App\Models\DoctorReview;
use App\Models\User;

class DoctorReviewPolicy
{
    /**
     * Determine if the patient can update (edit) their own review.
     */
    public function update(User $user, DoctorReview $review): bool
    {
        return $user->patientProfile?->id === $review->patient_id;
    }
}
