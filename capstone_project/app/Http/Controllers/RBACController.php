<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Permission;

class RBACController extends Controller
{
    public function storeRole(Request $request)
    {
        $role = Role::create([
            'name' => $request->input('name')
        ]);

        $permissions = Permission::whereIn('name', $request->input('permissions'))->get();
        $role->permissions()->attach($permissions);

        return response()->json(['message' => 'Role created successfully with permissions.']);
    }

    public function assignRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $role = Role::where('name', $request->input('role'))->first();
        $user->role()->associate($role);
        $user->save();

        return response()->json(['message' => 'Role assigned successfully.']);
    }
}
