"use client";

import { MemoryJar } from "@/components/interactive/MemoryJar";
import { LoveReasonGenerator } from "@/components/interactive/LoveReasonGenerator";
import { Music, Map, Compass, CheckCircle2, Circle, Play, ExternalLink, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMusicPlayer } from "@/components/music/MusicPlayerContext";
import { getSongEmbedType } from "@/components/music/MusicPlayerContext";
import { OurSpaceUnlockModal } from "@/components/layout/OurSpaceUnlockModal";
import { useRouter } from "next/navigation";

import type { Song, Dream, Adventure } from "../../../generated/prisma/client";

interface ClientMoreProps {
  jarNotes: string[];
  loveReasons: string[];
  songs: Song[];
  dreams: Dream[];
  adventures: Adventure[];
}

export function ClientMore({ jarNotes, loveReasons, songs, dreams, adventures }: ClientMoreProps) {
  const [completedAdventures, setCompletedAdventures] = useState<Record<string, boolean>>({});
  const { playSong } = useMusicPlayer();
  const [showUnlock, setShowUnlock] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { fetchApi } = await import('@/lib/api/client');
        const res = await fetchApi("/auth/status");
        if (res.data?.unlocked) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("pv-adventures");
    if (saved) {
      try {
        setCompletedAdventures(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const toggleAdventure = (id: string) => {
    const newStatus = { ...completedAdventures, [id]: !completedAdventures[id] };
    setCompletedAdventures(newStatus);
    localStorage.setItem("pv-adventures", JSON.stringify(newStatus));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Little Extras</h1>
        <p className="text-purple-200/70 text-lg md:text-xl font-serif italic">
          More pieces of our universe.
        </p>
      </div>

      {/* Memory Jar */}
      <section>
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl text-white mb-2">Our Little Memory Jar</h2>
          <p className="text-purple-200/50 text-sm">Pick a note, anytime.</p>
        </div>
        <MemoryJar jarNotes={jarNotes} />
      </section>

      {/* Reasons I Love You */}
      <section>
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl text-white mb-2">Reasons I Love Vell Vell</h2>
          <p className="text-purple-200/50 text-sm">Just a few of the million reasons.</p>
        </div>
        <LoveReasonGenerator loveReasons={loveReasons} />
      </section>

      {/* Songs */}
      {songs && songs.length > 0 && (
        <section>
          <div className="text-center mb-10 flex flex-col items-center">
            <Music className="w-8 h-8 text-purple-400 mb-4" />
            <h2 className="font-serif text-3xl text-white mb-2">Songs That Feel Like Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {songs.map(song => {
              const embedType = getSongEmbedType({
                id: song.id,
                title: song.title,
                artist: song.artist,
                spotifyUrl: song.spotifyUrl,
                youtubeUrl: song.youtubeUrl,
              });
              const isPlayable = embedType !== "none" || song.spotifyUrl || song.youtubeUrl;
              return (
              <div key={song.id} className="glass p-6 rounded-2xl flex items-start gap-4">
                <div className="w-16 h-16 rounded-md bg-purple-900/30 flex-shrink-0 flex items-center justify-center overflow-hidden border border-purple-500/20 relative">
                  {song.coverPath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={song.coverPath} alt={song.title} className="w-full h-full object-cover" />
                  ) : (
                    <Music className="w-6 h-6 text-purple-400/50" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-serif text-lg">{song.title}</h3>
                  <p className="text-purple-300/70 text-xs uppercase tracking-wider mb-2">{song.artist}</p>
                  {song.note && <p className="text-purple-100/60 text-sm italic mb-3">&ldquo;{song.note}&rdquo;</p>}

                  {/* Play / Links */}
                  <div className="flex gap-2 mt-auto flex-wrap">
                    {isPlayable && (
                      <button
                        onClick={() => playSong({
                          id: song.id,
                          title: song.title,
                          artist: song.artist,
                          spotifyUrl: song.spotifyUrl,
                          youtubeUrl: song.youtubeUrl,
                          note: song.note,
                          coverPath: song.coverPath,
                        })}
                        className="text-xs text-purple-300 hover:text-purple-200 bg-purple-500/15 hover:bg-purple-500/25 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" /> Play
                      </button>
                    )}
                    {song.spotifyUrl && !getSongEmbedType({id:song.id, title:song.title, artist:song.artist, spotifyUrl:song.spotifyUrl, youtubeUrl:song.youtubeUrl}).startsWith('spotify') && (
                      <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:text-green-300 bg-green-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Spotify
                      </a>
                    )}
                    {song.youtubeUrl && !getSongEmbedType({id:song.id, title:song.title, artist:song.artist, spotifyUrl:song.spotifyUrl, youtubeUrl:song.youtubeUrl}).startsWith('youtube') && (
                      <a href={song.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-red-400 hover:text-red-300 bg-red-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> YouTube
                      </a>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Dreams */}
      <section>
        <div className="text-center mb-10 flex flex-col items-center">
          <Map className="w-8 h-8 text-purple-400 mb-4" />
          <h2 className="font-serif text-3xl text-white mb-2">Things We'll Do Someday</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {dreams.map(dream => (
            <div key={dream.id} className="glass-card p-6 rounded-xl border-l-4 border-l-purple-500">
              <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full mb-3 inline-block
                ${dream.status === 'Done 💜' ? 'bg-pink-500/20 text-pink-300' : 
                  dream.status === 'Planned' ? 'bg-purple-500/20 text-purple-300' : 
                  'bg-white/5 text-purple-200/50'}`}>
                {dream.status}
              </span>
              <h3 className="text-white font-serif text-lg mb-2">{dream.title}</h3>
              {dream.description && <p className="text-purple-200/50 text-sm">{dream.description}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Mini Adventures */}
      <section>
        <div className="text-center mb-10 flex flex-col items-center">
          <Compass className="w-8 h-8 text-purple-400 mb-4" />
          <h2 className="font-serif text-3xl text-white mb-2">Our Mini Adventures</h2>
          <p className="text-purple-200/50 text-sm">Little quests for us to complete.</p>
        </div>
        <div className="max-w-2xl mx-auto glass p-8 rounded-3xl">
          <ul className="space-y-4">
            {adventures.map(adv => {
              const isCompleted = completedAdventures[adv.id];
              return (
                <li key={adv.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => toggleAdventure(adv.id)}>
                  <button className="text-purple-400 transition-colors hover:text-pink-400 focus:outline-none">
                    {isCompleted ? <CheckCircle2 className="w-6 h-6 text-pink-500" /> : <Circle className="w-6 h-6 opacity-50" />}
                  </button>
                  <span className={`text-lg font-serif transition-all duration-300 ${isCompleted ? 'text-purple-200/40 line-through' : 'text-white group-hover:text-purple-200'}`}>
                    {adv.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {/* Our Space — manage content */}
      <section className="pb-4">
        <div className="max-w-sm mx-auto text-center">
          <div className="glass-card rounded-3xl p-8">
            <Heart className="w-8 h-8 text-pink-400/60 mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-white mb-2">Our Space 💜</h2>
            <p className="text-purple-200/50 text-sm mb-6 font-serif italic">
              Add memories, songs, letters, and more.
            </p>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  router.push("/admin");
                } else {
                  setShowUnlock(true);
                }
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-serif tracking-wide transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Open Our Space
            </button>
          </div>
        </div>
      </section>

      <OurSpaceUnlockModal
        isOpen={showUnlock}
        onClose={() => setShowUnlock(false)}
        onUnlocked={() => {
          setShowUnlock(false);
          setIsAuthenticated(true);
          router.push("/admin");
        }}
      />

    </div>
  );
}
