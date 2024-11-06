<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('students')->insert([
            [
                'user_id' => 2, // Assuming this is the ID of the 'Student' user
                'course_id' => 'BSIS', // Assuming this course exists in the courses table
                'student_fname' => 'Chris Pii',
                'student_lname' => 'Bacon',
                'student_address' => '123 Main St',
                'student_contact' => '1234-567-8911',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more student records as needed
        ]);
    }
}
