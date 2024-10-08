<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'last_name',
        'first_name',
        'middle_name',
        'civil_status',
        'religion',
        'average',
        'course',
        'email',
        'birth_date',
        'birth_place',
        'mobile_no',
        'height',
        'weight',
        'gender',
        'provincial_address',
        'city_address',
        'employer',
        'emergency_contact',
        'relationship',
        'emergency_phone',
        'emergency_email',
        'student_record_id'
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }
}
