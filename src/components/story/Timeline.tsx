"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Eye, Coffee, Sparkles, Star, MapPin } from "lucide-react";
import { useRef } from "react";

const getIcon = (name: string) => {
  switch (name) {
    case "Eye": return Eye;
    case "Coffee": return Coffee;
    case "Heart": return Heart;
    case "Star": return Star;
    case "MapPin": return MapPin;
    default: return Sparkles;
  }
};

export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  location?: string;
};

export function Timeline({ events }: { events: TimelineEvent[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-20 px-4">
      {/* Background track line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-purple-500/10 transform -translate-x-1/2" />
      <div className="md:hidden absolute left-8 top-0 bottom-0 w-px bg-purple-500/10" />

      {/* Animated Glowing Line */}
      <motion.div 
        style={{ height: lineHeight }}
        className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-purple-400 via-pink-400 to-purple-400 transform -translate-x-1/2 shadow-[0_0_15px_rgba(216,180,254,0.8)] z-0 origin-top" 
      />
      <motion.div 
        style={{ height: lineHeight }}
        className="md:hidden absolute left-8 top-0 w-[2px] bg-gradient-to-b from-purple-400 via-pink-400 to-purple-400 shadow-[0_0_15px_rgba(216,180,254,0.8)] z-0 origin-top" 
      />

      <div className="space-y-16 md:space-y-32">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          const IconComponent = getIcon(event.icon);

          return (
            <div key={event.id} className="relative flex flex-col md:flex-row items-center w-full group">
              
              {/* Mobile Icon */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="md:hidden absolute left-8 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-background-dark border-2 border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.5)] text-purple-200 z-20 group-hover:scale-110 transition-transform duration-300"
              >
                <div className="absolute inset-0 rounded-full animate-ping bg-purple-400/20" />
                <IconComponent className="w-5 h-5 relative z-10" />
              </motion.div>

              {/* Desktop Icon (Center) */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-14 h-14 rounded-full bg-background-dark border-2 border-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.6)] text-purple-200 z-20 group-hover:scale-110 group-hover:text-white transition-transform duration-300"
              >
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-purple-400" />
                <IconComponent className="w-6 h-6 relative z-10" />
              </motion.div>

              {/* Content Container */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", damping: 20 }}
                className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right md:ml-0' : 'md:pl-16 text-left md:ml-auto'}`}
              >
                <div className="glass-card p-6 md:p-8 rounded-2xl hover:bg-purple-900/20 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 shadow-lg relative overflow-hidden group">
                  {/* Subtle hover glow inside card */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <span className="text-pink-400 text-sm font-mono mb-2 block font-semibold tracking-widest uppercase">
                    {event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Waiting for date 💜"}
                  </span>
                  
                  <h3 className="font-serif text-3xl text-white mb-3 tracking-wide">{event.title}</h3>
                  
                  <p className="text-purple-200/80 leading-relaxed mb-4 font-serif text-lg">
                    {event.description}
                  </p>

                  {event.location && (
                    <div className={`flex items-center gap-2 text-xs font-mono tracking-wider text-purple-300/50 mt-4 uppercase ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  )}

                  {/* Optional Photo */}
                  {event.image && (
                    <div className="mt-6 w-full h-56 bg-purple-900/20 rounded-xl overflow-hidden border border-purple-500/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
