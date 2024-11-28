<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ScholarshipsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // public function run(): void
    // {
    //     DB::table('scholarships')->insert([
    //         [
    //             'provider_id' => 1,
    //             'scholarship_name' => 'DCISM Scholarship',
    //             'scholarship_desc' => '',
    //             'scholarship_status' => 'Active',
    //             'scholarship_deadline' => '2024-11-28 17:00:00',
    //             'created_at' => now(),
    //             'updated_at' => now(),
    //         ],
    //         [
    //             'provider_id' => 1,
    //             'scholarship_name' => 'Engineering Scholarship',
    //             'scholarship_desc' => '',
    //             'scholarship_status' => 'Inactive',
    //             'scholarship_deadline' => '2024-11-28 17:00:00',
    //             'created_at' => now(),
    //             'updated_at' => now(),
    //         ],
    //     ]);
    // }
    public function run()
    {
        $scholarships = [];
        $deadline = now()->addMonths(1)->setTime(17, 0, 0); // Adjust deadline as needed

        for ($i = 1; $i <= 150; $i++) {
            $scholarships[] = [
                'provider_id' => 1,
                'scholarship_name' => 'Scholarship ' . Str::random(6) . " #$i",
                'scholarship_desc' => '',
                'scholarship_status' => 'Active',
                'scholarship_deadline' => $deadline,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('scholarships')->insert($scholarships);
    }
}
