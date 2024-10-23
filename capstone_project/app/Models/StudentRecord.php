<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentRecord extends Model
{
    use HasFactory;

    public function personalInformation()
    {
        return $this->hasOne(PersonalInformation::class);
    }

    public function educationalBackground()
    {
        return $this->hasOne(EducationalBackground::class);
    }

    public function familyBackground()
    {
        return $this->hasOne(FamilyBackground::class);
    }

    public function healthRecord()
    {
        return $this->hasOne(HealthRecord::class);
    }

    public function testResults()
    {
        return $this->hasOne(TestResult::class);
    }

    public function significantNotes()
    {
        return $this->hasOne(SignificantNote::class);
    }

    public function enrollmentReason()
    {
        return $this->hasone(EnrollmentReason::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'student_id');
    }
}
