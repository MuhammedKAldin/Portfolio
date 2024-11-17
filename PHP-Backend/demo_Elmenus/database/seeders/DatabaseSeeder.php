<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Vendor;
use App\Models\MenuItem;
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

        User::factory()->create([
            'name' => 'Mohamed Kamal Aldin',
            'email' => 'test@example.com',
            'password' => 'test12345678',
        ]);
        
        User::factory()->create([
            'name' => 'Hazem Ahmed',
            'email' => 'test2@gmail.com',
            'password' => 'test12345678',
        ]);

        User::factory()->create([
            'name' => 'Osama Mohamed',
            'email' => 'test3@gmail.com',
            'password' => 'test12345678',
        ]);

        Vendor::factory()->create([
            'verified_user_id' => '1',
            'name' => 'McDonalds',
            'email' => 'mcdonald@gmail.com',
            'image' => 'mcdonald_place.png',
            'location' => 'Nasr St, Maadi, Cairo',
            'hotline' => '19019',
            'description' => 'Fresh Meals',
        ]);

        Vendor::factory()->create([
            'verified_user_id' => '2',
            'name' => 'الحاتي',
            'email' => 'Alhatti@gmail.com',
            'image' => 'hatti_place.png',
            'location' => '5th Settlement, Cairo',
            'hotline' => '16079',
            'description' => 'Tasty Kebab and Kofta Food',
        ]);

        MenuItem::factory()->create([
            'vendor_id' => "1",
            'meal_name' => "Lemon Pepper Chicken Wings with Hot Honey Glaze",
            'meal_desc' => "Tasty Meal",
            'meal_image' => "menuItem1.jpg",
            'meal_price' => "99",
            'meal_category' => "fried chicken",
            'meal_availability' => "true",
        ]);

        MenuItem::factory()->create([
            'vendor_id' => "1",
            'meal_name' => "Cheese Chicken Burger",
            'meal_desc' => "Tasty Meal",
            'meal_image' => "menuItem1.jpg",
            'meal_price' => "99",
            'meal_category' => "fried chicken",
            'meal_availability' => "true",
        ]);
    }
}
