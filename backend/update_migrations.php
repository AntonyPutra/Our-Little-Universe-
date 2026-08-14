<?php

$dir = __DIR__ . '/database/migrations';
$files = scandir($dir);

$schemas = [
    'create_memories_table' => <<<'PHP'
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
PHP,

    'create_memory_media_table' => <<<'PHP'
            $table->uuid('id')->primary();
            $table->uuid('memoryId');
            $table->string('mediaType');
            $table->string('filePath');
            $table->string('mimeType')->nullable();
            $table->text('caption')->nullable();
            $table->integer('sortOrder')->default(0);
            $table->timestamps();
            
            $table->foreign('memoryId')->references('id')->on('memories')->onDelete('cascade');
PHP,

    'create_special_dates_table' => <<<'PHP'
            $table->uuid('id')->primary();
            $table->string('title');
            $table->dateTime('date');
            $table->string('type')->nullable();
            $table->text('description')->nullable();
            $table->string('icon')->default('Heart');
            $table->boolean('recurringYearly')->default(false);
            $table->boolean('isPublished')->default(true);
            $table->timestamps();
PHP,

    'create_songs_table' => <<<'PHP'
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
PHP,

    'create_letters_table' => <<<'PHP'
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
PHP,

    'create_jar_notes_table' => <<<'PHP'
            $table->uuid('id')->primary();
            $table->text('content');
            $table->string('category')->nullable();
            $table->boolean('isPublished')->default(true);
            $table->string('fromAuthor')->nullable();
            $table->timestamps();
PHP,

    'create_daily_notes_table' => <<<'PHP'
            $table->uuid('id')->primary();
            $table->text('content');
            $table->boolean('isPublished')->default(true);
            $table->string('fromAuthor')->nullable();
            $table->string('toAuthor')->nullable();
            $table->timestamps();
PHP,

    'create_love_reasons_table' => <<<'PHP'
            $table->uuid('id')->primary();
            $table->text('content');
            $table->boolean('isPublished')->default(true);
            $table->string('fromAuthor')->nullable();
            $table->timestamps();
PHP,

    'create_dreams_table' => <<<'PHP'
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('status')->default('Dreaming');
            $table->integer('sortOrder')->default(0);
            $table->boolean('isPublished')->default(true);
            $table->timestamps();
PHP,

    'create_adventures_table' => <<<'PHP'
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('isCompleted')->default(false);
            $table->dateTime('completedAt')->nullable();
            $table->integer('sortOrder')->default(0);
            $table->boolean('isPublished')->default(true);
            $table->timestamps();
PHP,

    'create_couple_settings_table' => <<<'PHP'
            $table->string('id')->primary();
            $table->json('coupleData');
            $table->timestamps();
PHP,
];

foreach ($files as $file) {
    if (!str_ends_with($file, '.php')) continue;

    foreach ($schemas as $key => $schema) {
        if (str_contains($file, $key)) {
            $path = $dir . '/' . $file;
            $content = file_get_contents($path);
            
            // replace `$table->id();\n            $table->timestamps();`
            $content = preg_replace('/\$table->id\(\);\s*\$table->timestamps\(\);/', $schema, $content);
            file_put_contents($path, $content);
            echo "Updated $file\n";
        }
    }
}
