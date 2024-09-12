<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalInformationsTable extends Migration
{
    public function up()
    {
        Schema::create('personal_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_record_id')->constrained('student_records')->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('civil_status');
            $table->string('religion');
            $table->string('email')->unique();
            $table->string('course');
            $table->date('dob');
            $table->string('place_of_birth');
            $table->string('mobile_no');
            $table->string('address');
            $table->string('emergency_contact');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('personal_information');
    }
}
