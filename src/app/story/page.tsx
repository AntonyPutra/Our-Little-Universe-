import prisma from "@/lib/prisma";
import { ClientStory } from "./ClientStory";



export default async function StoryPage() {
  const dbMemories = await prisma.memory.findMany({
    where: { 
      isPublished: true,
      date: { not: null }
    },
    include: { media: { orderBy: { sortOrder: 'asc' }, take: 1 } },
    orderBy: { date: 'asc' }
  });

  const events = dbMemories.map(m => ({
    id: m.id,
    title: m.title || 'Memory',
    date: m.date ? m.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
    description: m.story || m.caption || '',
    icon: 'Heart', // Default icon for timeline from memory
    image: m.media.length > 0 && m.media[0].mediaType === 'image' ? m.media[0].filePath : undefined
  }));

  return <ClientStory events={events} />;
}
