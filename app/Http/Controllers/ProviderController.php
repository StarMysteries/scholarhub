<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
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
}
