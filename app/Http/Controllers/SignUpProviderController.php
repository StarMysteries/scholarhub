<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Provider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class SignUpProviderController extends Controller
{
    public function registerProvider(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_email' => 'required|email|unique:users',
            'user_password' => 'required|min:8',
            'provider_name' => 'required|string|max:255',
            'provider_contact' => 'required|string|max:11',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
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
                'provider_status' => 'Pending', // Default status
            ]);

            return response()->json([
                'message' => 'Provider registered successfully',
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred in provider Controller',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}


