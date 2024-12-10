<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Application;
use Illuminate\Support\Facades\Validator;

class ApplicationsController extends Controller
{
   
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



    public function submitApplication(Request $request)
{
    $userId = Auth::id();

    $student = DB::table('students')->where('user_id', $userId)->first();

    if (!$student) {
        return response()->json(['error' => 'Student not found for the given user ID.'], 404);
    }

    // Validate the request data (scholarship_id)
    $validator = Validator::make($request->all(), [
        'scholarship_id' => 'required|exists:scholarships,scholarship_id',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    // Create the application with a 'Pending' status using the found student_id
    $application = Application::create([
        'student_id' => $student->student_id,  // Use the resolved student_id
        'scholarship_id' => $request->scholarship_id,
        'application_status' => 'Pending',
        'application_date' => now(),  // Current timestamp
    ]);

    return response()->json(['message' => 'Application submitted successfully', 'application' => $application], 201);
}



}
