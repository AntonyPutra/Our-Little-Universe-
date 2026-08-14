import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // We want to pick a random type of item to return
    // Options: memory, song, letter, loveReason, jarNote
    const types = ["memory", "song", "letter", "loveReason", "jarNote"];
    const randomType = types[Math.floor(Math.random() * types.length)];

    let item = null;

    if (randomType === "memory") {
      const count = await prisma.memory.count({ where: { isPublished: true } });
      if (count > 0) {
        const skip = Math.floor(Math.random() * count);
        const results = await prisma.memory.findMany({
          where: { isPublished: true },
          include: { media: { orderBy: { sortOrder: 'asc' } } },
          skip,
          take: 1,
        });
        item = results[0];
      }
    } else if (randomType === "song") {
      const count = await prisma.song.count({ where: { isPublished: true } });
      if (count > 0) {
        const skip = Math.floor(Math.random() * count);
        const results = await prisma.song.findMany({
          where: { isPublished: true },
          skip,
          take: 1,
        });
        item = results[0];
      }
    } else if (randomType === "letter") {
      const count = await prisma.letter.count({ where: { isPublished: true } });
      if (count > 0) {
        const skip = Math.floor(Math.random() * count);
        const results = await prisma.letter.findMany({
          where: { isPublished: true },
          skip,
          take: 1,
        });
        item = results[0];
      }
    } else if (randomType === "loveReason") {
      const count = await prisma.loveReason.count({ where: { isPublished: true } });
      if (count > 0) {
        const skip = Math.floor(Math.random() * count);
        const results = await prisma.loveReason.findMany({
          where: { isPublished: true },
          skip,
          take: 1,
        });
        item = results[0];
      }
    } else if (randomType === "jarNote") {
      const count = await prisma.jarNote.count({ where: { isPublished: true } });
      if (count > 0) {
        const skip = Math.floor(Math.random() * count);
        const results = await prisma.jarNote.findMany({
          where: { isPublished: true },
          skip,
          take: 1,
        });
        item = results[0];
      }
    }

    if (!item) {
      // Fallback if the random type was empty
      return NextResponse.json({ error: "Empty" }, { status: 404 });
    }

    return NextResponse.json({
      type: randomType,
      data: item,
    });
  } catch (error) {
    console.error("Capsule API Error:", error);
    return NextResponse.json({ error: "Failed to fetch capsule item" }, { status: 500 });
  }
}
