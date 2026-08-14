import prisma from "@/lib/prisma";
import { ClientStory } from "./ClientStory";

export default async function StoryPage() {
  const specialDates = await prisma.specialDate.findMany({
    where: { 
      isPublished: true
    },
    orderBy: { date: 'asc' }
  });

  const events = specialDates.map(m => ({
    id: m.id,
    title: m.title || 'Event',
    date: m.date 
      ? new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'Asia/Jakarta'
        }).format(m.date)
      : '',
    description: m.description || '',
    icon: m.icon || 'Heart',
    location: m.location || undefined,
    image: m.imagePath || undefined
  }));

  return <ClientStory events={events} />;
}
