"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { MobileNav } from "./MobileNav";
import { IntroSequence } from "../home/IntroSequence";
import { AnimatePresence } from "framer-motion";

// Desktop navbar sits at top-5 (20px) and is ~48px tall, so content needs at least 20+48+28 = ~96px clearance.
// We use pt-[96px] on md+ to push content below the pill navbar.
// On mobile there is NO top navbar, so we don't add that top padding.
// pb-24 on mobile accounts for the 64px bottom nav bar + safe-area.

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showIntro, setShowIntro] = useState(pathname === "/");

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Navbars — hidden during intro */}
      {!showIntro && <Navbar />}
      {!showIntro && <MobileNav />}

      {/* Page content area
          - Desktop: pt-[96px] clears the fixed pill navbar (top-5 = 20px + ~48px height + ~28px breathing room)
          - Mobile:  pt-6 — no top navbar, just a small breathe
          - Mobile:  pb-24 — clears the 64px bottom bar + safe-area
          - Desktop: no bottom padding needed (no bottom bar)
      */}
      <div
        className={[
          "flex-grow z-10 flex flex-col relative transition-opacity duration-700",
          "pt-6 md:pt-[96px]",          // responsive top offset
          "pb-28 md:pb-0",               // responsive bottom offset for mobile nav
          showIntro ? "opacity-0 h-0 overflow-hidden pointer-events-none" : "opacity-100",
        ].join(" ")}
      >
        {children}
      </div>
    </>
  );
}
