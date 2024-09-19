<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSignificantNotesTable extends Migration
{
    public function up()
    {
        Schema::create('significant_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_record_id')->constrained('student_records')->onDelete('cascade');
            $table->date('date')->nullable();
            $table->string('incident')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('significant_notes');
    }
}
