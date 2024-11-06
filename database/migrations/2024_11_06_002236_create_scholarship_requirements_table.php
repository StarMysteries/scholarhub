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
        Schema::create('scholarship_requirements', function (Blueprint $table) {
            $table->bigIncrements('sr_id');  //auto-incrementing primary key
            $table->foreignId('scholarship_id')->constrained('scholarships', 'scholarship_id')->onDelete('cascade');
            $table->string('sr_name');
            $table->string('sr_filepath');
            $table->string('sr_filetype');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholarship_requirements');
    }
};
