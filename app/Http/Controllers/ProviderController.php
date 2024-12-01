<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class ProviderController extends Controller
{
    // Fetch provider by user ID
    public function getProviderByUserId($user_id)
    {
        $provider = Provider::where('providers.user_id', $user_id)
            ->join('users', 'providers.user_id', '=', 'users.user_id')
            ->select(
                'providers.provider_name',
                'providers.provider_contact',
                'providers.provider_picPath',
                'users.user_email'
            )
            ->first();

        if (!$provider) {
            return response()->json(['message' => 'Provider not found'], 404);
        }

        return response()->json($provider);
    }



    // Register Provider
    public function registerProvider(Request $request)
    {
        // Custom error messages for validation
        $messages = [
            'user_email.required' => 'The email address is required.',
            'user_email.email' => 'The email address must be valid.',
            'user_email.unique' => 'The email address is already in use.',
            'user_password.required' => 'The password is required.',
            'user_password.min' => 'The password must be at least 8 characters.',

            'provider_name.required' => 'Name is required.',
            'provider_name.string' => 'Name must be a valid string.',
            'provider_name.max' => 'Name cannot exceed 255 characters.',

            'provider_contact.required' => 'The contact number is required.',
            'provider_contact.string' => 'The contact number must be a valid string.',
            'provider_contact.max' => 'The contact number cannot exceed 11 characters.',
            'provider_contact.min' => 'The contact number must be 11 characters.',
        ];

        $validator = Validator::make($request->only([
            'user_email',
            'user_password',
            'provider_name',
            'provider_contact',
        ]), [
            'user_email' => 'required|email|unique:users',
            'user_password' => 'required|min:8',
            'provider_name' => 'required|string|max:255',
            'provider_contact' => 'required|string|max:11|min:11',
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

            $user = User::create([
                'user_email' => $request->user_email,
                'user_password' => $hashedPassword,
                'user_role' => 'Provider',
            ]);

            // Create provider record without certification file
            Provider::create([
                'user_id' => $user->user_id,
                'provider_name' => $request->provider_name,
                'provider_contact' => $request->provider_contact,
                'provider_picPath' => NULL, // NULL because no server to store picture
                'provider_certification' => NULL, // NULL because no server to store file
            ]);

            return response()->json([
                'message' => 'Provider registered successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
