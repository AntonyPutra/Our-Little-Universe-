"use client";

import { useActionState, useState } from "react";
import { createMemory } from "../actions";
import { MediaUploader } from "@/components/admin/MediaUploader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewMemoryPage() {
  const [mediaUrls, setMediaUrls] = useState<any[]>([]);

  // Since we are uploading media separately, we will append it to formData before submission
  // Or simpler: stringify the media array and put it in a hidden input
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/memories" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-serif font-bold text-white">Add New Memory</h1>
      </div>

      <form action={createMemory} className="space-y-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Title</label>
            <input name="title" type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. Our First Trip" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Date</label>
            <input name="date" type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 [color-scheme:dark]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Category</label>
            <select name="category" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500">
              <option value="Us">Us</option>
              <option value="Dates">Dates</option>
              <option value="Trips">Trips</option>
              <option value="Random">Random</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Location</label>
            <input name="location" type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. Bali" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Caption (Short)</label>
          <input name="caption" type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="A short cute text for the grid." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Full Story (Optional)</label>
          <textarea name="story" rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="Write something long and romantic here..." />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-zinc-300">Media (Photos & Videos)</label>
          <MediaUploader onChange={setMediaUrls} />
          <input type="hidden" name="mediaUrls" value={JSON.stringify(mediaUrls)} />
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
            Publish Memory 💜
          </button>
        </div>
      </form>
    </div>
  );
}
