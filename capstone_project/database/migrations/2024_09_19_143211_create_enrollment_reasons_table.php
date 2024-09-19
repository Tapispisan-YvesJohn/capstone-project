<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reasons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_record_id')->constrained('student_records')->onDelete('cascade');
            $table->json('reasons');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reasons');
    }
};
