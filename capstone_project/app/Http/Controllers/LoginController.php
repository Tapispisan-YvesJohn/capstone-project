<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\UserInfo;

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
    
    public function retrieve(Request $request, $id, $email) {
      try {
          // Verify JWT token
          $user = JWTAuth::parseToken()->authenticate();
      } catch (TokenExpiredException $e) {
          return response()->json(['message' => 'Token expired'], 401);
      } catch (TokenInvalidException $e) {
          return response()->json(['message' => 'Token invalid'], 401);
      } catch (JWTException $e) {
          return response()->json(['message' => 'Token absent'], 401);
      }

      // Check if the user's ID and email match the parameters
      if ($user->id == $id && $user->email == $email && $user->is_active == 1) {
          // Retrieve user info based on user_id
          $userInfo = UserInfo::where('user_id', $id)->first();

          if ($userInfo) {
              return response()->json([
                  'first_name' => $userInfo->first_name,
                  'last_name' => $userInfo->last_name,
                  'email' => $user->email,
                  'student_number' => $userInfo->student_number,
                  'birthday' => $userInfo->birthday,
                  'gender' => $userInfo->gender,
                  'user_id' => $userInfo->user_id,
                  'role_id' => $userInfo->role_id,
                  'account_status_id' => $userInfo->account_status_id,
                  'icon_id' => $userInfo->icon_id
              ]);
          } else {
              return response()->json(['message' => 'User info not found'], 404);
          }
      } else {
          return response()->json(['message' => 'Unauthorized'], 403);
      }
    }

}
