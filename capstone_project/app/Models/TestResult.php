<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_record_id', 
        'test_date',
        'test_administered',
        'rs',
        'pr',
        'test_description', 
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }
}
