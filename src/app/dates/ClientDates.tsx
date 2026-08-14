"use client";

import { motion } from "framer-motion";
import { differenceInDays, parseISO, addYears, isBefore } from "date-fns";
import { Cake, Gift, Heart, CalendarHeart, Calendar, RefreshCcw } from "lucide-react";

const getIcon = (name: string) => {
  switch (name) {
    case "Cake": return Cake;
    case "Gift": return Gift;
    case "Heart": return Heart;
    case "CalendarHeart": return CalendarHeart;
    default: return Calendar;
  }
};

export function ClientDates({ specialDates }: { specialDates: any[] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const datesWithCalculations = specialDates.map(event => {
    let eventDate = parseISO(event.date);
    eventDate.setHours(0, 0, 0, 0);
    
    let isPast = false;

    if (event.recurringYearly) {
      eventDate.setFullYear(today.getFullYear());
      if (isBefore(eventDate, today)) {
        eventDate = addYears(eventDate, 1);
      }
    } else {
      isPast = isBefore(eventDate, today);
    }

    const daysLeft = isPast ? 0 : differenceInDays(eventDate, today);
    
    return {
      ...event,
      daysLeft,
      isPast,
      nextDate: eventDate
    };
  }).sort((a, b) => a.daysLeft - b.daysLeft); // Sort by closest first

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Our Special Dates</h1>
        <p className="text-purple-200/70 text-lg md:text-xl font-serif italic">
          Because some days deserve to be remembered forever.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datesWithCalculations.map((event, idx) => {
          const IconComponent = getIcon(event.icon);

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] group-hover:bg-purple-500/20 transition-colors" />

              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <IconComponent className="w-6 h-6" />
                </div>
                {event.isYearly && (
                  <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-purple-300/50 bg-purple-900/20 px-2 py-1 rounded-full border border-purple-500/10">
                    <RefreshCcw className="w-3 h-3" />
                    Yearly
                  </div>
                )}
              </div>

              <h3 className="text-xl font-serif text-white mb-1">{event.title}</h3>
              <p className="text-sm text-purple-200/50 font-mono mb-6">
                {parseISO(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <div className="border-t border-purple-500/10 pt-4 flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-purple-300/60 uppercase tracking-wider mb-1">
                    {event.isPast ? "Occurred" : "In"}
                  </p>
                  {event.isPast ? (
                    <span className="text-lg text-white/50 italic font-serif">Already Passed</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-serif text-white">{event.daysLeft}</span>
                      <span className="text-sm text-purple-300/70">days</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
