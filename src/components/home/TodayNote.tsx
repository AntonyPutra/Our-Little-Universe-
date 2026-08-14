"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { toZonedTime } from "date-fns-tz";

interface DailyNote {
  id: string;
  content: string;
}

export function TodayNote({ notes }: { notes: DailyNote[] }) {
  const [noteOfTheDay, setNoteOfTheDay] = useState<DailyNote | null>(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;
    
    // Deterministic random based on current date in Asia/Jakarta
    const today = toZonedTime(new Date(), "Asia/Jakarta");
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    // Simple hash function to get a deterministic index for the day
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    const index = Math.abs(hash) % notes.length;
    setNoteOfTheDay(notes[index]);
  }, [notes]);

  if (!noteOfTheDay) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-sm mx-auto bg-gradient-to-br from-purple-900/30 to-background-dark border border-purple-500/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(147,51,234,0.1)] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Sparkles className="w-16 h-16 text-purple-300" />
      </div>
      
      <p className="text-xs text-purple-300/50 font-sans uppercase tracking-widest mb-4">
        Today's Little Note
      </p>
      
      <p className="font-serif text-lg md:text-xl text-purple-100 italic leading-relaxed relative z-10">
        "{noteOfTheDay.content}"
      </p>
    </motion.div>
  );
}
