<?php

use App\Models\Appointment;
use App\Models\DoctorProfile;
use App\Models\PatientProfile;
use App\Notifications\AppointmentCancelledNotification;
use App\Notifications\AppointmentNoShowNotification;
use App\Notifications\AppointmentRejectedNotification;
use Illuminate\Support\Facades\Notification;

test('system notifies the doctor when patient cancels appointment', function () {
    Notification::fake();

    $patientProfile = PatientProfile::factory()->create();
    $patient = $patientProfile->user;

    $doctorProfile = DoctorProfile::factory()->create();
    $doctorUser = $doctorProfile->user;

    $appointment = Appointment::create([
        'patient_id' => $patientProfile->id,
        'doctor_id' => $doctorProfile->id,
        'appointment_date' => now()->addDay()->toDateString(),
        'appointment_time' => '10:00:00',
        'status' => 'pending',
    ]);

    $this->actingAs($patient)
        ->post(route('patient.appointments.cancel', $appointment->id), [
            'cancel_reason' => 'Feeling better',
        ])
        ->assertRedirect();

    Notification::assertSentTo(
        $doctorUser,
        AppointmentCancelledNotification::class,
        fn ($notification) => $notification->actor === 'patient' && $notification->reason === 'Feeling better'
    );
});

test('system notifies the patient when doctor cancels appointment', function () {
    Notification::fake();

    $patientProfile = PatientProfile::factory()->create();
    $patientUser = $patientProfile->user;

    $doctorProfile = DoctorProfile::factory()->create();
    $doctorUser = $doctorProfile->user;

    $appointment = Appointment::create([
        'patient_id' => $patientProfile->id,
        'doctor_id' => $doctorProfile->id,
        'appointment_date' => now()->addDay()->toDateString(),
        'appointment_time' => '10:00:00',
        'status' => 'confirmed',
    ]);

    $this->actingAs($doctorUser)
        ->post(route('doctor.appointments.cancel', $appointment->id), [
            'cancel_reason' => 'Emergency surgery',
        ])
        ->assertRedirect();

    Notification::assertSentTo(
        $patientUser,
        AppointmentCancelledNotification::class,
        fn ($notification) => $notification->actor === 'doctor' && $notification->reason === 'Emergency surgery'
    );
});

test('system notifies the patient when doctor rejects appointment', function () {
    Notification::fake();

    $patientProfile = PatientProfile::factory()->create();
    $patientUser = $patientProfile->user;

    $doctorProfile = DoctorProfile::factory()->create();
    $doctorUser = $doctorProfile->user;

    $appointment = Appointment::create([
        'patient_id' => $patientProfile->id,
        'doctor_id' => $doctorProfile->id,
        'appointment_date' => now()->addDay()->toDateString(),
        'appointment_time' => '10:00:00',
        'status' => 'pending',
    ]);

    $this->actingAs($doctorUser)
        ->post(route('doctor.appointments.reject', $appointment->id), [
            'reject_reason' => 'Schedule conflict',
        ])
        ->assertRedirect();

    Notification::assertSentTo(
        $patientUser,
        AppointmentRejectedNotification::class,
        fn ($notification) => $notification->reason === 'Schedule conflict'
    );
});

test('system notifies the patient when doctor marks appointment as no show', function () {
    Notification::fake();

    $patientProfile = PatientProfile::factory()->create();
    $patientUser = $patientProfile->user;

    $doctorProfile = DoctorProfile::factory()->create();
    $doctorUser = $doctorProfile->user;

    $appointment = Appointment::create([
        'patient_id' => $patientProfile->id,
        'doctor_id' => $doctorProfile->id,
        'appointment_date' => now()->addDay()->toDateString(),
        'appointment_time' => '10:00:00',
        'status' => 'confirmed',
    ]);

    $this->actingAs($doctorUser)
        ->post(route('doctor.appointments.no-show', $appointment->id))
        ->assertRedirect();

    Notification::assertSentTo(
        $patientUser,
        AppointmentNoShowNotification::class
    );
});
