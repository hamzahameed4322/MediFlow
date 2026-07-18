<?php

namespace App\Policies;

use App\Models\Appointment;
use App\Models\User;

class AppointmentPolicy
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
    public function view(User $user, Appointment $appointment): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        if ($user->role === 'doctor') {
            return $user->doctorProfile && $appointment->doctor_id === $user->doctorProfile->id;
        }

        if ($user->role === 'patient') {
            return $user->patientProfile && $appointment->patient_id === $user->patientProfile->id;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'patient';
    }

    /**
     * Determine whether the user can update the model (approve, reject, cancel, etc.).
     */
    public function update(User $user, Appointment $appointment): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        if ($user->role === 'doctor') {
            return $user->doctorProfile && $appointment->doctor_id === $user->doctorProfile->id;
        }

        if ($user->role === 'patient') {
            return $user->patientProfile && $appointment->patient_id === $user->patientProfile->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Appointment $appointment): bool
    {
        return $user->role === 'admin';
    }
}
