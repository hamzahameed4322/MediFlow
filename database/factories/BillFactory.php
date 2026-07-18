<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Bill;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Bill>
 */
class BillFactory extends Factory
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
            'amount' => fake()->randomElement([50.00, 100.00, 150.00, 200.00]),
            'status' => fake()->randomElement(['unpaid', 'paid']),
        ];
    }
}
