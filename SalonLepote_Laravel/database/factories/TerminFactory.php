<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Termin>
 */
class TerminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vreme'=>fake()->dateTime(),
            'ukupnaCena'=>fake()->numberBetween(1800,5000),
            'trajanje'=>fake()->numberBetween(30,120)
        ];
    }
}
