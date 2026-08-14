"use client";

import { useState } from "react";
import { EnvelopeCard, LetterViewer, LoveLetter } from "@/components/letters/LetterComponents";
import { motion } from "framer-motion";

export function ClientLetters({ letters }: { letters: LoveLetter[] }) {
  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);

  const specialLetter = letters.find(l => l.isSpecial);
  const regularLetters = letters.filter(l => !l.isSpecial);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Letters For Vell Vell</h1>
        <p className="text-purple-200/70 text-lg md:text-xl font-serif italic">
          Things I sometimes don't know how to say out loud.
        </p>
      </div>

      {specialLetter && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <EnvelopeCard letter={specialLetter} onOpen={setActiveLetter} />
        </motion.div>
      )}

      {regularLetters.length > 0 && (
        <>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-16" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
            {regularLetters.map((letter, idx) => (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <EnvelopeCard letter={letter} onOpen={setActiveLetter} />
              </motion.div>
            ))}
          </div>
        </>
      )}

      <LetterViewer letter={activeLetter} onClose={() => setActiveLetter(null)} />
    </div>
  );
}
