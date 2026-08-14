"use client";

import { useState } from "react";
import { createSong } from "../actions";
import Link from "next/link";
import { ArrowLeft, Music } from "lucide-react";
import { MediaUploader } from "@/components/admin/MediaUploader";

export default function NewSongPage() {
  const [coverUrls, setCoverUrls] = useState<any[]>([]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/songs" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <Music className="w-6 h-6 text-purple-400" />
          Add New Song
        </h1>
      </div>

      <form action={createSong} className="space-y-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Song Title</label>
            <input name="title" type="text" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. Perfect" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Artist</label>
            <input name="artist" type="text" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. Ed Sheeran" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Spotify URL</label>
          <input name="spotifyUrl" type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="https://open.spotify.com/track/..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">YouTube URL</label>
          <input name="youtubeUrl" type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="https://youtube.com/watch?v=..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Note / Reason why you added this (Optional)</label>
          <textarea name="note" rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="This song reminds me of..." />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-zinc-300">Cover Image (Optional)</label>
          <MediaUploader onChange={setCoverUrls} />
          <input type="hidden" name="coverPath" value={coverUrls[0]?.url || ""} />
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFavorite" className="w-4 h-4 rounded border-zinc-700 text-purple-600 focus:ring-purple-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Mark as Favorite 💜</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isPublished" defaultChecked className="w-4 h-4 rounded border-zinc-700 text-purple-600 focus:ring-purple-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Publish Immediately</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-2 rounded-lg transition-colors">
            Save Song 🎵
          </button>
        </div>
      </form>
    </div>
  );
}
