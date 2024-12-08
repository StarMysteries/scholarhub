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
                'scholarship_desc' => '
                <div>
                    <h2>Eligibility Criteria</h2>
                    <p><strong>To qualify for this scholarship, applicants must meet the following criteria:</strong></p>
                    <ul>
                        <li>Be a full-time student enrolled in one of the following programs: <strong>BS-VAL, BS-CS, or BS-IT</strong>.</li>
                        <li>Maintain a minimum GPA of <strong>3.0 or higher</strong>.</li>
                        <li>Submit a completed application form along with all required documents by the application deadline.</li>
                    </ul>
                    <p><strong>Please ensure that all necessary documents are submitted to complete your application. Incomplete submissions will not be considered.</strong></p>
                </div>
                ',
                'scholarship_status' => 'Active',
                'scholarship_deadline' => $deadline,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('scholarships')->insert($scholarships);
    }
}
