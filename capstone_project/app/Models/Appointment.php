<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'user_id',
        'appointment_date', 
        'appointment_time', 
        'reason',
        'accepted' 
    ];

    public function mail()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function user()
    {
        return $this->belongsTo(UserInfo::class, 'user_id');
    }
}
