"use client";

import { createDream } from "../actions";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NewDreamPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dreams" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-fuchsia-400" />
          Add a Dream
        </h1>
      </div>

      <form action={createDream} className="space-y-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Dream Title</label>
            <input name="title" type="text" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500" placeholder="e.g. Go to Japan" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Category</label>
            <select name="category" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500">
              <option value="Travel">Travel</option>
              <option value="Life Goal">Life Goal</option>
              <option value="Purchase">Purchase</option>
              <option value="Experience">Experience</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Status</label>
            <select name="status" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500">
              <option value="Dreaming">Dreaming</option>
              <option value="Planned">Planned</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Description (Optional)</label>
          <textarea name="description" rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500" placeholder="Details about this dream..." />
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isPublished" defaultChecked className="w-4 h-4 rounded border-zinc-700 text-fuchsia-600 focus:ring-fuchsia-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Publish Immediately</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-medium px-6 py-2 rounded-lg transition-colors">
            Save Dream ✨
          </button>
        </div>
      </form>
    </div>
  );
}
