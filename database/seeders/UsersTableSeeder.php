<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'user_email' => 'admin@gmail.com',
                'user_role' => 'Admin',
                'user_password' => Hash::make('testing123@'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_email' => 'student@gmail.com',
                'user_role' => 'Student',
                'user_password' => Hash::make('testing123@'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_email' => 'provider@gmail.com',
                'user_role' => 'Provider',
                'user_password' => Hash::make('testing123@'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more user records as needed
        ]);
    }
}
