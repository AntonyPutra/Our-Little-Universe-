"use client";

import { useEffect, useState } from "react";
import { TogetherCounter } from "@/components/home/TogetherCounter";
import { NextSpecialMoment } from "@/components/home/NextSpecialMoment";
import { MemoryPreview } from "@/components/home/MemoryPreview";
import { motion } from "framer-motion";
import { differenceInDays, parseISO } from "date-fns";
import { Sparkles, Heart } from "lucide-react";
import { LoveMailbox } from "@/components/home/LoveMailbox";
import { TodayNote } from "@/components/home/TodayNote";
import { HoldMyHeart } from "@/components/home/HoldMyHeart";
import { LoveCapsule } from "@/components/home/LoveCapsule";
import Link from "next/link";

export function ClientHome({ couple, memories, specialDates, letters, dailyNotes }: { couple: any, memories: any, specialDates: any, letters: any[], dailyNotes: any[] }) {
  const [greeting, setGreeting] = useState("Hello, Vell Vell 💜");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Context aware greeting
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good morning, Vell Vell ☀️");
    else if (hour >= 12 && hour < 18) setGreeting("Good afternoon, pretty girl 💜");
    else if (hour >= 18 && hour < 22) setGreeting("Good evening, pretty girl 💜");
    else setGreeting("Still awake, Vell Vell? 🌙");
  }, []);


  const gapDays = differenceInDays(
    parseISO(couple.relationshipStart), 
    parseISO(couple.firstDate)
  );

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <section className="min-h-[65dvh] md:min-h-[80vh] flex flex-col items-center justify-center text-center relative py-6 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            {isMounted && (
              <span className="inline-block py-1 px-4 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-4 md:mb-6 backdrop-blur-md">
                {greeting}
              </span>
            )}
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 tracking-wider text-white">
              {couple.boyfriend} <span className="text-purple-400 mx-2">×</span> {couple.girlfriend}
            </h1>
            
            <h2 className="text-lg md:text-2xl text-purple-200/80 font-serif italic mb-6">
              {couple.tagline}
            </h2>
            
            <p className="max-w-xl mx-auto text-purple-200/60 leading-relaxed">
              A tiny place on the internet where our memories live forever.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 mt-6 mb-8 md:mb-12"
          >
            <a href="#counter" className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" /> Open Memories
            </a>
            <Link href="/story" className="px-8 py-3 rounded-full glass hover:bg-purple-900/40 text-purple-200 transition-all flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Explore Our Story
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <LoveCapsule />
          </motion.div>
        </section>

        {/* Counter Section */}
        <section id="counter" className="py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <TogetherCounter couple={couple} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-purple-300/50 text-sm md:text-base max-w-md mx-auto italic font-serif">
              {gapDays} days from our first date to becoming us. 💜 <br/>
              Somewhere in those {gapDays} days, everything changed.
            </p>
          </motion.div>
        </section>

        {/* Daily Surprises Section */}
        <section className="py-20 relative z-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <LoveMailbox letters={letters} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TodayNote notes={dailyNotes} />
            </motion.div>
          </div>
        </section>

        {/* Hold My Heart Section */}
        <section className="py-20">
          <HoldMyHeart />
        </section>

        {/* Up Next & Previews */}
        <section className="py-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 w-full flex justify-center"
          >
            <NextSpecialMoment specialDates={specialDates} couple={couple} />
          </motion.div>

          <MemoryPreview memories={memories} />
        </section>
        
        {/* Constellation Easter Egg Hook (Optional, maybe an absolutely positioned element in the background) */}
        <div className="fixed bottom-10 left-10 w-24 h-24 opacity-0 hover:opacity-100 transition-opacity duration-1000 z-50 pointer-events-none md:pointer-events-auto">
          {/* A tiny subtle area that when hovered reveals the constellation logic. For now, keeping it minimal */}
        </div>
      </div>
    </>
  );
}
