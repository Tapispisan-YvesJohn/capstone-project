<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'title'];

    
    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class, 'student_id');
    }
}

