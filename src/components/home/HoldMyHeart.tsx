"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Heart } from "lucide-react";

const messages = [
  "Putra misses you right now.",
  "I love you, Vell Vell. 💜",
  "Thinking of you.",
  "You're my favorite.",
  "Sending a hug!"
];

export function HoldMyHeart() {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [message, setMessage] = useState("");
  
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();

  const startHold = () => {
    if (exploded) return;
    setIsHolding(true);
    controls.start({
      scale: [1, 1.1, 1.2, 1.15, 1.3],
      transition: { duration: 3, ease: "linear" }
    });

    let currentProgress = 0;
    progressIntervalRef.current = setInterval(() => {
      currentProgress += (100 / 20); // 2 seconds = 20 intervals of 100ms
      setProgress(Math.min(currentProgress, 100));
    }, 100);

    holdTimerRef.current = setTimeout(() => {
      triggerExplosion();
    }, 2000);
  };

  const endHold = () => {
    if (exploded) return;
    setIsHolding(false);
    setProgress(0);
    controls.stop();
    controls.start({ scale: 1, transition: { type: "spring" } });
    
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const triggerExplosion = () => {
    setExploded(true);
    setIsHolding(false);
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    setTimeout(() => {
      setExploded(false);
      setProgress(0);
      controls.start({ scale: 1 });
    }, 5000); // reset after 5 seconds
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-16 relative">
      <AnimatePresence>
        {isHolding && !exploded && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-pink-500/10 blur-[100px] z-0 rounded-full"
            style={{ width: "300px", height: "300px", left: "50%", top: "50%", x: "-50%", y: "-50%" }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={controls}
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer select-none"
        >
          <div className="w-32 h-32 rounded-full border border-pink-500/30 flex items-center justify-center bg-gradient-to-br from-background-dark to-pink-900/20 shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden">
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
              <circle
                cx="64"
                cy="64"
                r="62"
                fill="none"
                stroke="rgba(236,72,153,0.2)"
                strokeWidth="4"
              />
              <circle
                cx="64"
                cy="64"
                r="62"
                fill="none"
                stroke="rgba(236,72,153,0.8)"
                strokeWidth="4"
                strokeDasharray="389.5"
                strokeDashoffset={389.5 - (389.5 * progress) / 100}
                className="transition-all duration-100 ease-linear"
              />
            </svg>

            <motion.div
              animate={isHolding ? { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] } : {}}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >
              <Heart 
                className={`w-12 h-12 transition-colors duration-300 ${isHolding ? 'text-pink-400 fill-pink-500' : 'text-pink-500/50'}`} 
              />
            </motion.div>
          </div>
        </motion.div>
        
        <div className="mt-6 h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!exploded ? (
              <motion.p
                key="instruction"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-pink-300/60 font-serif italic text-sm tracking-wide"
              >
                Hold to send love to Vell Vell.
              </motion.p>
            ) : (
              <motion.p
                key="message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-pink-300 font-serif text-lg text-center"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Explosion particles */}
      <AnimatePresence>
        {exploded && (
          <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center z-50">
            {Array.from({ length: 15 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const velocity = 30 + Math.random() * 80;
              const x = Math.cos(angle) * velocity;
              const y = Math.sin(angle) * velocity;
              
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ 
                    x, 
                    y, 
                    scale: Math.random() * 1.5 + 0.5,
                    opacity: 0,
                    rotate: Math.random() * 180 - 90
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 1.5, 
                    ease: "easeOut" 
                  }}
                  className="absolute"
                >
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-500" />
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
