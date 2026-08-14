import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Image, Music, CalendarHeart, Mail, Sparkles, Plus, BookOpen, Heart } from "lucide-react";

export default async function OurSpaceDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [memoryCount, dateCount, songCount, letterCount, noteCount] = await Promise.all([
    prisma.memory.count(),
    prisma.specialDate.count(),
    prisma.song.count(),
    prisma.letter.count(),
    prisma.dailyNote.count(),
  ]);

  const recentMemories = await prisma.memory.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentSongs = await prisma.song.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const quickAdd = [
    { label: "Memory", href: "/admin/memories/new", icon: Image, color: "text-blue-400", glow: "shadow-blue-500/10" },
    { label: "Song", href: "/admin/songs/new", icon: Music, color: "text-purple-400", glow: "shadow-purple-500/10" },
    { label: "Letter", href: "/admin/letters/new", icon: Mail, color: "text-amber-400", glow: "shadow-amber-500/10" },
    { label: "Date", href: "/admin/dates/new", icon: CalendarHeart, color: "text-pink-400", glow: "shadow-pink-500/10" },
    { label: "Little Note", href: "/admin/more", icon: BookOpen, color: "text-emerald-400", glow: "shadow-emerald-500/10" },
    { label: "Dream", href: "/admin/dreams/new", icon: Sparkles, color: "text-fuchsia-400", glow: "shadow-fuchsia-500/10" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <Heart className="w-10 h-10 text-pink-400/60" />
        </div>
        <h1 className="font-serif text-4xl text-white mb-2">Our Space 💜</h1>
        <p className="text-purple-300/50 font-serif italic">What do we want to add today?</p>
      </div>

      {/* Quick Add Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {quickAdd.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-purple-500/10 bg-white/[0.02] hover:bg-purple-500/5 hover:border-purple-500/30 transition-all shadow-xl ${item.glow}`}
          >
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-purple-200/70 group-hover:text-white transition-colors">
              + {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Recent additions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Memories */}
        <div className="rounded-2xl border border-purple-500/10 bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-purple-200">Recent Memories</h2>
            <span className="text-xs text-purple-400/50 bg-purple-500/10 px-2 py-1 rounded-full">{memoryCount} total</span>
          </div>
          <div className="space-y-3">
            {recentMemories.length === 0 ? (
              <p className="text-purple-300/40 text-sm italic">No memories yet. Add your first one! 💜</p>
            ) : (
              recentMemories.map((m) => (
                <div key={m.id} className="flex items-center justify-between py-2 border-b border-purple-500/5 last:border-0">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">{m.title || "Untitled Memory"}</p>
                    <p className="text-xs text-purple-400/40">{m.date ? new Date(m.date).toLocaleDateString("id-ID") : "No date"}</p>
                  </div>
                  <Link href={`/admin/memories/${m.id}`} className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Edit</Link>
                </div>
              ))
            )}
          </div>
          <Link href="/admin/memories/new" className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-dashed border-purple-500/20 text-purple-400/50 hover:text-purple-300 hover:border-purple-500/40 text-sm transition-all">
            <Plus className="w-4 h-4" /> Add Memory
          </Link>
        </div>

        {/* Recent Songs */}
        <div className="rounded-2xl border border-purple-500/10 bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-purple-200">Our Soundtrack</h2>
            <span className="text-xs text-purple-400/50 bg-purple-500/10 px-2 py-1 rounded-full">{songCount} songs</span>
          </div>
          <div className="space-y-3">
            {recentSongs.length === 0 ? (
              <p className="text-purple-300/40 text-sm italic">No songs yet. Add your first one! 🎵</p>
            ) : (
              recentSongs.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-purple-500/5 last:border-0">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">{s.title}</p>
                    <p className="text-xs text-purple-400/40">{s.artist}</p>
                  </div>
                  <Link href={`/admin/songs/${s.id}`} className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Edit</Link>
                </div>
              ))
            )}
          </div>
          <Link href="/admin/songs/new" className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-dashed border-purple-500/20 text-purple-400/50 hover:text-purple-300 hover:border-purple-500/40 text-sm transition-all">
            <Plus className="w-4 h-4" /> Add Song
          </Link>
        </div>
      </div>

      {/* Stats footer */}
      <div className="flex flex-wrap gap-3 justify-center text-xs text-purple-400/30">
        <span>{memoryCount} memories</span>
        <span>·</span>
        <span>{dateCount} dates</span>
        <span>·</span>
        <span>{songCount} songs</span>
        <span>·</span>
        <span>{letterCount} letters</span>
        <span>·</span>
        <span>{noteCount} notes</span>
      </div>
    </div>
  );
}
