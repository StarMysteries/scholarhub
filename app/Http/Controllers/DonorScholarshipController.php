<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Scholarship;
use App\Models\Provider;

class DonorScholarshipController extends Controller
{
    public function index()
    {
        // Get the authenticated user's ID
        $userId = Auth::id();

        // Retrieve the provider's ID based on the logged-in user's ID
        $provider = Provider::where('user_id', $userId)->first();

        if (!$provider) {
            return response()->json(['message' => 'No provider found for this user'], 404);
        }

        // Fetch scholarships associated with the provider and count applicants
        $scholarships = Scholarship::where('provider_id', $provider->provider_id)
            ->with('courses') // Load associated courses
            ->withCount('applications') // Count the related applications
            ->get();

        return response()->json($scholarships);
    }
}
