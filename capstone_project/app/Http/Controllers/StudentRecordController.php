<?php

namespace App\Http\Controllers;

use App\Models\StudentRecord;
use Illuminate\Http\Request;

class StudentRecordController extends Controller {
    
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'age' => 'required|integer',
            'height' => 'required|numeric',
            'weight' => 'required|numeric',
            'gender' => 'required|string|max:255',
            'hs_average' => 'required|numeric',
            'civil_status' => 'required|string|max:255',
            'religion' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'year_section' => 'required|string|max:255',
            'telephone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:student_records',
            'date_of_birth' => 'required|date',
            'place_of_birth' => 'required|string|max:255',
            'residential_address' => 'required|string|max:255',
            'provincial_address' => 'nullable|string|max:255',
        ]);

        $studentRecord = StudentRecord::create($validatedData);

        return response()->json(['message' => 'Record created successfully', 'data' => $studentRecord], 201);
    }
}
