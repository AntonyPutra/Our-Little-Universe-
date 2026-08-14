"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LoveReasonGenerator({ loveReasons }: { loveReasons: string[] }) {
  const [reason, setReason] = useState<string | null>(null);
  const [clicks, setClicks] = useState(0); // Easter egg trigger

  const generateReason = () => {
    const r = loveReasons[Math.floor(Math.random() * loveReasons.length)];
    setReason(r);
    setClicks(prev => prev + 1);
  };

  const showEasterEgg = clicks >= 10;

  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-3xl"
          >
            <div className="text-center">
              <Heart className="w-20 h-20 text-pink-500 fill-pink-500 animate-bounce mx-auto mb-6" />
              <h2 className="text-4xl md:text-6xl font-serif text-white tracking-widest text-shadow-lg">
                PUTRA LOVES VELL VELL 💜
              </h2>
              <button 
                onClick={() => setClicks(0)}
                className="mt-8 text-white/50 underline text-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={generateReason}
        className="group relative w-32 h-32 rounded-full glass flex items-center justify-center hover:bg-purple-900/30 transition-all border-purple-500/30 hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] mb-10"
      >
        <Heart className="w-10 h-10 text-pink-500 group-hover:fill-pink-500 transition-colors" />
        <span className="absolute -bottom-8 text-xs text-purple-300/70 font-mono tracking-widest uppercase">
          Tell Me One
        </span>
      </button>

      <AnimatePresence mode="wait">
        {reason && (
          <motion.div
            key={reason}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-center max-w-md px-6"
          >
            <p className="font-serif text-2xl text-purple-100 italic">
              "{reason}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
