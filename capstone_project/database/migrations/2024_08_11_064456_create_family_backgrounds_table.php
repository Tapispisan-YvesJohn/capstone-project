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
            $table->string('father_contact')->nullable();
            $table->string('father_education')->nullable();
            $table->string('father_occupation')->nullable();
            $table->string('father_company')->nullable();

            $table->string('mother_name');
            $table->integer('mother_age')->nullable();
            $table->string('mother_contact')->nullable();
            $table->string('mother_education')->nullable();
            $table->string('mother_occupation')->nullable();
            $table->string('mother_company')->nullable();

            $table->string('relationship_status')->nullable();
            $table->string('guardian_name')->nullable();
            $table->string('guardian_address')->nullable();
            $table->string('monthly_income')->nullable();

            $table->integer('siblings_total')->nullable();
            $table->integer('brothers')->nullable();
            $table->integer('sisters')->nullable();
            $table->integer('employed_siblings')->nullable();
            $table->integer('support_studies')->nullable();
            $table->integer('support_family')->nullable();

            $table->string('financial_support')->nullable();
            $table->integer('allowance')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('family_backgrounds');
    }
}
