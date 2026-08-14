"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { couple } from "@/data/couple";
import { Lock, Unlock, Sparkles, Heart } from "lucide-react";

export default function SecretPage() {
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === couple.passcode) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
      setPasscode("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20 min-h-[70vh] flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="glass-card p-10 rounded-3xl text-center">
              <Lock className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <h1 className="font-serif text-2xl text-white mb-2">Psst...</h1>
              <p className="text-purple-200/70 mb-8">This place is only for Vell Vell.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <motion.input
                  animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full bg-black/50 border border-purple-500/30 rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all tracking-widest"
                />
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors"
                >
                  Unlock
                </button>
              </form>
              
              <p className="text-purple-300/40 text-xs mt-6 italic">Hint: the day we became us. 💜</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Unlock className="w-16 h-16 text-pink-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]" />
            </motion.div>
            
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
              You found Putra's secret room 💜
            </h1>
            
            <div className="mt-12 glass p-8 rounded-3xl text-left max-w-2xl mx-auto border-pink-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <h2 className="font-serif text-2xl text-pink-200">A Secret Letter</h2>
              </div>
              <p className="text-purple-100 leading-relaxed font-serif text-lg mb-6">
                I made this whole universe just so I could put you in the center of it. 
                Thank you for being my favorite part of every day.
                <br/><br/>
                I love you.
              </p>
              
              <div className="w-full aspect-[4/5] md:aspect-video bg-pink-900/10 rounded-xl border border-pink-500/20 flex flex-col items-center justify-center text-pink-300/50 mt-8 relative overflow-hidden group">
                <Heart className="w-10 h-10 mb-4 opacity-50 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm">Favorite photo goes here</span>
                <span className="text-xs mt-2 opacity-50">public/images/secret/photo.jpg</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
