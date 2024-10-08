<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserInfo;

class UserInfoSeeder extends Seeder
{
    public function run()
    {
        UserInfo::create([
            'first_name' => 'Liwanag',
            'last_name' => 'Maliksi',
            'student_number' => 'N/A',
            // 'birthday' => '1987-12-25',
            // 'gender' => 'Female',
            'user_id' => 1,
            'role_id' => 2, 
        ]);

        UserInfo::create([
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'student_number' => '2021-00001-TG-0',
            // 'birthday' => '2001-01-01',
            // 'gender' => 'Male',
            'user_id' => 2,
            'role_id' => 1,
        ]);
    }
}
