<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view consultations page', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
        'email_verified_at' => now(),
    ]);

    $this->actingAs($admin)
        ->get(route('admin.consultations'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/consultations')
            ->has('consultations')
        );
});
