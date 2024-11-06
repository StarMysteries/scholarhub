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
        Schema::create('scholarships', function (Blueprint $table) {
            $table->bigIncrements('scholarship_id');  //auto-incrementing primary key
            $table->foreignId('provider_id')->constrained('providers', 'provider_id')->onDelete('cascade');
            $table->string('scholarship_name');  // Scholarship name column
            $table->enum('scholarship_status', ['Active', 'Inactive']);
            $table->dateTime('scholarship_deadline');
            $table->timestamps();  // Automatically creates created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholarships');
    }
};
