"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Memory } from "./GalleryGrid";
import { X, Heart, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface MemoryModalProps {
  memory: Memory;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function MemoryModal({ memory, onClose, onNext, onPrev }: MemoryModalProps) {
  const [photoIndex, setPhotoIndex] = useState(0);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex < memory.photos.length - 1) {
      setPhotoIndex(prev => prev + 1);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) {
      setPhotoIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          layoutId={`memory-${memory.id}`}
          onClick={(e) => e.stopPropagation()}
          className="bg-background-mid w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col md:flex-row border border-purple-500/20 shadow-2xl relative"
        >
          {/* Previous Memory Button (Global) */}
          <button onClick={onPrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 z-50 hidden md:flex border border-white/10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Next Memory Button (Global) */}
          <button onClick={onNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 z-50 hidden md:flex border border-white/10">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo Area */}
          <div className="w-full md:w-3/5 bg-black relative flex items-center justify-center min-h-[40vh] md:min-h-[auto]">
            {memory.photos.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photoIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={memory.photos[photoIndex]}
                    alt={memory.caption ?? undefined}
                    className="max-w-full max-h-[50vh] md:max-h-[90vh] object-contain"
                  />
                </AnimatePresence>
                
                {memory.photos.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                    {memory.photos.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setPhotoIndex(idx); }}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === photoIndex ? 'bg-white' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
                )}
                
                {photoIndex > 0 && (
                  <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white md:hidden">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                
                {photoIndex < memory.photos.length - 1 && (
                  <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white md:hidden">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </>
            ) : (
              <div className="text-purple-300/30 font-mono text-sm">No photo available</div>
            )}
          </div>

          {/* Details Area */}
          <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[40vh] md:max-h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                {memory.category}
              </span>
              {memory.isFavorite && <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />}
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-white mb-6">
              {memory.caption}
            </h3>

            <div className="space-y-4 mb-8">
              {memory.date && (
                <div className="flex items-center gap-3 text-purple-200/70 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(memory.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              )}
              {memory.location && (
                <div className="flex items-center gap-3 text-purple-200/70 text-sm">
                  <MapPin className="w-4 h-4" />
                  {memory.location}
                </div>
              )}
            </div>

            {memory.story && (
              <div className="mt-auto">
                <p className="text-purple-100/60 leading-relaxed text-sm italic font-serif border-l-2 border-purple-500/30 pl-4">
                  "{memory.story}"
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
