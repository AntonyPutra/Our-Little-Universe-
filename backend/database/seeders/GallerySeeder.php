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
        $sourceDir = 'E:\\Kerjaan\\Pribadi\\Our Story\\FOTOO Our Little Universe 💜';
        $targetDir = dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'memories';

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $files = scandir($sourceDir);
        $mediaFiles = array_filter($files, function ($file) use ($sourceDir) {
            $path = $sourceDir . DIRECTORY_SEPARATOR . $file;
            if (!is_file($path)) return false;
            
            $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
            return in_array($ext, ['jpg', 'jpeg', 'png', 'mp4']);
        });

        $this->command->info("Found " . count($mediaFiles) . " media files.");

        $i = 0;
        foreach ($mediaFiles as $file) {
            $srcPath = $sourceDir . DIRECTORY_SEPARATOR . $file;
            $ext = strtolower(pathinfo($srcPath, PATHINFO_EXTENSION));
            
            $newFilename = 'gallery-' . time() . '-' . $i . '.' . $ext;
            $destPath = $targetDir . DIRECTORY_SEPARATOR . $newFilename;
            
            copy($srcPath, $destPath);
            
            $isVideo = $ext === 'mp4';
            
            $memory = Memory::create([
                'id' => Str::uuid()->toString(),
                'title' => 'Random Moment ' . ($i + 1),
                'caption' => 'One little moment.',
                'date' => Carbon::now()->subDays(rand(1, 100)),
                'category' => 'Random',
                'isFavorite' => false,
                'isPublished' => true,
            ]);

            MemoryMedia::create([
                'id' => Str::uuid()->toString(),
                'memoryId' => $memory->id,
                'mediaType' => $isVideo ? 'video' : 'image',
                'filePath' => '/uploads/memories/' . $newFilename,
                'sortOrder' => 0,
            ]);

            $i++;
        }
        
        $this->command->info("Gallery seeded successfully!");
    }
}
