"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookHeart, CalendarHeart, Image as ImageIcon, Mail, Sparkles, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { OurSpaceUnlockModal } from "./OurSpaceUnlockModal";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/story", label: "Story", icon: BookHeart },
  { path: "/dates", label: "Dates", icon: CalendarHeart },
  { path: "/gallery", label: "Gallery", icon: ImageIcon },
  { path: "/letters", label: "Letters", icon: Mail },
  { path: "/more", label: "More", icon: Sparkles },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showUnlock, setShowUnlock] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check session status on mount (no-flash, client-side)
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

  const handleOurSpace = () => {
    if (isAuthenticated) {
      router.push("/admin");
    } else {
      setShowUnlock(true);
    }
  };

  return (
    <>
      {/* Desktop-only floating pill navigation — z-40 */}
      <div className="fixed top-5 left-0 right-0 z-40 hidden md:flex justify-center px-4 pointer-events-none">
        <nav className="glass-nav px-4 py-2.5 rounded-full flex items-center gap-1 pointer-events-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative px-3 py-2 text-sm font-medium transition-colors rounded-full"
              >
                <span
                  className={cn(
                    "relative z-10 flex items-center gap-1.5",
                    isActive ? "text-white" : "text-purple-200/60 hover:text-white"
                  )}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-purple-500/20 rounded-full"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-4 bg-purple-500/20 mx-1" />

          {/* Our Space button */}
          <button
            onClick={handleOurSpace}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full text-pink-400/80 hover:text-pink-300 hover:bg-pink-500/10 transition-all"
            title="Our Space — manage our universe"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Our Space</span>
          </button>
        </nav>
      </div>

      {/* Our Space unlock modal */}
      <OurSpaceUnlockModal
        isOpen={showUnlock}
        onClose={() => setShowUnlock(false)}
        onUnlocked={() => {
          setShowUnlock(false);
          setIsAuthenticated(true);
          router.push("/admin");
        }}
      />
    </>
  );
}
