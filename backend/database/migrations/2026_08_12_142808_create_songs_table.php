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
        Schema::create('songs', function (Blueprint $table) {
                        $table->uuid('id')->primary();
            $table->string('title');
            $table->string('artist');
            $table->string('spotifyUrl')->nullable();
            $table->string('youtubeUrl')->nullable();
            $table->text('note')->nullable();
            $table->string('coverPath')->nullable();
            $table->boolean('isFavorite')->default(false);
            $table->integer('sortOrder')->default(0);
            $table->boolean('isPublished')->default(true);
            $table->string('addedBy')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
