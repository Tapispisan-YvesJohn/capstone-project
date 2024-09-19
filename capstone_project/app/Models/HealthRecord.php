<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_record_id', 
        'vision',
        'hearing',
        'mobility',
        'speech',
        'general_health',
        'consulted_with',
        'consultation_reason',
        'start_date',
        'sessions',
        'end_date'
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }

}
