import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Music, Plus, Edit } from "lucide-react";

export default async function SongsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const songs = await prisma.song.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white flex items-center gap-3">
            <Music className="w-8 h-8 text-purple-400" />
            Our Soundtrack
          </h1>
          <p className="text-purple-300/50 mt-1">Manage all the songs that mean something to us.</p>
        </div>
        <Link 
          href="/admin/songs/new" 
          className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 w-fit"
        >
          <Plus className="w-5 h-5" /> Add Song
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map(song => (
          <div key={song.id} className="bg-white/[0.02] border border-purple-500/10 rounded-2xl p-5 hover:border-purple-500/30 transition-colors relative group">
            <div className="flex items-start gap-4">
              {song.coverPath ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={song.coverPath} alt={song.title} className="w-16 h-16 rounded-xl object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Music className="w-6 h-6 text-purple-400/50" />
                </div>
              )}
              <div>
                <h3 className="text-white font-medium line-clamp-1">{song.title}</h3>
                <p className="text-purple-300/60 text-sm line-clamp-1">{song.artist}</p>
                <div className="flex gap-2 mt-2">
                  {song.spotifyUrl && <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">Spotify</span>}
                  {song.youtubeUrl && <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full">YouTube</span>}
                </div>
              </div>
            </div>
            
            <Link href={`/admin/songs/${song.id}`} className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-purple-300 opacity-0 group-hover:opacity-100 transition-all">
              <Edit className="w-4 h-4" />
            </Link>
          </div>
        ))}
        {songs.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-purple-500/20 rounded-2xl">
            <Music className="w-8 h-8 text-purple-500/30 mx-auto mb-3" />
            <p className="text-purple-300/50">No songs added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
