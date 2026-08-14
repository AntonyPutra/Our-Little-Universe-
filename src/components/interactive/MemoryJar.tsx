"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export function MemoryJar({ jarNotes }: { jarNotes: string[] }) {
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [isPulling, setIsPulling] = useState(false);
  const [availableNotes, setAvailableNotes] = useState<string[]>([...jarNotes]);

  const pickNote = () => {
    if (isPulling) return;
    
    setIsPulling(true);
    setCurrentNote(null);

    setTimeout(() => {
      // Pick random
      let pool = availableNotes;
      if (pool.length === 0) {
        pool = [...jarNotes]; // refill
      }
      
      const randomIndex = Math.floor(Math.random() * pool.length);
      const selected = pool[randomIndex];
      
      // Remove from pool to avoid immediate repeats
      const newPool = pool.filter((_, idx) => idx !== randomIndex);
      setAvailableNotes(newPool);
      
      setCurrentNote(selected);
      setIsPulling(false);
    }, 1500); // 1.5s animation before reveal
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-48 h-64 mb-12">
        {/* Jar Lid */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-purple-900/50 border border-purple-500/40 rounded-t-lg z-20 backdrop-blur-md" />
        
        {/* Jar Body */}
        <div className="absolute top-8 inset-x-0 bottom-0 bg-white/5 border border-white/20 rounded-b-3xl rounded-t-xl backdrop-blur-sm z-10 shadow-[0_0_30px_rgba(147,51,234,0.15)] flex items-end p-4 overflow-hidden">
           {/* Visual representation of notes inside */}
           <div className="w-full h-2/3 bg-purple-500/20 blur-md rounded-b-2xl absolute bottom-0 left-0" />
           <div className="w-full flex flex-wrap gap-2 justify-center opacity-60 z-0">
             {Array.from({ length: 15 }).map((_, i) => (
               <div key={i} className="w-6 h-4 bg-purple-300 rounded-sm transform rotate-12" style={{ rotate: `${(i * 47) % 360}deg` }} />
             ))}
           </div>
        </div>

        {/* Note Pulling Animation (Folded Paper coming out) */}
        <AnimatePresence>
          {isPulling && (
            <motion.div
              initial={{ y: 150, opacity: 0, scale: 0.5, rotateX: 60 }}
              animate={{ y: -80, opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 z-30 w-32 h-16 bg-[#FDFBF7] shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-purple-200/20 flex items-center justify-center overflow-hidden"
              style={{ transformOrigin: "bottom center" }}
            >
              {/* Fold crease */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-black/10" />
              <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {currentNote ? (
          <motion.div
            key={currentNote}
            initial={{ opacity: 0, y: -50, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            style={{ transformPerspective: 1000, transformOrigin: "top center" }}
            className="mb-12 p-8 bg-[#FDFBF7] rounded-sm shadow-2xl max-w-sm text-center relative"
          >
            {/* Paper texture/lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #9333ea 28px)" }} />
            
            <p className="font-handwriting text-3xl text-black leading-[28px] pt-1 relative z-10">
              "{currentNote}"
            </p>
          </motion.div>
        ) : (
          <div className="mb-12 h-24" /> // Placeholder to prevent jump
        )}
      </AnimatePresence>

      <button
        onClick={pickNote}
        disabled={isPulling}
        className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-4 h-4" /> Pick a Note
      </button>
    </div>
  );
}
