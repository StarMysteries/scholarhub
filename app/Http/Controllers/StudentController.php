<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function registerStudent(Request $request)
    {
        // Custom error messages for validation
        $messages = [
            'user_email.required' => 'The email address is required.',
            'user_email.email' => 'The email address must be valid.',
            'user_email.unique' => 'The email address is already in use.',
            'user_password.required' => 'The password is required.',
            'user_password.min' => 'The password must be at least 8 characters.',
            'student_fname.required' => 'The first name is required.',
            'student_fname.string' => 'The first name must be a valid string.',
            'student_fname.max' => 'The first name cannot exceed 255 characters.',
            'student_lname.required' => 'The last name is required.',
            'student_lname.string' => 'The last name must be a valid string.',
            'student_lname.max' => 'The last name cannot exceed 255 characters.',
            'student_address.required' => 'The address is required.',
            'student_address.string' => 'The address must be a valid string.',
            'student_address.max' => 'The address cannot exceed 255 characters.',
            'student_contact.required' => 'The contact number is required.',
            'student_contact.string' => 'The contact number must be a valid string.',
            'student_contact.max' => 'The contact number cannot exceed 11 characters.',
            'student_contact.min' => 'The contact number must be 11 characters.',
            'course_id.required' => 'The course selection is required.',
            'course_id.exists' => 'The selected course does not exist.',
        ];

        // Validation rules
        $validator = Validator::make($request->all(), [
            'user_email' => 'required|email|unique:users',
            'user_password' => 'required|min:8',
            'student_fname' => 'required|string|max:255',
            'student_lname' => 'required|string|max:255',
            'student_address' => 'required|string|max:255',
            'student_contact' => 'required|string|max:11|min:11',
            'course_id' => 'required|exists:courses,course_id',
        ], $messages);

        // Handle validation failures
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed. Please fix the errors below.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $hashedPassword = Hash::make($request->user_password);

            // Create the user
            $user = User::create([
                'user_email' => $request->user_email,
                'user_password' => $hashedPassword,
                'user_role' => 'Student',
            ]);

            // Create the student record
            Student::create([
                'user_id' => $user->user_id,
                'course_id' => $request->course_id,
                'student_fname' => $request->student_fname,
                'student_lname' => $request->student_lname,
                'student_address' => $request->student_address,
                'student_contact' => $request->student_contact,
            ]);

            return response()->json([
                'message' => 'Student registered successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}