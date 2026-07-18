<?php

namespace Database\Factories;

use App\Models\DoctorProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DoctorProfile>
 */
class DoctorProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => 'doctor']),
            'specialization' => fake()->randomElement(['Cardiologist', 'Dermatologist', 'Pediatrician', 'General Physician', 'Neurologist']),
            'qualification' => fake()->randomElement(['MBBS, MD', 'MBBS, MS', 'MBBS, FCPS']),
            'experience' => fake()->numberBetween(2, 35),
            'consultation_fee' => fake()->randomElement([50.00, 100.00, 150.00, 200.00]),
        ];
    }
}
