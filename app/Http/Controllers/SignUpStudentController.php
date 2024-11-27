<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class SignUpStudentController extends Controller
{
    public function registerStudent(Request $request)
    {

          
        $validator = Validator::make($request->all(), [
            'user_email' => 'required|email|unique:users',
            'user_password' => 'required|min:8',

            'student_fname' => 'required|string|max:255',
            'student_lname' => 'required|string|max:255',
            'student_address' => 'required|string|max:255',
            'student_contact' => 'required|string|max:11',
            'course_id' => 'required|exists:scholarship_courses,course_id|string',
            'student_picPath' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $hashedPassword = Hash::make($request->user_password);


            // Create User
            $user = User::create([
                'user_email' => $request->user_email,
                'user_password' => $hashedPassword,
                'user_role' => 'Student', // Assign the Student role
            ]);

            // Handle the file upload if provided
            $filePath = null;
            if ($request->hasFile('student_picPath')) {
                $filePath = $request->file('student_picPath')->store('students', 'public');
            }

            // Create Student
            Student::create([
                'user_id' => $user->user_id,
                'course_id' => $request->course_id,
                'student_fname' => $request->student_fname,
                'student_lname' => $request->student_lname,
                'student_address' => $request->student_address,
                'student_contact' => $request->student_contact,
                'student_picPath' => $filePath,
            ]);

            return response()->json([
                'message' => 'Student registered successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
