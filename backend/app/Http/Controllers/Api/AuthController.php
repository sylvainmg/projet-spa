<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|string|max:255|unique:utilisateur',
            'password' => 'required|min:8|confirmed',
        ]);

        $user  = User::create([
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json([
            'user'  => $user,
            'token' => $user->createToken('auth-token')->plainTextToken,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('username', 'password'))) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $user = Auth::user();

        return response()->json([
            'user'  => $user,
            'token' => $user->createToken('auth-token')->plainTextToken,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}