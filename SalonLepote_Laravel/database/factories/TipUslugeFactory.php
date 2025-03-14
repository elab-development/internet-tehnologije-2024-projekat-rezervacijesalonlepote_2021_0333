<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TipUsluge>
 */
class TipUslugeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv'=>fake()->sentence(2),
            'cena'=>fake()->numberBetween(1800,2500),
            'opis'=>fake()->sentence(4),
            'trajanje'=>fake()->numberBetween(30,120)
        ];
    }
}
