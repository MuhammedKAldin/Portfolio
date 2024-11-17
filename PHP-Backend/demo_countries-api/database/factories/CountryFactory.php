<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Country>
 */
class CountryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => [
                'en' => $this->faker->country,
                'ar' => $this->faker->word, // You can use a specific Arabic faker if available
            ],
            'description' => [
                'en' => $this->faker->sentence,
                'ar' => $this->faker->sentence, // Use a specific Arabic faker if needed
            ],
        ];
    }
}
