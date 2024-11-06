<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('courses')->insert([
            [
                'course_id' => 'BSIS',
                'course_name' => 'BS Information System',
                'course_description' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'BSIT',
                'course_name' => 'BS Information Technology',
                'course_description' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'BSCS',
                'course_name' => 'BS Computer Science',
                'course_description' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more course records as needed
        ]);
    }
}
