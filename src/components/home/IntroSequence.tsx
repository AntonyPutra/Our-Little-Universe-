"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 3000);
      return () => clearTimeout(timer);
    }
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-dark overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background-dark to-background-dark" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p
              key="step0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="font-serif text-2xl md:text-4xl text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            >
              For Vell Vell...
            </motion.p>
          )}

          {step === 1 && (
            <motion.p
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="font-serif text-xl md:text-3xl text-white max-w-md leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            >
              I wanted our memories to have their own place.
            </motion.p>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="space-y-4">
                <h1 className="font-serif text-3xl md:text-5xl tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                  PUTRA × VELL VELL
                </h1>
                <h2 className="text-xl md:text-2xl text-purple-300 font-serif italic">
                  Our Little Universe
                </h2>
                <p className="text-sm md:text-base text-purple-200/50 tracking-[0.3em]">
                  SINCE 06 • 07 • 2026
                </p>
              </div>

              <motion.button
                onClick={onComplete}
                className="mt-8 px-8 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-100 transition-all shadow-[0_0_20px_rgba(147,51,234,0.15)] hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] backdrop-blur-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter Our Universe 💜
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step < 2 && (
        <button 
          onClick={() => setStep(2)}
          className="absolute bottom-10 text-xs text-purple-300/40 hover:text-purple-300 transition-colors"
        >
          skip
        </button>
      )}
    </motion.div>
  );
}
