<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApplicationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('applications')->insert([
            // DCISM Scholarship is id=1
            [
                'scholarship_id' => 1,
                'student_id' => 1,
                'application_status' => 'Pending',
                'rejection_details' => null,
                'application_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'scholarship_id' => 1,
                'student_id' => 2,
                'application_status' => 'Pending',
                'rejection_details' => null,
                'application_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Engineering Scholarship is id=2
            [
                'scholarship_id' => 2,
                'student_id' => 3,
                'application_status' => 'Pending',
                'rejection_details' => null,
                'application_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
