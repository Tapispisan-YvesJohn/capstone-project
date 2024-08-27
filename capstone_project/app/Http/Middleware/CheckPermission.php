<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPermission
{
    public function handle($request, Closure $next, $permission)
    {
        if (!$request->user()->permissions->contains('name', $permission)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}

