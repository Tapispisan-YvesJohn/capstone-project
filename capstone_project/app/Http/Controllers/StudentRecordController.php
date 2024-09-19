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
use App\Models\EnrollmentReason;
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
            'middleName' => 'nullable|string',
            'civilStatus' => 'required|string',
            'religion' => 'required|string',
            'average' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'course' => 'required|string',
            'birthDate' => 'required|date',
            'birthPlace' => 'required|string',
            'mobileNo' => 'required|string|regex:/^[0-9]{10,11}$/|unique:users,mobileNo',
            'height' => 'required|string',
            'weight' => 'required|string',
            'gender' => 'required|string',


            // Addresses
            'provincialAddress' => 'required|string',
            'cityAddress' => 'required|string',
    
            // Emergency Contact
            'emergencyContact' => 'required|string',
            'relationship' => 'required|string',
            'emergencyPhone' => 'required|string|regex:/^[0-9]{10,11}$/',
            'emergencyEmail' => 'nullable|email',
    
            // Educational Background
            'elementarySchool' => 'required|string',
            'elementaryLocation' => 'required|string',
            'elementaryType' => 'required|string',
            'elementaryYear' => 'required|string',
            'elementaryAwards' => 'nullable|string',
    
            'juniorSchool' => 'required|string',
            'juniorLocation' => 'required|string',
            'juniorType' => 'required|string',
            'juniorYear' => 'required|string',
            'juniorAwards' => 'nullable|string',
    
            'seniorSchool' => 'required|string',
            'seniorLocation' => 'required|string',
            'seniorType' => 'required|string',
            'seniorYear' => 'required|string',
            'seniorAwards' => 'nullable|string',
    
            'otherSchool' => 'nullable|string',
    
            // Family Background
            'fatherName' => 'required|string',
            'fatherAge' => 'required|integer',
            'motherName' => 'required|string',
            'motherAge' => 'required|integer',
            'fatherContact' => 'required|string|regex:/^[0-9]{10,11}$/',
            'fatherEducation' => 'required|string',
            'motherContact' => 'required|string|regex:/^[0-9]{10,11}$/',
            'motherEducation' => 'required|string',
            'fatherOccupation' => 'nullable|string',
            'fatherCompany' => 'nullable|string',
            'motherOccupation' => 'nullable|string',
            'motherCompany' => 'nullable|string',
            'relationshipStatus' => 'required|string',
    
            // Guardian Information
            'guardianName' => 'nullable|string',
            'guardianAddress' => 'nullable|string',
    
            // Family Income
            'monthlyIncome' => 'required|string',
    
            // Siblings
            'siblingsTotal' => 'required|integer',
            'brothers' => 'required|integer',
            'sisters' => 'required|integer',
            'employed' => 'required|integer',
            'supportStudies' => 'required|integer',
            'supportFamily' => 'required|integer',
            'financialSupport' => 'nullable|string',
            'allowance' => 'required|integer',
    
            // Health Information
            'vision' => 'nullable|string',
            'hearing' => 'nullable|string',
            'mobility' => 'nullable|string',
            'speech' => 'nullable|string',
            'generalHealth' => 'nullable|string',
    
            // Psychological Consultations
            'consultedWith' => 'nullable|string',
            'consultationReason' => 'nullable|string',
            'startDate' => 'nullable|date',
            'sessions' => 'nullable|integer',
            'endDate' => 'nullable|date',
    
            // Test Results
            'testDate' => 'nullable|date',
            'testAdministered' => 'nullable|string',
            'rs' => 'nullable|string',
            'pr' => 'nullable|string',
            'description' => 'nullable|string',
    
            // Significant Notes (For Guidance Counselors Only)
            'noteDate' => 'nullable|date',
            'incident' => 'nullable|string',
            'remarks' => 'nullable|string',

            'reasons' => 'array',
            'reasons.*' => 'string|in:lowerTuition,safety,space,nearness,transportation,qualityEducation,adequate,son,close,scholarship,others',
            'otherReasons' => 'nullable|string',
        ]);

        try {
            DB::transaction(function () use ($validatedData) {
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
                    'average' => $validatedData['average'],
                    'email' => $validatedData['email'],
                    'course' => $validatedData['course'],
                    'birth_date' => $validatedData['birthDate'],
                    'birth_place' => $validatedData['birthPlace'],
                    'mobile_no' => $validatedData['mobileNo'],
                    'height' => $validatedData['height'],
                    'weight' => $validatedData['weight'],
                    'gender' => $validatedData['gender'],
                    'address' => $validatedData['provincialAddress'],
                    'city_address' => $validatedData['cityAdress'],
                    'emergency_contact' => $validatedData['emergencyContact'],
                    'relationship' => $validatedData['relationship'],
                    'emergency_phone' => $validatedData['emergencyPhone'], 
                    'emergency_email' => $validatedData['emergencyEmail'],
                ]);
        
                // Store educational background
                EducationalBackground::create([
                    'student_record_id' => $studentRecord->id,
                    'elementary_school' => $validatedData['elementarySchool'],
                    'elementary_location' => $validatedData['elementaryLocation'],
                    'elementary_type' => $validatedData['elemeteryType'],
                    'elementery_year' => $validatedData['elemetaryYear'],
                    'elementary_awards' => $validatedData['elemetaryAwards'],
                    'junior_school' => $validatedData['juniorSchool'],
                    'junior_location' => $validatedData['juniorLocation'],
                    'junior_type' => $validatedData['juniorType'],
                    'junior_year' => $validatedData['juniorYear'],
                    'junior_awards' => $validatedData['juniorAwards'],
                    'senior_school' => $validatedData['seniorHighSchool'],
                    'senior_location' => $validatedData['seniorLocation'],
                    'jsenior_type' => $validatedData['seniorType'],
                    'senior_year' => $validatedData['seniorYear'],
                    'senior_awards' => $validatedData['seniorAwards'],
                    'other_school' => $validatedData['otherSchool']
                ]);
        
                // Store family background
                FamilyBackground::create([
                    'student_record_id' => $studentRecord->id,
                    'father_name' => $validatedData['fatherName'],
                    'father_age' => $validatedData['fatherAge'],
                    'father_contact' => $validatedData['fatherContact'],
                    'father_education' => $validatedData['fatherEducation'],
                    'father_occupation' => $validatedData['fatherOccupation'],
                    'father_company' => $validatedData['fatherCompany'],
                    'mother_name' => $validatedData['motherName'],
                    'mother_age' => $validatedData['motherAge'],
                    'mother_contact' => $validatedData['motherContact'],
                    'mother_education' => $validatedData['motherEducation'],
                    'mother_occupation' => $validatedData['motherOccupation'],
                    'mother_company' => $validatedData['motherCompany'],
                    'relationship_status' => $validatedData['relationshipStatus'],
                    'guardian_name' => $validatedData['guardianName'],
                    'guardian_address' => $validatedData['guardianAddress'],
                    'monthly_income' => $validatedData['monthylIncome'],
                    'siblings_total' => $validatedData['siblingsTotal'],
                    'brothers' => $validatedData['brothers'],
                    'sisters' => $validatedData['sisters'],
                    'employed' => $validatedData['employed'],
                    'support_studies' => $validatedData['supportStudies'],
                    'support_family' => $validatedData['supportFamily'],
                    'financial_support' => $validatedData['financialSupport'],
                    'allowance' => $validatedData['allowance']
                ]);
        
                // Store health record
                HealthRecord::create([
                    'student_record_id' => $studentRecord->id,
                    'vision' => $validatedData['vision'],
                    'hearing' => $validatedData['hearing'],
                    'mobility' => $validatedData['mobility'],
                    'speech' => $validatedData['speech'],
                    'general_health' => $validatedData['generalHealth'],
                    'consulted_with' => $validatedDatap['consultedWith'],
                    'consultation_reason' => $validatedDatap['consultationReason'],
                    'start_date' => $validatedDatap['startDate'],
                    'session' => $validatedDatap['session'],
                    'end_date' => $validatedDatap['endDate'],
                ]);
        
                // Store test results
                TestResult::create([
                    'student_record_id' => $studentRecord->id,
                    'test_date' => $validatedData['testDate'],
                    'test_administered' => $validatedData['testAdministered'],
                    'rs' => $validatedData['RS'],
                    'pr' => $validatedDatap['PR'],
                    'test_description' => $validatedData['description'],
                ]);
        
                // Store significant notes
                SignificantNote::create([
                    'student_record_id' => $studentRecord->id,
                    'date' => $validatedData['noteDate'],
                    'incident' => $validatedData['incident'],
                    'remarks' => $validatedData['remarks'],
                ]);

                EnrollmentReason::create([
                    'student_record_id' => $studentRecord->id,
                    'reasons' => $validatedData['reasons'],
                ]);
                
            });
        
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

        return response()->json($studentRecord->load([
            'personalInformation',
            'educationalBackground',
            'familyBackground',
            'healthRecord',
            'testResults',
            'significantNotes'
        ]), 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error updating record: ' . $e->getMessage()], 500);
    }
}

}
