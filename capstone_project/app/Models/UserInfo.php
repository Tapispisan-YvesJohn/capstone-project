<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;

    protected $table = 'user_info';

    protected $fillable = [
        'first_name', 
        'last_name', 
        'student_number',
        'user_id',
        // 'birthday', 
        // 'gender'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // public function accountStatus()
    // {
    //     return $this->belongsTo(AccountStatus::class);
    // }
}

