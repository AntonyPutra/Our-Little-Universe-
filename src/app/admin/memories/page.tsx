import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Image as ImageIcon, Heart } from "lucide-react";



export default async function MemoriesIndexPage() {
  const memories = await prisma.memory.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      media: {
        take: 1
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-white">Memories</h1>
        <Link href="/admin/memories/new" className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Memory
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map(memory => (
          <Link key={memory.id} href={`/admin/memories/${memory.id}`} className="block group">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-colors">
              <div className="aspect-[4/3] bg-zinc-950 relative">
                {memory.media[0] ? (
                  memory.media[0].mediaType === 'video' ? (
                     <div className="w-full h-full flex items-center justify-center text-zinc-600">Video</div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={memory.media[0].filePath} alt={memory.title || ''} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">No media</span>
                  </div>
                )}
                {memory.isFavorite && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  </div>
                )}
                {!memory.isPublished && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs text-white">Draft</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg text-white font-medium mb-1 truncate">{memory.title || 'Untitled'}</h3>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>{memory.date ? new Date(memory.date).toLocaleDateString() : 'No date'}</span>
                  <span className="uppercase tracking-wider">{memory.category}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {memories.length === 0 && (
          <div className="col-span-full py-20 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
            Our memories will appear here. 💜<br/>
            Add the first one from the admin dashboard.
          </div>
        )}
      </div>
    </div>
  );
}
