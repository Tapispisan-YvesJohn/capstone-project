<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalInformation extends Model
{
    use HasFactory;

    // PersonalInformation.php
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_name',
        'civil_status',
        'religion',
        'email',
        'course',
        'dob',
        'place_of_birth',
        'mobile_no',
        'address',
        'emergency_contact',
        'student_record_id'
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }
}
