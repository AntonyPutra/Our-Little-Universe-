"use client";

import { useState } from "react";
import { updateSong, deleteSong } from "../actions";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { MediaUploader } from "@/components/admin/MediaUploader";

export function EditSongForm({ song }: { song: any }) {
  const [coverUrls, setCoverUrls] = useState<any[]>(
    song.coverPath ? [{ url: song.coverPath }] : []
  );
  
  const updateSongWithId = updateSong.bind(null, song.id);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/songs" className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-serif font-bold text-white">Edit Song</h1>
        </div>
        <form action={async () => {
          if (confirm("Are you sure you want to delete this song?")) {
            await deleteSong(song.id);
          }
        }}>
          <button type="submit" className="text-red-400 hover:text-red-300 flex items-center gap-2 p-2 rounded-lg hover:bg-red-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </form>
      </div>

      <form action={updateSongWithId} className="space-y-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Song Title</label>
            <input name="title" defaultValue={song.title} type="text" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Artist</label>
            <input name="artist" defaultValue={song.artist} type="text" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Spotify URL</label>
          <input name="spotifyUrl" defaultValue={song.spotifyUrl || ""} type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">YouTube URL</label>
          <input name="youtubeUrl" defaultValue={song.youtubeUrl || ""} type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Note / Reason</label>
          <textarea name="note" defaultValue={song.note || ""} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-zinc-300">Cover Image</label>
          <MediaUploader onChange={setCoverUrls} />
          <input type="hidden" name="coverPath" value={coverUrls[0]?.url || ""} />
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked={song.isFavorite} name="isFavorite" className="w-4 h-4 rounded border-zinc-700 text-purple-600 focus:ring-purple-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Mark as Favorite 💜</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked={song.isPublished} name="isPublished" className="w-4 h-4 rounded border-zinc-700 text-purple-600 focus:ring-purple-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Publish Immediately</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-2 rounded-lg transition-colors">
            Save Changes 🎵
          </button>
        </div>
      </form>
    </div>
  );
}
