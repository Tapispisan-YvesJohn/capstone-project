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
use Illuminate\Database\QueryException;

class StudentRecordController extends Controller
{
    public function store(Request $request)
    {
        // Validation
        $validatedData = $request->validate([
            // Personal Information
            'lastName' => 'required|string|min:2',
            'firstName' => 'required|string|min:2',
            'middleName' => 'required|string',
            'civilStatus' => 'required|string',
            'religion' => 'required|string',
            'email' => 'required|string|email|unique:personal_information,email',  // Adjusted table name
            'course' => 'required|string',
            'dob' => 'required|date',
            'placeOfBirth' => 'required|string',
            'mobileNo' => 'required|string|regex:/^[0-9]{10,11}$/|unique:personal_information,mobile_no',  // Adjusted table name
            'address' => 'required|string',
            'emergencyContact' => 'required|string',
            
            // Educational Background
            'elementarySchool' => 'required|string',
            'juniorHighSchool' => 'required|string',
            'seniorHighSchool' => 'required|string',

            // Family Background
            'fatherName' => 'required|string',
            'fatherAge' => 'required|integer|min:18|max:120',
            'fatherOccupation' => 'required|string',
            'motherName' => 'required|string',
            'motherAge' => 'required|integer|min:18|max:120',
            'motherOccupation' => 'required|string',

            // Health
            'vision' => 'required|string',
            'hearing' => 'required|string',
            'generalHealth' => 'required|string',

            // Test Results
            'testDate' => 'required|date',
            'testAdministered' => 'required|string',
            'testResults' => 'required|string',
            'testDescription' => 'required|string',

            // Significant Notes
            'incidentDate' => 'required|date',
            'incident' => 'required|string',
            'remarks' => 'required|string',
        ]);

        try {
            // Create the student record
            $studentRecord = StudentRecord::create([]);

            // Store personal information
            PersonalInformation::create([
                'student_record_id' => $studentRecord->id,
                'last_name' => $validatedData['lastName'],
                'first_name' => $validatedData['firstName'],
                'middle_name' => $validatedData['middleName'],
                'civil_status' => $validatedData['civilStatus'],
                'religion' => $validatedData['religion'],
                'email' => $validatedData['email'],
                'course' => $validatedData['course'],
                'dob' => $validatedData['dob'],
                'place_of_birth' => $validatedData['placeOfBirth'],
                'mobile_no' => $validatedData['mobileNo'],
                'address' => $validatedData['address'],
                'emergency_contact' => $validatedData['emergencyContact'],
            ]);

            // Store educational background
            EducationalBackground::create([
                'student_record_id' => $studentRecord->id,
                'elementary_school' => $validatedData['elementarySchool'],
                'junior_high_school' => $validatedData['juniorHighSchool'],
                'senior_high_school' => $validatedData['seniorHighSchool'],
            ]);

            // Store family background
            FamilyBackground::create([
                'student_record_id' => $studentRecord->id,
                'father_name' => $validatedData['fatherName'],
                'father_age' => $validatedData['fatherAge'],
                'father_occupation' => $validatedData['fatherOccupation'],
                'mother_name' => $validatedData['motherName'],
                'mother_age' => $validatedData['motherAge'],
                'mother_occupation' => $validatedData['motherOccupation'],
            ]);

            // Store health record
            HealthRecord::create([
                'student_record_id' => $studentRecord->id,
                'vision' => $validatedData['vision'],
                'hearing' => $validatedData['hearing'],
                'general_health' => $validatedData['generalHealth'],
            ]);

            // Store test results
            TestResult::create([
                'student_record_id' => $studentRecord->id,
                'test_date' => $validatedData['testDate'],
                'test_administered' => $validatedData['testAdministered'],
                'test_results' => $validatedData['testResults'],
                'test_description' => $validatedData['testDescription'],
            ]);

            // Store significant notes
            SignificantNote::create([
                'student_record_id' => $studentRecord->id,
                'date' => $validatedData['incidentDate'],
                'incident' => $validatedData['incident'],
                'remarks' => $validatedData['remarks'],
            ]);

            return response()->json(['message' => 'Record created successfully'], 201);

        } catch (QueryException $e) {
            // Handle unique constraint violation
            if ($e->errorInfo[1] == 1062) {
                return response()->json([
                    'message' => 'Duplicate entry detected: ' . $e->getMessage()
                ], 409); // 409 Conflict status code
            }

            // Handle other database errors
            return response()->json([
                'message' => 'Database error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function index()
{
    // Fetch all student records with their associated personal information
    $studentRecords = StudentRecord::with('personalInformation')->get();

    return response()->json($studentRecords);
}

public function destroy($id)
{
    try {
        $studentRecord = StudentRecord::findOrFail($id);

        // Delete associated records
        $studentRecord->personalInformation()->delete();
        $studentRecord->educationalBackground()->delete();
        $studentRecord->familyBackground()->delete();
        $studentRecord->healthRecord()->delete();
        $studentRecord->testResults()->delete();
        $studentRecord->significantNotes()->delete();

        // Delete the student record itself
        $studentRecord->delete();

        return response()->json(['message' => 'Record deleted successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error deleting record: ' . $e->getMessage()], 500);
    }
}

public function show($id)
{
    try {
        $studentRecord = StudentRecord::with([
            'personalInformation',
            'educationalBackground',
            'familyBackground',
            'healthRecord',
            'testResults',
            'significantNotes'
        ])->findOrFail($id);

        return response()->json($studentRecord);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Record not found'], 404);
    }
}


}
