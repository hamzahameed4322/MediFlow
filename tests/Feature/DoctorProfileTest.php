<?php

use App\Models\DoctorProfile;
use Inertia\Testing\AssertableInertia as Assert;

test('doctor profile page receives the doctor account and professional details', function () {
    $doctorProfile = DoctorProfile::factory()->create([
        'specialization' => 'Cardiology',
        'qualification' => 'MBBS, FCPS',
        'experience' => 8,
        'consultation_fee' => 2500,
    ]);

    $this->actingAs($doctorProfile->user)
        ->get(route('doctor.profile.edit'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('doctor/profile')
            ->where('doctor.name', $doctorProfile->user->name)
            ->where('doctor.email', $doctorProfile->user->email)
            ->where('doctor.specialization', 'Cardiology')
            ->where('doctor.consultation_fee', 2500)
        );
});
