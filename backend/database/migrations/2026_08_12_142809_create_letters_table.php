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
        Schema::create('letters', function (Blueprint $table) {
                        $table->uuid('id')->primary();
            $table->string('title');
            $table->text('content');
            $table->dateTime('date')->nullable();
            $table->string('letterType')->nullable();
            $table->boolean('isFeatured')->default(false);
            $table->boolean('isPublished')->default(true);
            $table->string('fromAuthor')->nullable();
            $table->string('toAuthor')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letters');
    }
};
