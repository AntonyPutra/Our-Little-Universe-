import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import { couple } from "@/data/couple";
import { AppWrapper } from "@/components/layout/AppWrapper";
import { StarField } from "@/components/effects/StarField";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Footer } from "@/components/layout/Footer";
import { MusicPlayerProvider } from "@/components/music/MusicPlayerContext";
import { MiniPlayer } from "@/components/music/MiniPlayer";

export const dynamic = 'force-dynamic';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: `${couple.boyfriend} × ${couple.girlfriend} | Our Little Universe`,
  description: couple.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${caveat.variable} antialiased min-h-screen flex flex-col relative`}
      >
        <StarField />
        <CursorGlow />
        
        <MusicPlayerProvider>
          <AppWrapper>
            {children}
          </AppWrapper>
          <MiniPlayer />
          <Footer />
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
