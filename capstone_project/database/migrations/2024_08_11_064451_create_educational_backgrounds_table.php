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
            $table->string('elementary_location')->nullable();
            $table->string('elementary_type')->nullable();
            $table->string('elementary_year')->nullable();
            $table->string('elementary_awards')->nullable();
            
            $table->string('junior_school');
            $table->string('junior_location')->nullable();
            $table->string('junior_type')->nullable();
            $table->string('junior_year')->nullable();
            $table->string('junior_awards')->nullable();
            
            $table->string('senior_school');
            $table->string('senior_location')->nullable();
            $table->string('senior_type')->nullable();
            $table->string('senior_year')->nullable();
            $table->string('senior_awards')->nullable();

            $table->string('other_school')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('educational_backgrounds');
    }
}
