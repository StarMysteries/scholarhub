<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ApplicantController extends Controller
{
    public function getApplicantsByScholarship($scholarship_id)
    {
        $applicants = DB::table('applications')
            ->join('students', 'applications.student_id', '=', 'students.student_id')
            ->select('applications.application_id', 'students.student_fname', 'students.student_lname', 'students.course_id', 'applications.application_status')
            ->where('applications.scholarship_id', $scholarship_id)
            ->get();

        return response()->json(['applicants' => $applicants, 'scholarshipId' => $scholarship_id]);
    }
}