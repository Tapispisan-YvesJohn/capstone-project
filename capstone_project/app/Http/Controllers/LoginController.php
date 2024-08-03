<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller {
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => 0,
                    'code' => 401,
                    'data' => null,
                    'message' => 'Email or password is incorrect'
                ]);
            }
        } catch (JWTException $e) {
            return response()->json([
                'status' => 0,
                'code' => 500,
                'data' => null,
                'message' => 'Could not create token'
            ]);
        }

        return response()->json([
            'status' => 1,
            'code' => 200,
            'data' => [
                'token' => $token,
                'user' => $user,
            ],
            'message' => 'Login successful'
        ]);
    }
}
