<?php

use App\Models\Appointment;
use App\Models\DoctorProfile;
use App\Models\PatientProfile;

test('a patient cannot book the same date and time twice', function () {
    $patientProfile = PatientProfile::factory()->create();
    $patient = $patientProfile->user;

    $doctorOne = DoctorProfile::factory()->create();
    $doctorTwo = DoctorProfile::factory()->create();

    $appointmentData = [
        'doctor_id' => $doctorOne->id,
        'appointment_date' => now()->addDay()->toDateString(),
        'appointment_time' => '10:00:00',
        'reason' => 'General consultation',
    ];

    $this->actingAs($patient)
        ->post(route('patient.appointments.store'), $appointmentData)
        ->assertRedirect(route('patient.appointments'));

    expect(
        Appointment::where('patient_id', $patientProfile->id)
            ->where('doctor_id', $doctorOne->id)
            ->whereDate('appointment_date', $appointmentData['appointment_date'])
            ->where('appointment_time', $appointmentData['appointment_time'])
            ->where('status', 'pending')
            ->exists()
    )->toBeTrue();

    $secondAttempt = $appointmentData;
    $secondAttempt['doctor_id'] = $doctorTwo->id;

    $this->actingAs($patient)
        ->post(route('patient.appointments.store'), $secondAttempt)
        ->assertSessionHasErrors('appointment_time');
});
