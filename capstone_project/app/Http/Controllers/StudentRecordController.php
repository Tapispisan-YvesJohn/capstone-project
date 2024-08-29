<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
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

        // Store deleted record information in a separate table or a log
        $deletedRecord = [
            'student_record_id' => $studentRecord->id,
            'personal_information' => $studentRecord->personalInformation,
            'deleted_at' => now(),
        ];

        // Insert the deleted record into a `deleted_records` table or similar
        DB::table('deleted_records')->insert($deletedRecord);

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

public function retrieveDeletedRecord($id)
{
    try {
        $deletedRecord = DB::table('deleted_records')->where('student_record_id', $id)->first();

        if (!$deletedRecord) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        // Convert the personal information and other data back to arrays
        $personalInfo = json_decode($deletedRecord->personal_information, true);

        // Restore the student record and related data
        $studentRecord = StudentRecord::create([]);
        $studentRecord->personalInformation()->create($personalInfo);
        // Optionally, restore other associated data here

        // Remove the record from the deleted_records table
        DB::table('deleted_records')->where('student_record_id', $id)->delete();

        return response()->json(['message' => 'Record retrieved successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error retrieving record: ' . $e->getMessage()], 500);
    }
}

public function deletePermanently($id)
{
    try {
        $deletedRecord = DB::table('deleted_records')->where('student_record_id', $id)->first();

        if (!$deletedRecord) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        // Permanently delete the record from the deleted_records table
        DB::table('deleted_records')->where('student_record_id', $id)->delete();

        return response()->json(['message' => 'Record permanently deleted'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error deleting record: ' . $e->getMessage()], 500);
    }
}

public function getDeletedRecords()
{
    $deletedRecords = DB::table('deleted_records')->get();
    return response()->json($deletedRecords);
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

public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'lastName' => 'required|string|min:2',
        'firstName' => 'required|string|min:2',
        'middleName' => 'required|string',
        'civilStatus' => 'required|string',
        'religion' => 'required|string',
        'email' => 'required|string|email|unique:personal_information,email,' . $id,
        'course' => 'required|string',
        'dob' => 'required|date',
        'placeOfBirth' => 'required|string',
        'mobileNo' => 'required|string|regex:/^[0-9]{10,11}$/|unique:personal_information,mobile_no,' . $id,
        'address' => 'required|string',
        'emergencyContact' => 'required|string',
        
        // Validation for Educational Background
        'elementarySchool' => 'required|string',
        'juniorHighSchool' => 'required|string',
        'seniorHighSchool' => 'required|string',
        
        // Validation for Family Background
        'fatherName' => 'required|string',
        'fatherAge' => 'required|integer|min:18|max:120',
        'fatherOccupation' => 'required|string',
        'motherName' => 'required|string',
        'motherAge' => 'required|integer|min:18|max:120',
        'motherOccupation' => 'required|string',
        
        // Validation for Health Record
        'vision' => 'required|string',
        'hearing' => 'required|string',
        'generalHealth' => 'required|string',

        // Validation for Test Results
        'testDate' => 'required|date',
        'testAdministered' => 'required|string',
        'testResults' => 'required|string',
        'testDescription' => 'required|string',

        // Validation for Significant Notes
        'incidentDate' => 'required|date',
        'incident' => 'required|string',
        'remarks' => 'required|string',
    ]);

    try {
        $studentRecord = StudentRecord::findOrFail($id);
        $studentRecord->personalInformation()->update([
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

        // Update Educational Background
        $studentRecord->educationalBackground()->update([
            'elementary_school' => $validatedData['elementarySchool'],
            'junior_high_school' => $validatedData['juniorHighSchool'],
            'senior_high_school' => $validatedData['seniorHighSchool'],
        ]);

        // Update Family Background
        $studentRecord->familyBackground()->update([
            'father_name' => $validatedData['fatherName'],
            'father_age' => $validatedData['fatherAge'],
            'father_occupation' => $validatedData['fatherOccupation'],
            'mother_name' => $validatedData['motherName'],
            'mother_age' => $validatedData['motherAge'],
            'mother_occupation' => $validatedData['motherOccupation'],
        ]);

        // Update Health Record
        $studentRecord->healthRecord()->update([
            'vision' => $validatedData['vision'],
            'hearing' => $validatedData['hearing'],
            'general_health' => $validatedData['generalHealth'],
        ]);

        // Update Test Results
        $studentRecord->testResults()->update([
            'test_date' => $validatedData['testDate'],
            'test_administered' => $validatedData['testAdministered'],
            'test_results' => $validatedData['testResults'],
            'test_description' => $validatedData['testDescription'],
        ]);

        // Update Significant Notes
        $studentRecord->significantNotes()->update([
            'date' => $validatedData['incidentDate'],
            'incident' => $validatedData['incident'],
            'remarks' => $validatedData['remarks'],
        ]);

        return response()->json(['message' => 'Record updated successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error updating record: ' . $e->getMessage()], 500);
    }
}
}
