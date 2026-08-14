import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Sparkles, Plus, Edit } from "lucide-react";

export default async function DreamsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const dreams = await prisma.dream.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-fuchsia-400" />
            Our Dreams
          </h1>
          <p className="text-fuchsia-300/50 mt-1">Manage bucket list items, goals, and dreams.</p>
        </div>
        <Link 
          href="/admin/dreams/new" 
          className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 w-fit"
        >
          <Plus className="w-5 h-5" /> Add Dream
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dreams.map(dream => (
          <div key={dream.id} className="bg-white/[0.02] border border-fuchsia-500/10 rounded-2xl p-5 hover:border-fuchsia-500/30 transition-colors relative group">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white font-medium line-clamp-1 pr-8">{dream.title}</h3>
              <Link href={`/admin/dreams/${dream.id}`} className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-fuchsia-300 opacity-0 group-hover:opacity-100 transition-all">
                <Edit className="w-4 h-4" />
              </Link>
            </div>
            {dream.description && (
              <p className="text-fuchsia-300/60 text-sm line-clamp-2 mb-4">{dream.description}</p>
            )}
            <div className="flex gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                dream.status === 'Done' ? 'bg-emerald-500/10 text-emerald-400' :
                dream.status === 'Planned' ? 'bg-amber-500/10 text-amber-400' :
                'bg-fuchsia-500/10 text-fuchsia-400'
              }`}>
                {dream.status}
              </span>
              {dream.category && <span className="text-[10px] bg-white/5 text-zinc-400 px-2 py-0.5 rounded-full">{dream.category}</span>}
            </div>
          </div>
        ))}
        {dreams.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-fuchsia-500/20 rounded-2xl">
            <Sparkles className="w-8 h-8 text-fuchsia-500/30 mx-auto mb-3" />
            <p className="text-fuchsia-300/50">No dreams added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
