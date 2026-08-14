"use client";

import { useEffect, useState } from "react";
import { differenceInDays, isBefore, addYears, parseISO } from "date-fns";
import { CalendarHeart } from "lucide-react";

export function NextSpecialMoment({ specialDates, couple }: { specialDates: any[], couple: any }) {
  const [mounted, setMounted] = useState(false);
  const [nextEvent, setNextEvent] = useState<{ title: string; daysLeft: number; dateStr: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let closest: { title: string; daysLeft: number; dateStr: string } | null = null;
    let minDays = Infinity;

    specialDates.forEach(event => {
      let eventDate = parseISO(event.date);
      eventDate.setHours(0, 0, 0, 0);

      if (event.recurringYearly) {
        // Find the next occurrence
        eventDate.setFullYear(today.getFullYear());
        if (isBefore(eventDate, today)) {
          eventDate = addYears(eventDate, 1);
        }
      } else {
        if (isBefore(eventDate, today)) return; // Past non-yearly event
      }

      const daysLeft = differenceInDays(eventDate, today);
      if (daysLeft < minDays) {
        minDays = daysLeft;
        closest = {
          title: event.title,
          daysLeft,
          dateStr: eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };
      }
    });

    setNextEvent(closest);
  }, []);

  if (!mounted || !nextEvent) return null;

  return (
    <div className="glass px-6 py-4 rounded-2xl flex items-center gap-4 w-full md:w-auto inline-flex border border-purple-500/20">
      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
        <CalendarHeart className="w-5 h-5 text-purple-400" />
      </div>
      <div>
        <p className="text-xs text-purple-300/70 uppercase tracking-wider font-semibold mb-1">Up Next</p>
        <p className="text-white font-serif md:text-lg">
          {nextEvent.daysLeft === 0 
            ? `It's ${nextEvent.title} today! 🎉` 
            : `${nextEvent.title}`}
        </p>
        {nextEvent.daysLeft > 0 && (
          <p className="text-sm text-purple-200/60">
            {nextEvent.daysLeft} {nextEvent.daysLeft === 1 ? 'day' : 'days'} left • {nextEvent.dateStr}
          </p>
        )}
      </div>
    </div>
  );
}
