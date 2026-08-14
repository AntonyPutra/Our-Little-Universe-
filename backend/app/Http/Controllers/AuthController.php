<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function unlock(Request $request)
    {
        $request->validate([
            'passcode' => 'required|string'
        ]);

        $hash = env('OUR_SPACE_PASSCODE_HASH');

        if (Hash::check($request->passcode, $hash)) {
            $request->session()->put('is_unlocked', true);
            $request->session()->regenerate();
            return response()->json(['message' => 'Unlocked']);
        }

        return response()->json(['message' => 'Invalid passcode'], 401);
    }

    public function status(Request $request)
    {
        if ($request->session()->get('is_unlocked')) {
            return response()->json(['unlocked' => true]);
        }
        return response()->json(['unlocked' => false], 401);
    }

    public function lock(Request $request)
    {
        $request->session()->forget('is_unlocked');
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Locked']);
    }
}
