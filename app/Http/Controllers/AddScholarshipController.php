<?php

namespace App\Http\Controllers;

use App\Models\Scholarship;
use App\Models\ScholarshipCourse;
use App\Models\Provider;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddScholarshipController extends Controller
{
    public function store(Request $request)
{
    // Validate the incoming request
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'required|in:Active,Inactive',
        'deadline' => 'required|date',
        'courses' => 'nullable|array',
        'courses.*' => 'exists:courses,course_id', // Ensure courses exist in the `courses` table
    ]);

    // Get the currently authenticated user's provider
    $userId = Auth::id();
    $provider = Provider::where('user_id', $userId)->first();

    if (!$provider) {
        return response()->json(['error' => 'Provider not found for the current user.'], 404);
    }

    try {
        // Create the scholarship
        $scholarship = Scholarship::create([
            'provider_id' => $provider->provider_id,
            'scholarship_name' => $validated['name'],
            'scholarship_desc' => $validated['description'],
            'scholarship_status' => $validated['status'],
            'scholarship_deadline' => $validated['deadline'],
        ]);

        // Attach courses if provided
        if (!empty($validated['courses'])) {
            $scholarship->courses()->attach($validated['courses']);
        }

        return response()->json(['message' => 'Scholarship created successfully.'], 201);

    } catch (\Exception $e) {
        // Log the error for debugging
     

        return response()->json(['error' => 'Failed to create scholarship.'], 500);
    }
}

}
