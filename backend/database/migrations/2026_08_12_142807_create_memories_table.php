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
        Schema::create('memories', function (Blueprint $table) {
                        $table->uuid('id')->primary();
            $table->string('title')->nullable();
            $table->dateTime('date')->nullable();
            $table->text('caption')->nullable();
            $table->text('story')->nullable();
            $table->string('location')->nullable();
            $table->string('category')->default('Random');
            $table->boolean('isFavorite')->default(false);
            $table->boolean('isPublished')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memories');
    }
};
