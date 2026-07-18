<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\DoctorProfile;
use App\Models\PatientProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_id' => PatientProfile::factory(),
            'doctor_id' => DoctorProfile::factory(),
            'appointment_date' => fake()->dateTimeBetween('now', '+14 days')->format('Y-m-d'),
            'appointment_time' => '10:00:00',
            'reason' => fake()->sentence(),
            'status' => 'pending',
            'cancelled_by' => null,
            'cancel_reason' => null,
            'reject_reason' => null,
        ];
    }
}
