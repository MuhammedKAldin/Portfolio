<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class MenuItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vendor_id' => fake()->name(),
            'meal_name' => fake()->name(),
            'meal_desc' => fake()->name(),
            'meal_image' => fake()->name(),
            'meal_price' => fake()->name(),
            'meal_category' => fake()->name(),
            'meal_availability' => fake()->name(),
        ];
    }

}
