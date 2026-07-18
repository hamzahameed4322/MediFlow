<?php

namespace App\Policies;

use App\Models\Consultation;
use App\Models\User;

class ConsultationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['admin', 'doctor', 'patient'], true);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Consultation $consultation): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        $consultation->loadMissing('appointment');

        if ($user->role === 'doctor') {
            return $user->doctorProfile && $consultation->appointment->doctor_id === $user->doctorProfile->id;
        }

        if ($user->role === 'patient') {
            return $user->patientProfile && $consultation->appointment->patient_id === $user->patientProfile->id;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'doctor';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Consultation $consultation): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        $consultation->loadMissing('appointment');

        if ($user->role === 'doctor') {
            return $user->doctorProfile && $consultation->appointment->doctor_id === $user->doctorProfile->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Consultation $consultation): bool
    {
        return $user->role === 'admin';
    }
}
