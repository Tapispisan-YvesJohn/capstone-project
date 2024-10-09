<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ApplicationController extends Controller
{
    public function updateStatus(Request $request)
    {
        $status = $request->input('status');

        DB::table('application_status')->update(['is_application_open' => $status]);

        return response()->json(['message' => 'Application status updated successfully']);
    }

    public function getStatus()
    {
        $status = DB::table('application_status')->pluck('is_application_open')->first();

        return response()->json(['is_application_open' => $status]);
    }
}

