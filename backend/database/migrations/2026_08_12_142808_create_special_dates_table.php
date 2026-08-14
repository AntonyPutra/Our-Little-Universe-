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
        Schema::create('special_dates', function (Blueprint $table) {
                        $table->uuid('id')->primary();
            $table->string('title');
            $table->dateTime('date');
            $table->string('type')->nullable();
            $table->text('description')->nullable();
            $table->string('icon')->default('Heart');
            $table->boolean('recurringYearly')->default(false);
            $table->boolean('isPublished')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('special_dates');
    }
};
