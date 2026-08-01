<?php

use App\Models\Appointment;
use App\Models\DoctorProfile;
use App\Models\PatientProfile;
use App\Models\User;

test('patient can download prescription pdf', function () {
    $user = User::factory()->create(['role' => 'patient']);
    $patient = PatientProfile::factory()->create(['user_id' => $user->id]);
    $doctorUser = User::factory()->create(['role' => 'doctor', 'name' => 'Dr. Smith']);
    $doctor = DoctorProfile::factory()->create(['user_id' => $doctorUser->id]);

    $appointment = Appointment::factory()->create([
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
        'status' => 'confirmed',
    ]);

    $response = $this->actingAs($user)->get(route('patient.appointments.prescription.pdf', $appointment));

    $response->assertOk();
    $response->assertHeader('content-type', 'application/pdf');
});

test('patient can download entry token pass pdf', function () {
    $user = User::factory()->create(['role' => 'patient']);
    $patient = PatientProfile::factory()->create(['user_id' => $user->id]);
    $doctorUser = User::factory()->create(['role' => 'doctor', 'name' => 'Dr. Smith']);
    $doctor = DoctorProfile::factory()->create(['user_id' => $doctorUser->id]);

    $appointment = Appointment::factory()->create([
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
        'status' => 'confirmed',
    ]);

    $response = $this->actingAs($user)->get(route('patient.appointments.token.pdf', $appointment));

    $response->assertOk();
    $response->assertHeader('content-type', 'application/pdf');
});
