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
        Schema::create('memory_media', function (Blueprint $table) {
                        $table->uuid('id')->primary();
            $table->uuid('memoryId');
            $table->string('mediaType');
            $table->string('filePath');
            $table->string('mimeType')->nullable();
            $table->text('caption')->nullable();
            $table->integer('sortOrder')->default(0);
            $table->timestamps();
            
            $table->foreign('memoryId')->references('id')->on('memories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memory_media');
    }
};
