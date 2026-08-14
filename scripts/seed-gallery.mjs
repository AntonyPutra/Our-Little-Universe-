import fs from 'fs';
import path from 'path';
import pkg from '../generated/prisma/index.js';
const { PrismaClient } = pkg;


import crypto from 'crypto';

const prisma = new PrismaClient();

const sourceDir = 'E:\\Kerjaan\\Pribadi\\Our Story\\FOTOO Our Little Universe \uD83D\uDC9C';
const targetDir = path.join(process.cwd(), 'public', 'uploads', 'memories');

async function main() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);
  const mediaFiles = files.filter(f => f.endsWith('.jpeg') || f.endsWith('.mp4') || f.endsWith('.jpg') || f.endsWith('.png'));

  console.log(`Found ${mediaFiles.length} media files.`);

  // Create one big memory for all photos to avoid 80 separate memories, 
  // or maybe 1 memory for each photo? 
  // The gallery looks better with one big "Photo Dump" or grouped by date.
  // We'll create one single "Random Memories Dump" with all photos as media, 
  // or we can create individual memories. Let's create individual memories since the user said "masukin ke web nya juga".
  
  let i = 0;
  for (const file of mediaFiles) {
    const srcPath = path.join(sourceDir, file);
    
    // Copy file
    const ext = path.extname(file);
    const newFilename = `gallery-${Date.now()}-${i}${ext}`;
    const destPath = path.join(targetDir, newFilename);
    
    fs.copyFileSync(srcPath, destPath);
    
    const isVideo = ext === '.mp4';
    
    // Create memory
    const memory = await prisma.memory.create({
      data: {
        id: crypto.randomUUID(),
        title: `Random Moment ${i + 1}`,
        caption: "One little moment.",
        date: new Date('2026-08-11T23:00:00Z'),
        category: 'Random',
        isFavorite: false,
        isPublished: true,
        media: {
          create: [{
            id: crypto.randomUUID(),
            mediaType: isVideo ? 'video' : 'image',
            filePath: `/uploads/memories/${newFilename}`,
            sortOrder: 0
          }]
        }
      }
    });
    
    console.log(`Created memory for ${newFilename}`);
    i++;
  }
  
  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
