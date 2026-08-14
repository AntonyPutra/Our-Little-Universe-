<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Memory;
use App\Models\MemoryMedia;
use Carbon\Carbon;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $targetDir = '/var/www/html/public/uploads/memories';

        if (!is_dir($targetDir)) {
            $this->command->warn("Directory not found: " . $targetDir);
            return;
        }

        $files = scandir($targetDir);
        $mediaFiles = array_filter($files, function ($file) use ($targetDir) {
            $path = $targetDir . DIRECTORY_SEPARATOR . $file;
            if (!is_file($path)) return false;
            
            $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
            return in_array($ext, ['jpg', 'jpeg', 'png', 'mp4']);
        });

        $this->command->info("Found " . count($mediaFiles) . " media files in " . $targetDir);

        $i = 0;
        foreach ($mediaFiles as $file) {
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            $isVideo = $ext === 'mp4';
            $filePath = '/uploads/memories/' . $file;

            // Extract date from WhatsApp filename format: WhatsApp Image 2026-08-11 at 22.56.34.jpeg
            $date = Carbon::now();
            $title = 'Beautiful Memory';
            
            if (preg_match('/(\d{4}-\d{2}-\d{2})/', $file, $matches)) {
                $date = Carbon::parse($matches[1]);
                $title = 'Memory from ' . $date->format('F j, Y');
            }

            // Check if this file is already in the database
            $exists = MemoryMedia::where('filePath', $filePath)->exists();
            if ($exists) {
                continue;
            }
            
            $memory = Memory::create([
                'id' => Str::uuid()->toString(),
                'title' => $title,
                'caption' => '',
                'date' => $date,
                'category' => 'Memory',
                'isFavorite' => false,
                'isPublished' => true,
            ]);

            MemoryMedia::create([
                'id' => Str::uuid()->toString(),
                'memoryId' => $memory->id,
                'mediaType' => $isVideo ? 'video' : 'image',
                'filePath' => $filePath,
                'sortOrder' => 0,
            ]);

            $i++;
        }
        
        $this->command->info("Successfully inserted " . $i . " new memories into the database!");
    }
}
