<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id');
            $table->string('name');
            $table->string('description');
            $table->string('responsibility');
            $table->string('qualifications');
            $table->string('benifits');
            $table->string('location');
            $table->string('availability');
            $table->string('level');
            $table->timestamps();
        });

        // creating pivot table between job offers and users
        Schema::create('job_offer_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_offer_id');
            $table->foreignId('user_id');
            $table->string('stage')->default('screening');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_offers');
    }
};
