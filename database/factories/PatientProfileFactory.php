<?php

namespace Database\Factories;

use App\Models\PatientProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PatientProfile>
 */
class PatientProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => 'patient']),
            'phone' => '03'.fake()->numerify('#########'),
            'gender' => fake()->randomElement(['male', 'female', 'other']),
            'dob' => fake()->date('Y-m-d', '-10 years'), // Patient is at least 10 years old
            'address' => fake()->address(),
            'allergies' => fake()->boolean() ? fake()->words(3, true) : null,
            'major_diseases' => fake()->boolean() ? fake()->words(2, true) : null,
        ];
    }
}
