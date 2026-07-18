<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Consultation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Consultation>
 */
class ConsultationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'appointment_id' => Appointment::factory()->state(['status' => 'completed']),
            'symptoms' => fake()->paragraph(),
            'diagnosis' => fake()->sentence(),
            'notes' => fake()->paragraph(),
        ];
    }
}
