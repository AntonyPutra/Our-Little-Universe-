"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Heart, Music, Camera, BookOpen, MessageSquare } from "lucide-react";
import Image from "next/image";

export function LoveCapsule() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [capsuleItem, setCapsuleItem] = useState<any>(null);

  const openCapsule = async () => {
    setIsLoading(true);
    setIsOpen(true);
    try {
      const res = await fetch("/api/capsule");
      if (res.ok) {
        const data = await res.json();
        setCapsuleItem(data);
      } else {
        setCapsuleItem(null);
      }
    } catch (e) {
      setCapsuleItem(null);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCapsuleContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
          </motion.div>
          <p className="text-purple-300 animate-pulse font-serif italic">Searching our universe...</p>
        </div>
      );
    }

    if (!capsuleItem) {
      return (
        <div className="text-center py-12">
          <p className="text-purple-300">Our capsule is resting right now. Come back later! 💜</p>
        </div>
      );
    }

    const { type, data } = capsuleItem;

    if (type === "memory") {
      return (
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Camera className="w-5 h-5" />
            <span className="font-serif tracking-widest uppercase text-sm">A Memory</span>
          </div>
          {data.media && data.media.length > 0 && (
            <div className="relative w-full max-w-sm aspect-square mb-6 rounded-2xl overflow-hidden border border-purple-500/30">
              <Image 
                src={data.media[0].filePath} 
                alt={data.title || "Memory"} 
                fill 
                className="object-cover"
              />
            </div>
          )}
          <h3 className="font-serif text-2xl text-purple-100 mb-2">{data.title || "Random Memory"}</h3>
          {data.caption && <p className="text-purple-200/80 italic">"{data.caption}"</p>}
        </div>
      );
    }

    if (type === "song") {
      return (
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Music className="w-5 h-5" />
            <span className="font-serif tracking-widest uppercase text-sm">A Song for You</span>
          </div>
          <h3 className="font-serif text-3xl text-purple-100 mb-2">{data.title}</h3>
          <p className="text-xl text-purple-300 mb-6">{data.artist}</p>
          {data.note && <p className="text-purple-200/80 italic px-4">"{data.note}"</p>}
        </div>
      );
    }

    if (type === "letter") {
      return (
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <BookOpen className="w-5 h-5" />
            <span className="font-serif tracking-widest uppercase text-sm">A Letter Snippet</span>
          </div>
          <h3 className="font-serif text-2xl text-purple-100 mb-6">{data.title}</h3>
          <div className="text-purple-200/80 italic px-4 whitespace-pre-wrap max-h-48 overflow-hidden relative">
            {data.content}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background-dark to-transparent" />
          </div>
        </div>
      );
    }

    if (type === "loveReason") {
      return (
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4 text-pink-400">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-serif tracking-widest uppercase text-sm">Why I Love You</span>
          </div>
          <p className="text-2xl text-purple-100 italic px-4 mt-4 leading-relaxed">
            "{data.content}"
          </p>
        </div>
      );
    }

    if (type === "jarNote") {
      return (
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <MessageSquare className="w-5 h-5" />
            <span className="font-serif tracking-widest uppercase text-sm">From the Jar</span>
          </div>
          <p className="text-xl text-purple-100 italic px-4 mt-4 leading-relaxed bg-purple-900/20 p-6 rounded-2xl border border-purple-500/20">
            {data.content}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full flex flex-col items-center my-8">
      <motion.button
        onClick={openCapsule}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 rounded-full border border-purple-400/40 bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 text-purple-100 transition-all shadow-[0_0_25px_rgba(147,51,234,0.3)] flex items-center gap-3 group backdrop-blur-md"
      >
        <Sparkles className="w-5 h-5 text-purple-300 group-hover:animate-pulse" />
        <span className="font-serif tracking-widest uppercase text-sm">Open Love Capsule</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -20 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-full max-w-md bg-background-dark border border-purple-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(147,51,234,0.3)] relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-purple-300/50 hover:text-purple-300 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 min-h-[300px] flex flex-col items-center justify-center">
                {renderCapsuleContent()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
