<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

// Models
use App\Models\User;
use App\Models\Provider;
use App\Models\Student;

class UserAuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate login credentials
        $request->validate([
            'user_email' => 'required|email',
            'user_password' => 'required',
        ]);

        // Retrieve user from the database
        $user = User::where('user_email', $request->user_email)->first();

        if ($user && Hash::check($request->user_password, $user->user_password)) {
            // Authenticate user
            Auth::login($user);

            // Prepare response data
            $responseData = [
                'message' => 'Login successful',
                'user_role' => $user->user_role,
            ];

            // Add role-specific information
            if ($user->user_role === 'Provider') {
                $provider = Provider::where('user_id', $user->user_id)->first();
                if ($provider) {
                    $responseData['provider_name'] = $provider->provider_name;
                }
            } elseif ($user->user_role === 'Student') {
                $student = Student::where('user_id', $user->user_id)->first();
                if ($student) {
                    $responseData['student_fname'] = $student->student_fname;
                    $responseData['student_lname'] = $student->student_lname;
                }
            }

            return response()->json($responseData, 200);
        }

        // Invalid credentials
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        // Logout the user and invalidate the session
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout successful']);
    }
}