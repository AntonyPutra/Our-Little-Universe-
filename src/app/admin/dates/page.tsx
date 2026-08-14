import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { CalendarHeart, Plus, Edit } from "lucide-react";

export default async function DatesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const dates = await prisma.specialDate.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white flex items-center gap-3">
            <CalendarHeart className="w-8 h-8 text-pink-400" />
            Special Dates
          </h1>
          <p className="text-pink-300/50 mt-1">Manage anniversaries, birthdays, and milestones.</p>
        </div>
        <Link 
          href="/admin/dates/new" 
          className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 w-fit"
        >
          <Plus className="w-5 h-5" /> Add Date
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dates.map(date => (
          <div key={date.id} className="bg-white/[0.02] border border-pink-500/10 rounded-2xl p-5 hover:border-pink-500/30 transition-colors relative group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-medium">{date.title}</h3>
                <p className="text-pink-300/60 text-sm mt-1">
                  {new Date(date.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded-full">{date.type}</span>
                  {date.recurringYearly && <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">Yearly</span>}
                </div>
              </div>
            </div>
            
            <Link href={`/admin/dates/${date.id}`} className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-pink-300 opacity-0 group-hover:opacity-100 transition-all">
              <Edit className="w-4 h-4" />
            </Link>
          </div>
        ))}
        {dates.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-pink-500/20 rounded-2xl">
            <CalendarHeart className="w-8 h-8 text-pink-500/30 mx-auto mb-3" />
            <p className="text-pink-300/50">No special dates added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
