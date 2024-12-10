<?php

namespace App\Http\Controllers;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApplicantController extends Controller
{
    public function getApplicantsByScholarship($scholarship_id)
    {
        // Fetch scholarship details and applicants in one query
        $scholarship = DB::table('scholarships')
            ->where('scholarship_id', $scholarship_id)
            ->first();

        if (!$scholarship) {
            return response()->json(['error' => 'Scholarship not found'], 404);
        }

        $applicants = DB::table('applications')
            ->join('students', 'applications.student_id', '=', 'students.student_id')
            ->select(
                'applications.application_id',
                'students.student_fname',
                'students.student_lname',
                'students.course_id',
                'applications.application_status'
            )
            ->where('applications.scholarship_id', $scholarship_id)
            ->get();

        return response()->json([
            'scholarshipName' => $scholarship->scholarship_name,
            'applicants' => $applicants,
        ]);
    }

    public function getApplicantDetails($application_id)
    {
        // Fetch the application details by the application_id
        $application = Application::with(['student.user', 'scholarship'])
            ->where('application_id', $application_id)
            ->first();

        if (!$application) {
            return response()->json(['error' => 'Applicant not found'], 404);
        }

        // Format the applicant data
        $applicantData = [
            'applicant_id' => $application->application_id,
            'student_name' => $application->student->student_fname . ' ' . $application->student->student_lname,
            'course' => $application->student->course_id,
            'application_status' => $application->application_status,
            'user_email' => $application->student->user->user_email,
            'phone' => $application->student->student_contact,
            'address' => $application->student->student_address,
            'scholarship_name' => $application->scholarship->scholarship_name,
            'scholarship_desc' => $application->scholarship->scholarship_desc,
            'scholarship_deadline' => $application->scholarship->scholarship_deadline,
        ];

        return response()->json($applicantData);
    }

    public function updateStatus(Request $request, $application_id)
    {
        $application = Application::find($application_id);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        // Validate the incoming request
        $validated = $request->validate([
            'status' => 'required|in:Accepted,Declined',
            'rejection_details' => 'nullable|string',
        ]);

        // Update application status and rejection details if declined
        $application->application_status = $validated['status'];
        if ($validated['status'] == 'Declined') {
            $application->rejection_details = $validated['rejection_details'];
        }

        $application->save();

        return response()->json($application);
    }



}
