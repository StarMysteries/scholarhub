<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScholarshipCoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('scholarship_courses')->insert([
            [
                'course_id' => 'BSCS',
                'scholarship_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'BSIS',
                'scholarship_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'BSIT',
                'scholarship_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more student records as needed
        ]);
    }
}
