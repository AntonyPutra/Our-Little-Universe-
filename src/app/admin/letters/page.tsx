import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Mail, Plus, Edit } from "lucide-react";

export default async function LettersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const letters = await prisma.letter.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white flex items-center gap-3">
            <Mail className="w-8 h-8 text-amber-400" />
            Love Letters
          </h1>
          <p className="text-amber-300/50 mt-1">Manage all the long messages and open-when letters.</p>
        </div>
        <Link 
          href="/admin/letters/new" 
          className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 w-fit"
        >
          <Plus className="w-5 h-5" /> Write Letter
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {letters.map(letter => (
          <div key={letter.id} className="bg-white/[0.02] border border-amber-500/10 rounded-2xl p-6 hover:border-amber-500/30 transition-colors relative group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white font-serif text-xl">{letter.title}</h3>
              <Link href={`/admin/letters/${letter.id}`} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-amber-300 opacity-0 group-hover:opacity-100 transition-all">
                <Edit className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-amber-100/70 text-sm line-clamp-3 mb-4 font-serif">
              {letter.content}
            </p>
            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">{letter.letterType}</span>
                {letter.isFeatured && <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>}
              </div>
              <div className="text-xs text-amber-500/50 text-right">
                {letter.fromAuthor && <div>From: {letter.fromAuthor}</div>}
                {letter.date && <div>{new Date(letter.date).toLocaleDateString()}</div>}
              </div>
            </div>
          </div>
        ))}
        {letters.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-amber-500/20 rounded-2xl">
            <Mail className="w-8 h-8 text-amber-500/30 mx-auto mb-3" />
            <p className="text-amber-300/50">No letters written yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
