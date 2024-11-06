<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admins')->insert([
            [
                'user_id' => 1, 
                'admin_name' => 'John Doe',
                'admin_contact' => '1234-567-8911',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
