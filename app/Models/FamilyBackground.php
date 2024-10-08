<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyBackground extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_record_id', 
        'father_name',
        'father_age',
        'father_contact',
        'father_education',
        'father_occupation',
        'father_company',
        'mother_name',
        'mother_age',
        'mother_contact',
        'mother_education',
        'mother_occupation',
        'mother_company',
        'relationship_status',
        'guardian_name',
        'guardian_address',
        'monthly_income',
        'siblings_total',
        'brothers',
        'sisters',
        'employed_siblings',
        'support_studies',
        'support_family',
        'financial_support',
        'allowance',
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }

}
