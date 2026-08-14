export interface Song {
  id: string;
  title: string;
  artist: string;
  reason: string;
  coverUrl: string | null;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export const songs: Song[] = [
  {
    id: "song-1",
    title: "Example Song (Placeholder)",
    artist: "Placeholder Artist",
    reason: "Because this reminds me of the first time we hung out.",
    coverUrl: null, // e.g., "/images/songs/cover1.jpg"
  },
  {
    id: "song-2",
    title: "Another Example Song",
    artist: "Placeholder Artist",
    reason: "Our late night drives 💜",
    coverUrl: null,
  }
];
