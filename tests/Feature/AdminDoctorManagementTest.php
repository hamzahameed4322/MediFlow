<?php

use App\Models\DoctorProfile;
use App\Models\User;
use App\Notifications\DoctorCredentialsNotification;
use Illuminate\Support\Facades\Notification;

test('admin can create a doctor and send credential email', function () {
    Notification::fake();

    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $payload = [
        'name' => 'Doctor One',
        'email' => 'doctor.one@example.com',
        'password' => 'Password123',
        'specialization' => 'Cardiology',
        'qualification' => 'MBBS, FCPS',
        'experience' => 5,
        'consultation_fee' => 50,
    ];

    $this->actingAs($admin)
        ->post(route('admin.doctors.store'), $payload)
        ->assertRedirect();

    $doctor = User::where('email', $payload['email'])->firstOrFail();

    expect($doctor->role)->toBe('doctor');
    expect(DoctorProfile::where('user_id', $doctor->id)->exists())->toBeTrue();

    Notification::assertSentTo($doctor, DoctorCredentialsNotification::class);
});
