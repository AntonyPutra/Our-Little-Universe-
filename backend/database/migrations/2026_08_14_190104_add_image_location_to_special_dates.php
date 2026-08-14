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
        Schema::table('special_dates', function (Blueprint $table) {
            $table->string('imagePath')->nullable();
            $table->string('location')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('special_dates', function (Blueprint $table) {
            $table->dropColumn(['imagePath', 'location']);
        });
    }
};
