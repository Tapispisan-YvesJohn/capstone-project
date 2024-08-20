<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')-> insert([
            ['id'=>'1', 
             'email'=>'admin@gmail.com', 
             'password'=>Hash::make('password'), 
             'account_status_id'=>'2',
             'is_verified'=>1,
             'email_auth_token'=>'',
             'role_id'=>'2'],
            ['id'=>'2', 
             'email'=>'student@gmail.com', 
             'password'=>Hash::make('password'), 
             'account_status_id'=>'2',
             'is_verified'=>1,
             'email_auth_token'=>'',
             'role_id'=>'1']
        ]);
    }
}
