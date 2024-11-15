<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use App\Models\Scholarship;

class ScholarshipController extends Controller
{
    public function index()
    {
        $scholarships = Scholarship::with('courses')->get();
        return response()->json($scholarships->toArray());
    }
}