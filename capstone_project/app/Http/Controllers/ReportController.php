<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentRecord;

class ReportController extends Controller
{
    // Method to fetch reports
    public function index()
    {
        // Assuming reports are fetched from the StudentRecord model
        $reports = StudentRecord::all(); // Adjust this to your needs
        return response()->json($reports); // Return reports as JSON
    }

    // Method to handle batch imports (optional)
    public function import(Request $request)
    {
        // Process the imported file here
        if ($request->hasFile('file')) {
            // Add logic to handle file and import data
        }
        
        return response()->json(['message' => 'Reports imported successfully!'], 200);
    }
}
