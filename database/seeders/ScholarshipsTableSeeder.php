<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScholarshipsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('scholarships')->insert([
            [
                'provider_id' => 1,
                'scholarship_name' => 'DCISM Scholarship',
                'scholarship_status' => 'Active',
                'scholarship_deadline' => '2024-11-28 17:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more student records as needed
        ]);
    }
}
