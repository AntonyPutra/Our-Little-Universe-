"use client";

import { motion } from "framer-motion";
import { Memory } from "@/components/gallery/GalleryGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MemoryPreview({ memories }: { memories: Memory[] }) {
  // Take first 3 memories for preview
  const previewMemories = memories.slice(0, 3);
  
  // Angles for the polaroid effect
  const angles = [-2, 1, -1];

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">Little Pieces of Us</h3>
          <p className="text-purple-200/60 text-sm">Glimpses into our favorite moments.</p>
        </div>
        <Link 
          href="/gallery" 
          className="group mt-4 md:mt-0 flex items-center gap-2 text-sm text-purple-300 hover:text-white transition-colors"
        >
          Open Gallery
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 px-4 md:px-0">
        {previewMemories.map((memory, idx) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ 
              y: -10, 
              rotate: 0, 
              scale: 1.02,
              boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.3)" 
            }}
            className="bg-white p-3 pb-8 rounded-sm shadow-xl relative cursor-pointer mx-auto w-[250px] md:w-full"
            style={{ 
              rotate: `${angles[idx]}deg`,
              boxShadow: "0 10px 20px -5px rgba(0,0,0,0.5)"
            }}
          >
            <div className="aspect-[4/5] bg-purple-900/10 w-full overflow-hidden border border-purple-500/10 rounded-sm">
              {memory.photos.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={memory.photos[0]} 
                  alt={memory.caption ?? undefined} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-purple-800/20 p-4 text-center">
                  <span className="text-sm">Photo goes here</span>
                  <span className="text-xs mt-2 font-mono">public/images/gallery/</span>
                </div>
              )}
            </div>
            <p className="font-handwriting text-xl text-black mt-4 text-center">
              {memory.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
