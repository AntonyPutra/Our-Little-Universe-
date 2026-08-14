<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Global Settings
        \App\Models\CoupleSetting::firstOrCreate(
            ['id' => 'global'],
            ['coupleData' => json_encode([
                'names' => 'Putra & Vell Vell',
                'theme' => 'dark',
            ])]
        );

        // Special Dates
        \App\Models\SpecialDate::firstOrCreate(
            ['title' => 'Our Anniversary'],
            [
                'date' => '2026-07-06 00:00:00',
                'type' => 'Anniversary',
                'description' => 'The day our universe was born.',
                'icon' => 'Heart',
                'recurringYearly' => true,
            ]
        );
        
        \App\Models\SpecialDate::firstOrCreate(
            ['title' => 'Vell Vell\'s Birthday'],
            [
                'date' => '2000-01-01 00:00:00', // Replace with real date later
                'type' => 'Birthday',
                'icon' => 'Cake',
                'recurringYearly' => true,
            ]
        );

        // Starter Memory
        if (\App\Models\Memory::count() === 0) {
            \App\Models\Memory::create([
                'title' => 'Hello Universe',
                'date' => now(),
                'caption' => 'The beginning of our digital scrapbook.',
                'story' => 'Welcome to our little universe. This is where we will keep all our memories safe.',
                'location' => 'Earth',
                'category' => 'Milestone',
                'isFavorite' => true,
            ]);
        }
    }
}
