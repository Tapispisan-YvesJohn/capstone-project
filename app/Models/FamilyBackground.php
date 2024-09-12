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
        'father_occupation',
        'mother_name',
        'mother_age',
        'mother_occupation',
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }

}
