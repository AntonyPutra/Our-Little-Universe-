"use client";

import { createDate } from "../actions";
import Link from "next/link";
import { ArrowLeft, CalendarHeart } from "lucide-react";

export default function NewDatePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dates" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <CalendarHeart className="w-6 h-6 text-pink-400" />
          Add Special Date
        </h1>
      </div>

      <form action={createDate} className="space-y-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Title</label>
            <input name="title" type="text" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" placeholder="e.g. Our Anniversary" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Date</label>
            <input name="date" type="date" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500 [color-scheme:dark]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Type</label>
            <select name="type" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500">
              <option value="Anniversary">Anniversary</option>
              <option value="Birthday">Birthday</option>
              <option value="Milestone">Milestone</option>
              <option value="Trip">Trip</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Icon</label>
            <select name="icon" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500">
              <option value="Heart">Heart</option>
              <option value="Star">Star</option>
              <option value="Gift">Gift</option>
              <option value="Plane">Plane</option>
              <option value="Ring">Ring</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Description (Optional)</label>
          <textarea name="description" rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" placeholder="What happened on this day?" />
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="recurringYearly" defaultChecked className="w-4 h-4 rounded border-zinc-700 text-pink-600 focus:ring-pink-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Repeats Yearly (Anniversary/Birthday)</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isPublished" defaultChecked className="w-4 h-4 rounded border-zinc-700 text-pink-600 focus:ring-pink-600 bg-zinc-950" />
            <span className="text-sm text-zinc-300">Publish Immediately</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-pink-600 hover:bg-pink-500 text-white font-medium px-6 py-2 rounded-lg transition-colors">
            Save Date 📅
          </button>
        </div>
      </form>
    </div>
  );
}
