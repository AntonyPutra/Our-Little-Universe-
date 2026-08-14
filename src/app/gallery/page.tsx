import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import prisma from "@/lib/prisma";



export default async function GalleryPage() {
  // Fetch published memories
  const dbMemories = await prisma.memory.findMany({
    where: { isPublished: true },
    include: { media: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { createdAt: 'desc' }
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

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Our Gallery</h1>
        <p className="text-purple-200/70 text-lg md:text-xl font-serif italic">
          Little moments I never want to forget.
        </p>
      </div>

      <GalleryGrid memories={memories} />
    </div>
  );
}
