<?php

namespace App\Policies;

use App\Models\DoctorSchedule;
use App\Models\User;

class DoctorSchedulePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, DoctorSchedule $doctorSchedule): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return in_array($user->role, ['doctor', 'admin'], true);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, DoctorSchedule $doctorSchedule): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        if ($user->role === 'doctor') {
            return $user->doctorProfile && $doctorSchedule->doctor_id === $user->doctorProfile->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, DoctorSchedule $doctorSchedule): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        if ($user->role === 'doctor') {
            return $user->doctorProfile && $doctorSchedule->doctor_id === $user->doctorProfile->id;
        }

        return false;
    }
}
