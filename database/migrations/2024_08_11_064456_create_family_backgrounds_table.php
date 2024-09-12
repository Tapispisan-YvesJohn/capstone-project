<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFamilyBackgroundsTable extends Migration
{
    public function up()
    {
        Schema::create('family_backgrounds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_record_id')->constrained('student_records')->onDelete('cascade');
            $table->string('father_name');
            $table->integer('father_age')->nullable();
            $table->string('father_occupation')->nullable();
            $table->string('mother_name');
            $table->integer('mother_age')->nullable();
            $table->string('mother_occupation')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('family_backgrounds');
    }
}
