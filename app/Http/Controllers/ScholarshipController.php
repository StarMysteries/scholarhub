<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Scholarship;

class ScholarshipController extends Controller
{
    public function index()
    {
        $scholarships = Scholarship::where('scholarship_status', 'Active')->with('courses')->get();
        return response()->json($scholarships->toArray());
    }

    public function getScholarshipById($scholarship_id)
    {
        $scholarship = DB::table('scholarships')
            ->where('scholarships.scholarship_id', $scholarship_id)
            ->select(
                'scholarships.scholarship_id',
                'scholarships.scholarship_name',
                'scholarships.scholarship_desc',
                'scholarships.scholarship_status',
                'scholarships.scholarship_deadline'
            )
            ->first();

        if (!$scholarship) {
            return response()->json(['message' => 'Scholarship not found'], 404);
        }

        $courses = DB::table('scholarship_courses')
            ->join('courses', 'scholarship_courses.course_id', '=', 'courses.course_id')
            ->where('scholarship_courses.scholarship_id', $scholarship_id)
            ->select('courses.course_id', 'courses.course_name')
            ->get();

        return response()->json([
            'scholarship_id' => $scholarship->scholarship_id,
            'scholarship_name' => $scholarship->scholarship_name,
            'scholarship_desc' => $scholarship->scholarship_desc,
            'scholarship_status' => $scholarship->scholarship_status,
            'scholarship_deadline' => $scholarship->scholarship_deadline,
            'courses' => $courses
        ], 200);
    }

    public function updateStatus(Request $request, $id)
    {
        // Find the scholarship by ID
        $scholarship = Scholarship::findOrFail($id);

        // Toggle the status between 'Active' and 'Inactive'
        $scholarship->scholarship_status = $scholarship->scholarship_status === 'Active' ? 'Inactive' : 'Active';

        // Save the updated status
        $scholarship->save();

        // Return a success response
        return response()->json([
            'success' => true,
            'message' => 'Scholarship status updated successfully',
            'scholarship' => $scholarship
        ]);
    }

    public function updateScholarship(Request $request, $scholarshipId)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|in:Active,Inactive',
            'deadline' => 'required|date',
            'courses' => 'required|array',
            'courses.*' => 'exists:courses,course_id', // Ensure courses exist
        ]);

        // Find the scholarship
        $scholarship = Scholarship::find($scholarshipId);
        if (!$scholarship) {
            return response()->json(['message' => 'Scholarship not found'], 404);
        }

        // Update the scholarship
        $scholarship->update([
            'scholarship_name' => $validated['name'],
            'scholarship_desc' => $validated['description'],
            'scholarship_status' => $validated['status'],
            'scholarship_deadline' => $validated['deadline'],
        ]);

        // Sync the courses with the scholarship
        $scholarship->courses()->sync($validated['courses']); // Sync courses based on their IDs

        return response()->json($scholarship, 200);
    }
}
