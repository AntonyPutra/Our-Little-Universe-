"use client";

import { useEffect, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { toZonedTime } from "date-fns-tz";
export function TogetherCounter({ couple }: { couple: any }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    
    const startDate = new Date(couple.relationshipStart);
    
    const updateCounter = () => {
      const now = toZonedTime(new Date(), "Asia/Jakarta");
      const start = toZonedTime(startDate, "Asia/Jakarta");
      setTime({
        days: differenceInDays(now, start),
        hours: differenceInHours(now, start) % 24,
        minutes: differenceInMinutes(now, start) % 60,
        seconds: differenceInSeconds(now, start) % 60,
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="glass-card p-6 md:p-10 rounded-3xl w-full max-w-2xl mx-auto flex flex-col items-center text-center opacity-0">
        <h3 className="font-serif text-xl md:text-2xl text-purple-200 mb-4">We've been us for</h3>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 md:p-10 rounded-3xl w-full max-w-2xl mx-auto flex flex-col items-center text-center relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px] group-hover:bg-purple-500/30 transition-all duration-700" />
      
      <h3 className="font-serif text-xl md:text-2xl text-purple-200 mb-6 relative z-10">
        We've been us for
      </h3>
      
      <div className="flex items-baseline justify-center gap-2 md:gap-4 mb-4 relative z-10">
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-serif text-white">{time.days}</span>
          <span className="text-xs md:text-sm text-purple-300/70 tracking-widest uppercase mt-1">Days</span>
        </div>
        <span className="text-2xl md:text-4xl text-purple-500/50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-4xl font-serif text-white/90">{time.hours.toString().padStart(2, '0')}</span>
          <span className="text-[10px] md:text-xs text-purple-300/50 tracking-widest uppercase mt-1">Hrs</span>
        </div>
        <span className="text-2xl md:text-4xl text-purple-500/50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-4xl font-serif text-white/80">{time.minutes.toString().padStart(2, '0')}</span>
          <span className="text-[10px] md:text-xs text-purple-300/50 tracking-widest uppercase mt-1">Min</span>
        </div>
        <span className="text-2xl md:text-4xl text-purple-500/50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-4xl font-serif text-white/70">{time.seconds.toString().padStart(2, '0')}</span>
          <span className="text-[10px] md:text-xs text-purple-300/50 tracking-widest uppercase mt-1">Sec</span>
        </div>
      </div>
      
      <p className="text-sm text-purple-300/60 mt-4 relative z-10">
        Since July 6, 2026 💜
      </p>
    </div>
  );
}
