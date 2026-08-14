"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Heart } from "lucide-react";
import Link from "next/link";

interface Letter {
  id: string;
  title: string;
  content: string;
  date: Date | null;
}

export function LoveMailbox({ letters }: { letters: Letter[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  const openMailbox = () => {
    if (letters.length === 0) {
      setSelectedLetter({ id: "empty", title: "Mailbox is Empty", content: "Check back later! Putra hasn't sent any new letters yet.", date: null });
      setIsOpen(true);
      return;
    }
    // Pick a random letter
    const randomIndex = Math.floor(Math.random() * letters.length);
    setSelectedLetter(letters[randomIndex]);
    setIsOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative group cursor-pointer" onClick={openMailbox}>
        <motion.div
          whileHover={{ y: -10, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-800/20 border border-purple-500/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(147,51,234,0.15)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all backdrop-blur-md"
        >
          <Mail className="w-12 h-12 text-purple-300 drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]" />
          
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-3"
          >
            {letters.length > 0 ? (
              <div className="w-8 h-8 rounded-full bg-pink-500/80 flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                <Heart className="w-4 h-4 text-white fill-current" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/30">
                <Mail className="w-4 h-4 text-purple-400" />
              </div>
            )}
          </motion.div>
        </motion.div>
        
        <p className="text-center mt-4 text-purple-300/80 font-serif text-sm tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
          Love Mailbox
        </p>
      </div>

      <AnimatePresence>
        {isOpen && selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-full max-w-lg bg-gradient-to-b from-purple-900/40 to-background-dark border border-purple-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(147,51,234,0.2)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-purple-300/50 hover:text-purple-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <Heart className="w-8 h-8 text-pink-400/80 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-purple-100">{selectedLetter.title}</h3>
              </div>

              <div className="prose prose-invert prose-purple max-w-none text-purple-200/80 whitespace-pre-wrap font-serif leading-relaxed max-h-[50vh] overflow-y-auto custom-scrollbar">
                {selectedLetter.content}
              </div>

              <div className="mt-8 pt-6 border-t border-purple-500/20 text-center">
                <Link 
                  href="/letters"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Read all letters
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
