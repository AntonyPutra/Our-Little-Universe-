"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookHeart, Image as ImageIcon, Sparkles, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OurSpaceUnlockModal } from "./OurSpaceUnlockModal";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/story", label: "Story", icon: BookHeart },
  { path: "/gallery", label: "Gallery", icon: ImageIcon },
  { path: "/more", label: "More", icon: Sparkles },
];

const quickAddItems = [
  { label: "Memory", href: "/admin/memories/new", emoji: "📸" },
  { label: "Song", href: "/admin/songs/new", emoji: "🎵" },
  { label: "Letter", href: "/admin/letters/new", emoji: "💌" },
  { label: "Special Date", href: "/admin/dates/new", emoji: "📅" },
  { label: "Little Note", href: "/admin/more", emoji: "📝" },
  { label: "Dream", href: "/admin/dreams/new", emoji: "✨" },
];

export function MobileNav() {
  const pathname = usePathname();
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { fetchApi } = await import('@/lib/api/client');
        const res = await fetchApi("/auth/status");
        if (res.data?.unlocked) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkAuth();
  }, []);

  const handlePlusPress = () => {
    if (isAuthenticated) {
      setShowQuickAdd(true);
    } else {
      setShowUnlock(true);
    }
  };

  return (
    <>
      {/* Quick Add Sheet */}
      <AnimatePresence>
        {showQuickAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-end justify-center px-3"
            style={{ paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 0px))" }}
            onClick={() => setShowQuickAdd(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full max-w-sm bg-gradient-to-b from-purple-900/60 to-[#050308]/98 border border-purple-500/20 rounded-3xl p-5 shadow-[0_0_50px_rgba(147,51,234,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-serif text-xl text-center text-purple-100 mb-5">
                Add to Our Universe 💜
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {quickAddItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setShowQuickAdd(false)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border border-purple-500/10 bg-white/[0.03] hover:bg-purple-500/10 hover:border-purple-500/30 active:scale-95 transition-all"
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm text-purple-200/80 font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Our Space Unlock Modal */}
      <OurSpaceUnlockModal
        isOpen={showUnlock}
        onClose={() => setShowUnlock(false)}
        onUnlocked={() => {
          setShowUnlock(false);
          setIsAuthenticated(true);
          // Seamlessly open Quick Add after unlock
          setShowQuickAdd(true);
        }}
      />

      {/* Fixed Bottom Navigation Bar — mobile only (md:hidden) */}
      <nav
        className="fixed z-[60] md:hidden"
        style={{
          left: "12px",
          right: "12px",
          bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
          background: "rgba(9, 5, 15, 0.98)", // Almost opaque so text behind isn't readable
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(168, 85, 247, 0.22)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
          borderRadius: "1.5rem",
        }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {/* First 2 nav items */}
          {navItems.slice(0, 2).map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-label={item.label}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-w-[52px] touch-manipulation",
                  isActive ? "text-purple-300" : "text-purple-400/40"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </Link>
            );
          })}

          {/* Center + button — elevated */}
          <button
            onClick={handlePlusPress}
            aria-label="Add to Our Universe"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-[0_0_24px_rgba(147,51,234,0.55)] active:scale-95 transition-all touch-manipulation -mt-5"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>

          {/* Last 2 nav items */}
          {navItems.slice(2).map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-label={item.label}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-w-[52px] touch-manipulation",
                  isActive ? "text-purple-300" : "text-purple-400/40"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
