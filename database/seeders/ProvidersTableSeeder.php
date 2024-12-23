<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvidersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('providers')->insert([
            [
                'user_id' => 3, // Assuming this is the ID of the 'Provider' user
                'provider_name' => 'University of San Carlos',
                'provider_status' => 'Approved',
                'provider_contact' => '12345678911',
                'provider_picPath' => NULL,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more provider records as needed
        ]);
    }
}
