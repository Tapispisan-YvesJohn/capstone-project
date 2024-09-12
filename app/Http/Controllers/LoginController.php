<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;

class LoginController extends Controller {
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');
    
        try {
          if (!JWTAuth::attempt($credentials)) {
            $response['status'] = 0;
            $response['code'] = 401;
            $response['data'] = null;
            $response['message'] = 'Email or password is incorrect';
    
            return response()->json($response);
          }
        } catch (JWTException $e) {
          $response['data'] = null;
          $response['code'] = 500;
          $response['message'] = 'Could not create token';
    
          return response()->json($response);
        }
    
        $user = auth()->user();

        $user->last_active_at = now();
    
        $data['token'] = auth()->claims([
          'user_id' => $user->id,
          'email' => $user->email,
          'role' => $user->role->role_name,
        ])->attempt($credentials);
    
        $response['data'] = $data;
        $response['status'] = 1;
        $response['code'] = 200;
        $response['message'] = 'Login successful';
    
        return response()->json($response);
      }
    
}
