"use client";

import { useState } from "react";
import { updateMemory, deleteMemory } from "../actions";
import { MediaUploader } from "@/components/admin/MediaUploader";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";

export function EditMemoryForm({ memory }: { memory: any }) {
  const [mediaUrls, setMediaUrls] = useState<any[]>(
    memory.media.map((m: any) => ({
      url: m.filePath,
      mimeType: m.mimeType,
      type: m.mediaType
    }))
  );
  
  const updateMemoryWithId = updateMemory.bind(null, memory.id);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/memories" className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-serif font-bold text-white">Edit Memory</h1>
        </div>
        <form action={async () => {
          if (confirm("Are you sure you want to delete this memory?")) {
            await deleteMemory(memory.id);
          }
        }}>
          <button type="submit" className="text-red-400 hover:text-red-300 flex items-center gap-2 p-2 rounded-lg hover:bg-red-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </form>
      </div>

      <form action={updateMemoryWithId} className="space-y-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Title</label>
            <input name="title" defaultValue={memory.title} type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Date</label>
            <input name="date" defaultValue={memory.date ? new Date(memory.date).toISOString().split('T')[0] : ''} type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 [color-scheme:dark]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Category</label>
            <select name="category" defaultValue={memory.category} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500">
              <option value="Us">Us</option>
              <option value="Dates">Dates</option>
              <option value="Trips">Trips</option>
              <option value="Random">Random</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Location</label>
            <input name="location" defaultValue={memory.location || ""} type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Caption (Short)</label>
          <input name="caption" defaultValue={memory.caption || ""} type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Full Story (Optional)</label>
          <textarea name="story" defaultValue={memory.story || ""} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-zinc-300">Media (Photos & Videos)</label>
          {/* Note: MediaUploader might need initialization with existing media if it supports it, 
              but for simplicity, we pass existing mediaUrls. You might need to adjust MediaUploader 
              to accept initialFiles or just use a custom logic here. */}
          <MediaUploader onChange={setMediaUrls} />
          <input type="hidden" name="mediaUrls" value={JSON.stringify(mediaUrls)} />
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked={memory.isFavorite} name="isFavorite" className="w-4 h-4 rounded border-zinc-700 text-purple-600 focus:ring-purple-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Mark as Favorite 💜</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked={memory.isPublished} name="isPublished" className="w-4 h-4 rounded border-zinc-700 text-purple-600 focus:ring-purple-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Publish Immediately</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-2 rounded-lg transition-colors">
            Save Changes 💜
          </button>
        </div>
      </form>
    </div>
  );
}
