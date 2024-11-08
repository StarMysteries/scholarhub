<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


// Models
use App\Models\User;
use App\Models\Provider;
use App\Models\Student;

class UserAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'user_email' => 'required|email',
            'user_password' => 'required',
        ]);

        $user = User::where('user_email', $request->user_email)->first();

        if ($user && Hash::check($request->user_password, $user->user_password)) {
            $responseData = [
                'message' => 'Login successful',
                'user' => $user,
                'user_role' => $user->user_role,
            ];

            if ($user->user_role === 'Provider') {
                $provider = Provider::where('user_id', $user->user_id)->first();
                if ($provider) {
                    $responseData['provider_name'] = $provider->provider_name;
                }
            }else if($user->user_role === 'Student') {
                $student = Student::where('user_id', $user->user_id)->first();
                if ($student) {
                    $responseData['student_fname'] = $student->student_fname;
                    $responseData['student_lname'] = $student->student_lname;
                }
            }

            return response()->json($responseData);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout successful']);
    }
}
