<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            CoursesTableSeeder::class,
            UsersTableSeeder::class,
            StudentsTableSeeder::class,
            ProvidersTableSeeder::class,
            AdminsTableSeeder::class,
        ]);
    }
}