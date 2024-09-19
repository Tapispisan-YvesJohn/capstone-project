<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHealthRecordsTable extends Migration
{
    public function up()
    {
        Schema::create('health_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_record_id')->constrained('student_records')->onDelete('cascade');
            $table->string('vision');
            $table->string('hearing');
            $table->string('mobility')->nullable();
            $table->string('speech')->nullable();
            $table->string('general_health');
            
            $table->string('consulted_with')->nullable();
            $table->string('consultation_reason')->nullable();
            $table->date('start_date')->nullable();
            $table->integer('sessions')->nullable();
            $table->date('end_date')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('health_records');
    }
}
