<?php

namespace App\Http\Controllers;

use App\Models\StudentRecord;
use App\Models\PersonalInformation;
use App\Models\EducationalBackground;
use App\Models\FamilyBackground;
use App\Models\HealthRecord;
use App\Models\TestResult;
use App\Models\SignificantNote;
use Illuminate\Http\Request;

class StudentRecordController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'personal_information' => 'required|array',
            'educational_background' => 'required|array',
            'family_background' => 'required|array',
            'health_record' => 'required|array',
            'test_results' => 'required|array',
            'significant_notes' => 'required|array',
        ]);

        // Create student record
        $studentRecord = StudentRecord::create([]);

        // Store personal information
        $personalInfoData = $validatedData['personal_information'];
        $personalInfoData['student_record_id'] = $studentRecord->id;
        PersonalInformation::create($personalInfoData);

        // Store educational background
        $educationData = $validatedData['educational_background'];
        $educationData['student_record_id'] = $studentRecord->id;
        EducationalBackground::create($educationData);

        // Store family background
        $familyData = $validatedData['family_background'];
        $familyData['student_record_id'] = $studentRecord->id;
        FamilyBackground::create($familyData);

        // Store health record
        $healthData = $validatedData['health_record'];
        $healthData['student_record_id'] = $studentRecord->id;
        HealthRecord::create($healthData);

        // Store test results
        $testResultData = $validatedData['test_results'];
        $testResultData['student_record_id'] = $studentRecord->id;
        TestResult::create($testResultData);

        // Store significant notes
        $significantNoteData = $validatedData['significant_notes'];
        $significantNoteData['student_record_id'] = $studentRecord->id;
        SignificantNote::create($significantNoteData);

        return response()->json(['message' => 'Record created successfully'], 201);
    }
}
