<?php

namespace Database\Factories;

use App\Models\Prescription;
use App\Models\PrescriptionItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PrescriptionItem>
 */
class PrescriptionItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'prescription_id' => Prescription::factory(),
            'medicine_name' => fake()->word().' '.fake()->randomElement(['Tab', 'Cap', 'Syrup']),
            'dosage' => fake()->randomElement(['10mg', '250mg', '500mg']),
            'frequency' => fake()->randomElement(['Once daily', 'Twice daily', 'Three times daily', 'Before sleep']),
            'duration' => fake()->randomElement(['3 days', '5 days', '7 days', '10 days']),
        ];
    }
}
