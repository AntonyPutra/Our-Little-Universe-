"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, LockKeyhole } from "lucide-react";

interface OurSpaceUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Where to navigate after successful unlock. Defaults to /admin */
  redirectTo?: string;
  /** Called instead of redirecting — for seamless Quick Add flow */
  onUnlocked?: () => void;
}

export function OurSpaceUnlockModal({
  isOpen,
  onClose,
  redirectTo = "/admin",
  onUnlocked,
}: OurSpaceUnlockModalProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [shake, setShake] = useState(false);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setPasscode("");
      setError(null);
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode || isPending) return;

    setIsPending(true);
    setError(null);

    try {
      const { fetchApi } = await import('@/lib/api/client');
      const res = await fetchApi('/auth/unlock', {
        method: "POST",
        body: JSON.stringify({ passcode }),
      });

      if (res.error) {
        setError(res.error);
        setShake(true);
        setTimeout(() => setShake(false), 600);
        setIsPending(false);
        return;
      }

      // Session cookie is now set — proceed
      if (onUnlocked) {
        onUnlocked();
      } else {
        window.location.href = redirectTo;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsPending(false);
    }
  }, [passcode, isPending, onUnlocked, redirectTo]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="our-space-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="our-space-title"
        >
          <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />

          <motion.div
            key="our-space-card"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-purple-600/10 blur-2xl pointer-events-none" />

            <div className="relative bg-gradient-to-b from-purple-950/80 to-[#050308]/95 border border-purple-500/20 rounded-3xl p-8 shadow-[0_0_80px_rgba(147,51,234,0.25)]">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-purple-400/40 hover:text-purple-300 transition-colors rounded-full hover:bg-purple-500/10"
                aria-label="Close Our Space"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Pulsing heart icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center"
                >
                  <Heart className="w-7 h-7 text-pink-400" />
                </motion.div>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h2
                  id="our-space-title"
                  className="font-serif text-3xl text-white mb-2"
                >
                  Our Space 💜
                </h2>
                <p className="text-purple-300/50 text-sm font-serif italic leading-relaxed">
                  Enter the day we became us.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <input
                    type="password"
                    inputMode="numeric"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    aria-label="Couple space passcode"
                    className="w-full bg-white/5 border border-purple-500/20 rounded-2xl px-5 py-4 text-white text-center text-2xl tracking-[0.5em] placeholder:tracking-normal placeholder:text-purple-300/20 focus:outline-none focus:border-purple-400/60 focus:ring-1 focus:ring-purple-400/40 transition-all"
                    autoFocus
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.p
                      key={error}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-sm text-pink-400/90 bg-pink-500/10 border border-pink-500/20 rounded-xl px-4 py-2.5"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isPending || !passcode}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-serif text-base tracking-wide transition-all shadow-[0_0_25px_rgba(147,51,234,0.35)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <span className="animate-pulse">Opening...</span>
                  ) : (
                    <>
                      <LockKeyhole className="w-4 h-4" />
                      Unlock Our Space
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-purple-400/20 mt-5 font-serif italic select-none">
                the day we became us. 💜
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
