<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationalBackgroundsTable extends Migration
{
    public function up()
    {
        Schema::create('educational_backgrounds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_record_id')->constrained('student_records')->onDelete('cascade');
            $table->string('elementary_school');
            $table->string('junior_high_school');
            $table->string('senior_high_school');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('educational_backgrounds');
    }
}
