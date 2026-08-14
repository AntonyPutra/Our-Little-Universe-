import prisma from "@/lib/prisma";
import { ClientHome } from "./ClientHome";
export default async function Home() {
  const settings = await prisma.settings.findUnique({ where: { id: "global" } });
  const couple = settings ? JSON.parse(settings.coupleData) : {};

  const dbMemories = await prisma.memory.findMany({
    where: { isPublished: true },
    include: { media: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  const memories = dbMemories.map(m => ({
    id: m.id,
    category: m.category,
    caption: m.caption,
    date: m.date,
    location: m.location,
    story: m.story,
    isFavorite: m.isFavorite,
    photos: m.media.filter(md => md.mediaType === 'image').map(md => md.filePath)
  }));

  const specialDates = await prisma.specialDate.findMany({
    where: { isPublished: true }
  });

  const letters = await prisma.letter.findMany({
    where: { isPublished: true }
  });

  const dailyNotes = await prisma.dailyNote.findMany({
    where: { isPublished: true }
  });

  // Since Next.js passes dates as objects over the Server -> Client boundary in App Router (actually they are warned about, it's better to serialize)
  // Let's serialize dates to ISO strings.
  const serializedDates = specialDates.map(d => ({
    ...d,
    date: d.date.toISOString(),
  }));

  return (
    <ClientHome 
      couple={couple} 
      memories={memories} 
      specialDates={serializedDates}
      letters={letters}
      dailyNotes={dailyNotes}
    />
  );
}
