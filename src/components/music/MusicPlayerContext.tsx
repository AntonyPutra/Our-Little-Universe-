"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface PlayableSong {
  id: string;
  title: string;
  artist: string;
  spotifyUrl?: string | null;
  youtubeUrl?: string | null;
  note?: string | null;
  coverPath?: string | null;
}

interface MusicPlayerState {
  currentSong: PlayableSong | null;
  isExpanded: boolean;
  playSong: (song: PlayableSong) => void;
  closeSong: () => void;
  expand: () => void;
  collapse: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerState | null>(null);

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<PlayableSong | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const playSong = useCallback((song: PlayableSong) => {
    setCurrentSong(song);
    setIsExpanded(true);
  }, []);

  const closeSong = useCallback(() => {
    setCurrentSong(null);
    setIsExpanded(false);
  }, []);

  const expand = useCallback(() => setIsExpanded(true), []);
  const collapse = useCallback(() => setIsExpanded(false), []);

  return (
    <MusicPlayerContext.Provider value={{ currentSong, isExpanded, playSong, closeSong, expand, collapse }}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  return ctx;
}

// ---------------------------------------------------------------------------
// URL Security — validate and construct safe embed URLs only
// ---------------------------------------------------------------------------

export function getSpotifyEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    // Accept open.spotify.com links
    if (!["open.spotify.com", "spotify.com"].includes(u.hostname)) return null;
    // Extract the path: /track/ID, /album/ID, /playlist/ID
    const match = u.pathname.match(/^\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
    if (!match) return null;
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;

    if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1);
    } else if (["www.youtube.com", "youtube.com", "m.youtube.com"].includes(u.hostname)) {
      videoId = u.searchParams.get("v");
      if (!videoId) {
        // Handle /shorts/ID
        const shortsMatch = u.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortsMatch) videoId = shortsMatch[1];
      }
    }

    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return null;
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  } catch {
    return null;
  }
}

export function getSongEmbedType(song: PlayableSong): "spotify" | "youtube" | "none" {
  if (song.spotifyUrl && getSpotifyEmbedUrl(song.spotifyUrl)) return "spotify";
  if (song.youtubeUrl && getYouTubeEmbedUrl(song.youtubeUrl)) return "youtube";
  return "none";
}
