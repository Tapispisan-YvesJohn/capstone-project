<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationalBackground extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_record_id', 
        'elementary_school',
        'elementary_location',
        'elementary_type',
        'elementary_year',
        'elementary_awards',
        'junior_school',
        'junior_location',
        'junior_type',
        'junior_year',
        'junior_awards',
        'senior_school',
        'senior_location',
        'senior_type',
        'senior_year',
        'senior_awards',
        'other_school',
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }

}
