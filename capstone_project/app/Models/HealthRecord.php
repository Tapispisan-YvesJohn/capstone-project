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
        'general_health',
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }

}
