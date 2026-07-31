<?php

use App\Models\Appointment;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('verified admin dashboard renders complete dashboard statistics for an admin user', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    Appointment::factory()->count(2)->create();

    $this->actingAs($admin)
        ->get(route('admin.dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('stats.totalAppointments', 2)
            ->where('stats.totalPatients', 2)
            ->where('stats.totalDoctors', 2)
        );
});

test('unverified admin users are redirected to email verification', function () {
    $admin = User::factory()->unverified()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.dashboard'))
        ->assertRedirect(route('verification.notice'));
});

test('non-admin users cannot access admin dashboard and receive 403 status', function () {
    $patient = User::factory()->create([
        'role' => 'patient',
    ]);

    $this->actingAs($patient)
        ->get(route('admin.dashboard'))
        ->assertStatus(403);
});
