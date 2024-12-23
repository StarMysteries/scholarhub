<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            CoursesCategorySeeder::class,
            CoursesTableSeeder::class,
            UsersTableSeeder::class,
            StudentsTableSeeder::class,
            ProvidersTableSeeder::class,
            AdminsTableSeeder::class,
            ScholarshipsTableSeeder::class,
            ScholarshipCoursesTableSeeder::class,
            ApplicationsTableSeeder::class,
        ]);
    }
}