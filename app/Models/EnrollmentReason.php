<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrollmentReason extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_record_id',
        'reasons',
    ];

    protected $casts = [
        'reasons' => 'array',
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }
}
