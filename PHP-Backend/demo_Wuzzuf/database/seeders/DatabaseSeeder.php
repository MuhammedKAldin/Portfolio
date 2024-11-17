<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\JobOffer;
use App\Models\JobOfferUser;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Microsoft',
            'email' => 'recruitment@microsoft.com',
            'phonenumber' => '0900',
            'role' => 'employer',
            'password' => '3244039',
            'headline' => 'Information / Technology',
            'summary' => 'Microsoft is cool place to work at',
        ]);

        User::factory()->create([
            'name' => 'Mohamed Kamal Aldin',
            'email' => 'test@example.com',
            'phonenumber' => '01095304064',
            'role' => 'employee',
            'password' => '3244039',
            'headline' => 'Java Developer',
            'summary' => 'Experienced Developer with 3 years of experience',
        ]);

        JobOffer::factory()->create([
            'employer_id' => 1,
            'name' => 'Software Developer',
            'description' => 'we need someone cool',
            'responsibility' => 'able to build cool stuff',
            'qualifications' => 'has cool background',
            'benifits' => 'will be given pizza',
            'location' => 'Cairo, Egypt',
            'level' => 'Midd-Senior',
            'availability' => 'Freelance',
        ]);

        JobOfferUser::factory()->create([
            'job_offer_id' => 1, 
            'user_id' => 2,
            'stage' => 'shortlisted',
        ]);
    }
}
