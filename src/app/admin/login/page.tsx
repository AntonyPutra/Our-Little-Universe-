"use client";

import { useActionState } from "react";
import { unlock } from "../actions";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function UnlockPage() {
  const [state, formAction, isPending] = useActionState(unlock, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Stars / glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center"
          >
            <Heart className="w-8 h-8 text-pink-400" />
          </motion.div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-white mb-3">Our Space 💜</h1>
          <p className="text-purple-200/60 text-sm leading-relaxed font-serif italic">
            Enter the day we became us.
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-5">
          <div>
            <input
              type="password"
              name="passcode"
              required
              autoComplete="current-password"
              inputMode="numeric"
              placeholder="Passcode"
              className="w-full bg-white/5 border border-purple-500/30 rounded-2xl px-5 py-4 text-white text-center text-2xl tracking-[0.4em] placeholder:tracking-normal placeholder:text-purple-300/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all backdrop-blur-sm"
            />
          </div>

          {state?.error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-pink-400/90 text-center bg-pink-500/10 border border-pink-500/20 rounded-xl px-4 py-3"
            >
              {state.error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-serif text-lg tracking-wide transition-all shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <span className="animate-pulse">Opening...</span>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                Unlock Our Space
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
