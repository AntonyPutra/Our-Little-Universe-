import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logout } from "./actions";
import Link from "next/link";
import { Heart, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const isAuth = !!session;

  return (
    <div className="min-h-screen bg-[#050308] text-white font-sans selection:bg-purple-500/30">
      {isAuth && (
        <header className="border-b border-purple-500/10 sticky top-0 z-50 backdrop-blur-md bg-[#050308]/80">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="font-serif text-lg text-purple-300 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                Our Space
              </Link>
              <nav className="hidden md:flex items-center gap-4 text-sm text-purple-300/60">
                <Link href="/admin/memories" className="hover:text-purple-200 transition-colors">Memories</Link>
                <Link href="/admin/dates" className="hover:text-purple-200 transition-colors">Dates</Link>
                <Link href="/admin/songs" className="hover:text-purple-200 transition-colors">Songs</Link>
                <Link href="/admin/letters" className="hover:text-purple-200 transition-colors">Letters</Link>
                <Link href="/admin/more" className="hover:text-purple-200 transition-colors">Notes</Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <a href="/" target="_blank" className="text-xs text-purple-400/50 hover:text-purple-300 transition-colors">
                View Site ↗
              </a>
              <form action={logout}>
                <button type="submit" className="p-2 rounded-full hover:bg-purple-500/10 text-purple-400/50 hover:text-purple-300 transition-colors" title="Lock Our Space">
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </header>
      )}

      {/* Mobile sub-nav when authenticated */}
      {isAuth && (
        <div className="md:hidden border-b border-purple-500/10 bg-[#050308]/80 overflow-x-auto whitespace-nowrap px-4 py-2 flex gap-4 text-sm text-purple-300/60">
          <Link href="/admin/memories" className="hover:text-white py-1">Memories</Link>
          <Link href="/admin/dates" className="hover:text-white py-1">Dates</Link>
          <Link href="/admin/songs" className="hover:text-white py-1">Songs</Link>
          <Link href="/admin/letters" className="hover:text-white py-1">Letters</Link>
          <Link href="/admin/more" className="hover:text-white py-1">Notes & More</Link>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
