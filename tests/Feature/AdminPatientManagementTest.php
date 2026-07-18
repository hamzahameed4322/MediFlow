<?php

use App\Models\PatientProfile;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin receives registered patients on the patient management page', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $patient = PatientProfile::factory()->create();

    $this->actingAs($admin)
        ->get(route('admin.users'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/users')
            ->has('patients.data', 1)
            ->where('patients.data.0.id', $patient->id)
            ->where('patients.data.0.user.name', $patient->user->name)
            ->where('patients.data.0.user.status', $patient->user->status)
        );
});
