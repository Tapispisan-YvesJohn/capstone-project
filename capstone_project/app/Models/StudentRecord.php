<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentRecord extends Model
{
    use HasFactory;

    // Define the fillable fields
    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'age',
        'height',
        'weight',
        'gender',
        'hs_average',
        'civil_status',
        'religion',
        'course',
        'year_section',
        'telephone',
        'email',
        'date_of_birth',
        'place_of_birth',
        'residential_address',
        'provincial_address',
    ];
}
