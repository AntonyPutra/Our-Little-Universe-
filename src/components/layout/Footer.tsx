import { couple } from "@/data/couple";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-8 mt-auto z-10 text-center text-sm text-purple-300/50">
      <div className="flex flex-col items-center justify-center gap-2">
        <p>
          Made with too much love by {couple.boyfriend}, for {couple.girlfriend}. 💜
        </p>
        <p className="font-serif tracking-widest text-xs opacity-70">
          P × V — Our Little Universe © {year}
        </p>
      </div>
    </footer>
  );
}
