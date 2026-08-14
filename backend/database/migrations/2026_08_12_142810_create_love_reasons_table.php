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
        Schema::create('love_reasons', function (Blueprint $table) {
                        $table->uuid('id')->primary();
            $table->text('content');
            $table->boolean('isPublished')->default(true);
            $table->string('fromAuthor')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('love_reasons');
    }
};
