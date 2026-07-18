<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('verified admin can access operational reports page', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $response = $this->actingAs($admin)
        ->get(route('admin.reports'));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/reports')
        ->has('appointmentStats')
        ->has('filters')
    );
});

test('unverified admin is redirected to email verification', function () {
    $admin = User::factory()->unverified()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.reports'))
        ->assertRedirect(route('verification.notice'));
});

test('patients cannot access operational reports page', function () {
    $patient = User::factory()->create([
        'role' => 'patient',
    ]);

    $this->actingAs($patient)
        ->get(route('admin.reports'))
        ->assertStatus(403);
});

test('doctors cannot access operational reports page', function () {
    $doctor = User::factory()->create([
        'role' => 'doctor',
    ]);

    $this->actingAs($doctor)
        ->get(route('admin.reports'))
        ->assertStatus(403);
});
