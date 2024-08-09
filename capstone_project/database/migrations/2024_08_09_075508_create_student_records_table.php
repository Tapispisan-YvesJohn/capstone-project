<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('student_records', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->integer('age');
            $table->decimal('height', 5, 2);
            $table->decimal('weight', 5, 2);
            $table->string('gender');
            $table->decimal('hs_average', 5, 2);
            $table->string('civil_status');
            $table->string('religion');
            $table->string('course');
            $table->string('year_section');
            $table->string('telephone');
            $table->string('email')->unique();
            $table->date('date_of_birth');
            $table->string('place_of_birth');
            $table->string('residential_address');
            $table->string('provincial_address')->nullable();
            $table->timestamps();
        });
    }
    
};
