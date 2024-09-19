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
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('civil_status');
            $table->string('religion')->nullable();
            $table->decimal('average', 5, 2)->nullable();
            $table->string('course')->nullable();
            $table->string('email')->unique();
            $table->date('birth_date');
            $table->string('birth_place')->nullable();
            $table->string('mobile_no');
            $table->decimal('height', 4, 2)->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->enum('gender', ['Male', 'Female', 'Others']);
            $table->string('provincial_address')->nullable();
            $table->string('city_address')->nullable();
            $table->string('employer')->nullable();
            $table->string('emergency_contact');
            $table->string('relationship');
            $table->string('emergency_phone');
            $table->string('emergency_email')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('personal_information');
    }
}
