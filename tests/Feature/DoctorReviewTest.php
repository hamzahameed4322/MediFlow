<?php

use App\Models\Appointment;
use App\Models\DoctorProfile;
use App\Models\DoctorReview;
use App\Models\PatientProfile;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\withoutVite;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makePatient(): array
{
    $user = User::factory()->create([
        'role' => 'patient',
        'status' => 'active',
        'email_verified_at' => now(),
    ]);
    $profile = PatientProfile::factory()->create(['user_id' => $user->id]);

    return compact('user', 'profile');
}

function makeDoctor(): array
{
    $user = User::factory()->create([
        'role' => 'doctor',
        'status' => 'active',
        'email_verified_at' => now(),
    ]);
    $profile = DoctorProfile::factory()->create(['user_id' => $user->id]);

    return compact('user', 'profile');
}

function makeCompletedAppointment(int $patientId, int $doctorId): Appointment
{
    return Appointment::factory()->create([
        'patient_id' => $patientId,
        'doctor_id' => $doctorId,
        'status' => 'completed',
    ]);
}

// ─── Store Review ─────────────────────────────────────────────────────────────

test('patient can submit a review for a completed appointment', function () {
    ['user' => $user, 'profile' => $patient] = makePatient();
    ['profile' => $doctor] = makeDoctor();
    $appointment = makeCompletedAppointment($patient->id, $doctor->id);

    actingAs($user)
        ->post("/patient/appointments/{$appointment->id}/review", [
            'rating' => 5,
            'comment' => 'Excellent doctor!',
        ])
        ->assertRedirect();

    expect(DoctorReview::where('appointment_id', $appointment->id)->exists())->toBeTrue();
});

test('patient cannot review a non-completed appointment', function () {
    ['user' => $user, 'profile' => $patient] = makePatient();
    ['profile' => $doctor] = makeDoctor();

    $appointment = Appointment::factory()->create([
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
        'status' => 'confirmed',
    ]);

    actingAs($user)
        ->post("/patient/appointments/{$appointment->id}/review", [
            'rating' => 4,
        ])
        ->assertStatus(422);
});

test('patient cannot review another patient appointment', function () {
    ['user' => $user] = makePatient();
    ['profile' => $otherPatient] = makePatient();
    ['profile' => $doctor] = makeDoctor();
    $appointment = makeCompletedAppointment($otherPatient->id, $doctor->id);

    actingAs($user)
        ->post("/patient/appointments/{$appointment->id}/review", [
            'rating' => 3,
        ])
        ->assertStatus(403);
});

test('patient cannot submit a duplicate review for the same appointment', function () {
    ['user' => $user, 'profile' => $patient] = makePatient();
    ['profile' => $doctor] = makeDoctor();
    $appointment = makeCompletedAppointment($patient->id, $doctor->id);

    DoctorReview::create([
        'appointment_id' => $appointment->id,
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
        'rating' => 4,
        'comment' => 'Good',
    ]);

    actingAs($user)
        ->post("/patient/appointments/{$appointment->id}/review", [
            'rating' => 5,
        ])
        ->assertStatus(422);
});

test('rating is required and must be between 1 and 5', function () {
    ['user' => $user, 'profile' => $patient] = makePatient();
    ['profile' => $doctor] = makeDoctor();
    $appointment = makeCompletedAppointment($patient->id, $doctor->id);

    actingAs($user)
        ->post("/patient/appointments/{$appointment->id}/review", ['rating' => 6])
        ->assertSessionHasErrors('rating');
});

test('rating is required when empty', function () {
    ['user' => $user, 'profile' => $patient] = makePatient();
    ['profile' => $doctor] = makeDoctor();
    $appointment = makeCompletedAppointment($patient->id, $doctor->id);

    actingAs($user)
        ->post("/patient/appointments/{$appointment->id}/review", [])
        ->assertSessionHasErrors('rating');
});

test('comment is optional when submitting a review', function () {
    ['user' => $user, 'profile' => $patient] = makePatient();
    ['profile' => $doctor] = makeDoctor();
    $appointment = makeCompletedAppointment($patient->id, $doctor->id);

    actingAs($user)
        ->post("/patient/appointments/{$appointment->id}/review", ['rating' => 3])
        ->assertRedirect();

    expect(DoctorReview::where('appointment_id', $appointment->id)->value('comment'))->toBeNull();
});

// ─── Update Review ────────────────────────────────────────────────────────────

test('patient can edit their own review', function () {
    ['user' => $user, 'profile' => $patient] = makePatient();
    ['profile' => $doctor] = makeDoctor();
    $appointment = makeCompletedAppointment($patient->id, $doctor->id);

    $review = DoctorReview::create([
        'appointment_id' => $appointment->id,
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
        'rating' => 3,
        'comment' => 'Average',
    ]);

    actingAs($user)
        ->put("/patient/reviews/{$review->id}", ['rating' => 5, 'comment' => 'Actually great!'])
        ->assertRedirect();

    expect($review->fresh()->rating)->toBe(5)
        ->and($review->fresh()->comment)->toBe('Actually great!');
});

test('patient cannot edit another patient review', function () {
    ['user' => $otherUser] = makePatient();
    ['profile' => $patient] = makePatient();
    ['profile' => $doctor] = makeDoctor();
    $appointment = makeCompletedAppointment($patient->id, $doctor->id);

    $review = DoctorReview::create([
        'appointment_id' => $appointment->id,
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
        'rating' => 2,
        'comment' => 'Not great',
    ]);

    actingAs($otherUser)
        ->put("/patient/reviews/{$review->id}", ['rating' => 5])
        ->assertStatus(403);
});

// ─── Page Access ─────────────────────────────────────────────────────────────

test('doctor can view their reviews page', function () {
    withoutVite();
    ['user' => $user] = makeDoctor();

    actingAs($user)
        ->get('/doctor/reviews')
        ->assertOk();
});

test('admin can view doctor reviews page', function () {
    withoutVite();
    $admin = User::factory()->create(['role' => 'admin', 'status' => 'active', 'email_verified_at' => now()]);
    ['profile' => $doctor] = makeDoctor();

    actingAs($admin)
        ->get("/admin/doctors/{$doctor->id}/reviews")
        ->assertOk();
});

test('admin reports page contains doctor review stats', function () {
    withoutVite();
    $admin = User::factory()->create(['role' => 'admin', 'status' => 'active', 'email_verified_at' => now()]);

    actingAs($admin)
        ->get('/admin/reports')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/reports')
            ->has('doctorReviewStats')
        );
});
