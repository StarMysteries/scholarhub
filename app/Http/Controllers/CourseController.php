<?php

namespace App\Http\Controllers;

use App\Models\Course;

class CourseController extends Controller
{
    private $course;

    public function __construct(Course $course) {
        $this->course = $course;
    }

    public function index() {
        $courses = $this->course->all();
        
        return response()->json($courses);
    }
}