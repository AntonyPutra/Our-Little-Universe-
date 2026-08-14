"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, X, ChevronUp, ExternalLink } from "lucide-react";
import { useMusicPlayer, getSpotifyEmbedUrl, getYouTubeEmbedUrl, getSongEmbedType } from "./MusicPlayerContext";

// ---------------------------------------------------------------------------
// Expanded Player — shows the embed iframe
// ---------------------------------------------------------------------------
function ExpandedPlayer() {
  const { currentSong, closeSong, collapse } = useMusicPlayer();
  if (!currentSong) return null;

  const embedType = getSongEmbedType(currentSong);
  const spotifyEmbed = currentSong.spotifyUrl ? getSpotifyEmbedUrl(currentSong.spotifyUrl) : null;
  const youtubeEmbed = currentSong.youtubeUrl ? getYouTubeEmbedUrl(currentSong.youtubeUrl) : null;
  const embedUrl = spotifyEmbed ?? youtubeEmbed;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-4 pb-24 md:pb-4 bg-black/70 backdrop-blur-sm"
      onClick={collapse}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-md bg-gradient-to-b from-purple-900/50 to-[#050308] border border-purple-500/20 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(147,51,234,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-500/10">
          <div className="flex items-center gap-3">
            {currentSong.coverPath ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={currentSong.coverPath} alt={currentSong.title} className="w-10 h-10 rounded-lg object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-400" />
              </div>
            )}
            <div>
              <p className="text-white font-serif text-sm font-medium leading-tight">{currentSong.title}</p>
              <p className="text-purple-400/60 text-xs">{currentSong.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={collapse} className="p-1.5 text-purple-400/50 hover:text-purple-300 transition-colors">
              <ChevronUp className="w-4 h-4" />
            </button>
            <button onClick={closeSong} className="p-1.5 text-purple-400/50 hover:text-purple-300 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Note */}
        {currentSong.note && (
          <div className="px-5 py-3 text-sm text-purple-200/60 italic font-serif border-b border-purple-500/10">
            &ldquo;{currentSong.note}&rdquo;
          </div>
        )}

        {/* Embed */}
        {embedUrl ? (
          <div className="p-4">
            {embedType === "spotify" && (
              <iframe
                src={embedUrl}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl"
              />
            )}
            {embedType === "youtube" && (
              <iframe
                src={embedUrl}
                width="100%"
                height="240"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="rounded-2xl"
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 gap-3 text-purple-300/40">
            <Music className="w-8 h-8" />
            <p className="text-sm font-serif italic">No streaming link yet.</p>
            <div className="flex gap-3">
              {currentSong.spotifyUrl && (
                <a href={currentSong.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1">
                  Open Spotify <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {currentSong.youtubeUrl && (
                <a href={currentSong.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                  Open YouTube <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Mini Player — persistent bar above bottom nav
// ---------------------------------------------------------------------------
export function MiniPlayer() {
  const { currentSong, isExpanded, closeSong, expand } = useMusicPlayer();

  return (
    <AnimatePresence>
      {currentSong && !isExpanded && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[45] pb-16 px-3 md:bottom-6 md:left-auto md:right-6 md:w-80 md:pb-0 md:px-0"
        >
          <div
            className="flex items-center gap-3 bg-[#0D0714]/95 border border-purple-500/20 rounded-2xl px-4 py-3 shadow-[0_0_30px_rgba(147,51,234,0.2)] cursor-pointer"
            onClick={expand}
          >
            {currentSong.coverPath ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={currentSong.coverPath} alt={currentSong.title} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Music className="w-4 h-4 text-purple-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate font-serif">{currentSong.title}</p>
              <p className="text-purple-400/60 text-xs truncate">{currentSong.artist}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <ChevronUp className="w-4 h-4 text-purple-400/50" />
              <button
                onClick={(e) => { e.stopPropagation(); closeSong(); }}
                className="p-1 text-purple-400/40 hover:text-purple-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Expanded player overlay */}
      {isExpanded && currentSong && <ExpandedPlayer key="expanded" />}
    </AnimatePresence>
  );
}
