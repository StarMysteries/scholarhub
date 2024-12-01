<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursesCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('courses_category')->insert([
            // ID = 1
            [
                'category_name' => 'Humanities',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 2
            [
                'category_name' => 'Social Sciences',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 3
            [
                'category_name' => 'Natural Sciences',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 4
            [
                'category_name' => 'Formal Sciences',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 5
            [
                'category_name' => 'Agriculture',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 6
            [
                'category_name' => 'Business',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 7
            [
                'category_name' => 'Health Sciences',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 8
            [
                'category_name' => 'Education',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 9
            [
                'category_name' => 'Engineering',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 10
            [
                'category_name' => 'Media and Communication',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 11
            [
                'category_name' => 'Public Administration',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 12
            [
                'category_name' => 'Transportation',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ID = 13
            [
                'category_name' => 'Nutrition',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
