<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ApplicationsController extends Controller
{
    /**
     * Fetch applications for the authenticated student.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStudentApplications()
    {
        $userId = Auth::id();

        $applications = DB::table('applications')
            ->join('scholarships', 'applications.scholarship_id', '=', 'scholarships.scholarship_id')
            ->join('students', 'applications.student_id', '=', 'students.student_id')
            ->select(
                'applications.application_id',
                'scholarships.scholarship_name',
                'scholarships.scholarship_status',
                'scholarships.scholarship_deadline',
                'applications.application_status',
                'students.student_fname',
                'students.student_lname',
                'students.course_id',
                'students.student_address',
                'students.student_contact',
            )
            ->where('students.user_id', $userId)
            ->get();

        return response()->json($applications);
    }
}
