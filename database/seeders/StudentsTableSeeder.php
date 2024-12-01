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
            // Student id 1
            [
                'user_id' => 2,
                'course_id' => 'BSIS',
                'student_fname' => 'Chris Pii',
                'student_lname' => 'Bacon',
                'student_address' => '123 Main St',
                'student_contact' => '1234-567-8911',
                'student_picPath' => 'Somewhere',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Student id 2
            [
                'user_id' => 4,
                'course_id' => 'BSIT',
                'student_fname' => 'Gol Dee',
                'student_lname' => 'Lux',
                'student_address' => '123 Main St',
                'student_contact' => '1234-567-8911',
                'student_picPath' => 'Somewhere',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Student id 3
            [
                'user_id' => 5,
                'course_id' => 'BSCpE',
                'student_fname' => 'Kar',
                'student_lname' => 'Ton',
                'student_address' => '123 Main St',
                'student_contact' => '1234-567-8911',
                'student_picPath' => 'Somewhere',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
