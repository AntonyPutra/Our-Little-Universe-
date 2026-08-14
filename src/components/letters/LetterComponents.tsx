"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export type LoveLetter = {
  id: string;
  title: string;
  date: string | null;
  content: string[];
  isSpecial: boolean;
};

import { Heart, X } from "lucide-react";

export function EnvelopeCard({ letter, onOpen }: { letter: LoveLetter, onOpen: (letter: LoveLetter) => void }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    // Wait for the envelope open animation before triggering the full letter viewer
    setTimeout(() => {
      onOpen(letter);
      setIsOpening(false);
    }, 1000);
  };

  return (
    <div 
      onClick={handleClick}
      className={`relative w-full max-w-sm mx-auto aspect-[4/3] cursor-pointer group perspective-1000 ${letter.isSpecial ? 'scale-105 md:scale-110' : ''}`}
    >
      <motion.div 
        className="w-full h-full relative preserve-3d"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Envelope Back/Body */}
        <div className={`absolute inset-0 rounded-lg shadow-xl border ${letter.isSpecial ? 'bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-pink-500/30' : 'bg-purple-900/30 border-purple-500/20'} overflow-hidden`}>
          {/* Inner Letter slightly peeking out during animation */}
          <motion.div 
            initial={{ y: 50 }}
            animate={{ y: isOpening ? -20 : 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute left-4 right-4 top-4 bottom-4 bg-white/90 rounded-md"
          >
             <div className="p-4 flex flex-col h-full text-center opacity-30">
               <div className="h-2 w-3/4 bg-purple-900/20 mx-auto rounded mb-2"></div>
               <div className="h-2 w-full bg-purple-900/20 mx-auto rounded mb-2"></div>
               <div className="h-2 w-5/6 bg-purple-900/20 mx-auto rounded mb-2"></div>
             </div>
          </motion.div>
        </div>
        
        {/* Flap */}
        <motion.div 
          className="absolute inset-0 origin-top z-20"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpening ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className={`w-full h-1/2 drop-shadow-md ${letter.isSpecial ? 'fill-pink-950/80' : 'fill-purple-950/80'}`}>
            <polygon points="0,0 100,0 50,50" />
            <path d="M0,0 L100,0 L50,50 Z" stroke="rgba(147,51,234,0.3)" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>

        {/* Envelope Front bottom */}
        <div className={`absolute inset-0 z-30 pointer-events-none rounded-lg overflow-hidden`}>
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`absolute bottom-0 w-full h-full ${letter.isSpecial ? 'fill-pink-900/60' : 'fill-purple-900/60'}`}>
             <polygon points="0,100 100,100 100,50 50,75 0,50" />
             <path d="M0,100 L100,100 L100,50 L50,75 L0,50 Z" stroke="rgba(147,51,234,0.2)" strokeWidth="1" fill="none" />
           </svg>
        </div>

        {/* Wax Seal */}
        <motion.div 
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: isOpening ? 1.5 : 1, opacity: isOpening ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[10%] z-40 w-12 h-12 rounded-full ${letter.isSpecial ? 'bg-pink-600 shadow-pink-500/50' : 'bg-purple-600 shadow-purple-500/50'} shadow-lg flex items-center justify-center border-2 border-black/20`}
        >
          <Heart className="w-5 h-5 text-white/90 fill-white/50" />
        </motion.div>

        {/* Envelope Text */}
        <motion.div 
          animate={{ opacity: isOpening ? 0 : 1 }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-end pb-6 pointer-events-none"
        >
          <h3 className="font-handwriting text-2xl text-white mb-1 drop-shadow-md">{letter.title}</h3>
          {letter.date && <p className="text-[10px] text-purple-200/70 font-mono tracking-widest">{letter.date}</p>}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function LetterViewer({ letter, onClose }: { letter: LoveLetter | null, onClose: () => void }) {
  if (!letter) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] bg-[#FDFBF7] rounded-sm shadow-2xl overflow-y-auto"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")' }}
        >
          {/* Paper texture and lines */}
          <div className="absolute inset-0 pointer-events-none" 
               style={{ background: 'linear-gradient(transparent 95%, rgba(147,51,234,0.1) 100%)', backgroundSize: '100% 2rem' }} />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-200/50 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="px-8 md:px-12 py-16 relative z-10">
            <h2 className="font-handwriting text-3xl md:text-5xl text-gray-800 mb-8 text-center border-b border-gray-200 pb-6">
              {letter.title}
            </h2>
            
            <div className="space-y-6 text-gray-700 font-serif leading-relaxed text-lg md:text-xl">
              {letter.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {letter.date && (
              <div className="mt-12 text-right font-handwriting text-xl text-gray-500">
                {new Date(letter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
