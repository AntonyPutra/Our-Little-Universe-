"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryModal } from "./MemoryModal";
import { Heart } from "lucide-react";

export type Memory = {
  id: string;
  category: string;
  caption: string | null;
  date: Date | string | null;
  location?: string | null;
  story?: string | null;
  isFavorite: boolean;
  photos: string[];
  layoutHint?: "tall" | "wide" | "normal";
};

export function GalleryGrid({ memories }: { memories: Memory[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Extract unique categories
  const memoryCategories = Array.from(new Set(memories.map(m => m.category)));
  const filterOptions = ["All", "Favorites", ...memoryCategories];

  const handleNext = () => {
    if (!selectedMemory) return;
    const currentList = getFilteredList();
    const currentIndex = currentList.findIndex(m => m.id === selectedMemory.id);
    if (currentIndex < currentList.length - 1) {
      setSelectedMemory(currentList[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!selectedMemory) return;
    const currentList = getFilteredList();
    const currentIndex = currentList.findIndex(m => m.id === selectedMemory.id);
    if (currentIndex > 0) {
      setSelectedMemory(currentList[currentIndex - 1]);
    }
  };

  const getFilteredList = () => {
    return memories.filter(m => {
      if (filter === "All") return true;
      if (filter === "Favorites") return m.isFavorite;
      return m.category === filter;
    });
  };

  const renderGrid = (items: Memory[]) => (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
      <AnimatePresence>
        {items.map((memory, index) => (
          <motion.div
            layoutId={`memory-${memory.id}`}
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelectedMemory(memory)}
            className="break-inside-avoid glass-card rounded-2xl overflow-hidden cursor-pointer group relative block"
          >
            {/* Image Container */}
            <div className="w-full relative bg-purple-900/10">
              {memory.photos.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={memory.photos[0]} 
                  alt={memory.caption || "Memory"}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className={`w-full flex flex-col items-center justify-center p-8 text-purple-400/30 font-mono text-sm ${memory.layoutHint === 'tall' ? 'h-64' : memory.layoutHint === 'wide' ? 'h-32' : 'h-48'}`}>
                  <span>Placeholder</span>
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="font-serif text-white text-lg">{memory.caption}</p>
                <p className="text-purple-300/80 text-xs mt-1 uppercase tracking-wider">{memory.category}</p>
              </div>

              {/* Favorite Icon */}
              {memory.isFavorite && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                </div>
              )}
              
              {/* Multiple photos indicator */}
              {memory.photos.length > 1 && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] tracking-widest uppercase">
                  1/{memory.photos.length}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {filterOptions.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === cat 
                ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]" 
                : "bg-purple-500/10 text-purple-200/70 hover:bg-purple-500/20 hover:text-white"
            }`}
          >
            {cat === "Favorites" ? <span className="flex items-center gap-1"><Heart className="w-3 h-3 fill-current" /> Favorites</span> : cat}
          </button>
        ))}
      </div>

      <div className="pb-20">
        {filter === "All" ? (
          <div className="space-y-16">
            {memoryCategories.map(cat => {
              const catMemories = memories.filter(m => m.category === cat);
              if (catMemories.length === 0) return null;
              
              return (
                <div key={cat} className="space-y-6">
                  <h2 className="font-serif text-3xl text-purple-200 border-b border-purple-500/20 pb-2">
                    {cat}
                  </h2>
                  {renderGrid(catMemories)}
                </div>
              );
            })}
          </div>
        ) : (
          renderGrid(getFilteredList())
        )}
        
        {getFilteredList().length === 0 && (
          <div className="text-center py-20 text-purple-300/50 italic font-serif">
            No memories found in this category yet.
          </div>
        )}
      </div>

      {selectedMemory && (
        <MemoryModal 
          memory={selectedMemory} 
          onClose={() => setSelectedMemory(null)} 
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}
