"use client";

import { createLetter } from "../actions";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function NewLetterPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/letters" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <Mail className="w-6 h-6 text-amber-400" />
          Write a Letter
        </h1>
      </div>

      <form action={createLetter} className="space-y-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Title / Subject</label>
            <input name="title" type="text" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500" placeholder="e.g. Open when you're sad" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Date (Optional)</label>
            <input name="date" type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 [color-scheme:dark]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Type</label>
            <select name="letterType" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500">
              <option value="regular">Regular Letter</option>
              <option value="open-when">Open When...</option>
              <option value="apology">Apology</option>
              <option value="appreciation">Appreciation</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">From / To</label>
            <div className="flex gap-2">
              <input name="fromAuthor" type="text" className="w-1/2 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500" placeholder="From..." />
              <input name="toAuthor" type="text" className="w-1/2 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500" placeholder="To..." />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Letter Content</label>
          <textarea name="content" required rows={10} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-amber-500 font-serif leading-relaxed" placeholder="My dearest..." />
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFeatured" className="w-4 h-4 rounded border-zinc-700 text-amber-600 focus:ring-amber-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Highlight / Featured ⭐️</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isPublished" defaultChecked className="w-4 h-4 rounded border-zinc-700 text-amber-600 focus:ring-amber-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Publish Immediately</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-6 py-2 rounded-lg transition-colors">
            Send Letter 💌
          </button>
        </div>
      </form>
    </div>
  );
}
