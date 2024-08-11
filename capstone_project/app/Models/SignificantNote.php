<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SignificantNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_record_id',
        'date', 
        'incident',
        'remarks'
    ];

    public function studentRecord()
    {
        return $this->belongsTo(StudentRecord::class);
    }

}
