<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Country;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Country::factory(10)->create();

        Country::Create([
            'name' => [
                'en' => "Egypt",
                'ar' => "مصر",
            ],
            'description' => [
                'en' => "Nice weather",
                'ar' => "طفس جميل", 
            ],
        ]);

        Country::Create([
            'name' => [
                'en' => "UAE",
                'ar' => "الامارات",
            ],
            'description' => [
                'en' => "Nice weather",
                'ar' => "طفس جميل", 
            ],
        ]);

        Country::Create([
            'name' => [
                'en' => "Jordan",
                'ar' => "الأردن",
            ],
            'description' => [
                'en' => "Nice weather",
                'ar' => "طفس جميل", 
            ],
        ]);
    }
}
