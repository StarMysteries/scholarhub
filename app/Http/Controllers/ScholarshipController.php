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
}
