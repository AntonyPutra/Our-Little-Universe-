import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function AdminMoreFeatures() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const dailyNotes = await prisma.dailyNote.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function addDailyNote(formData: FormData) {
    "use server";
    const content = formData.get("content") as string;
    if (!content) return;

    await prisma.dailyNote.create({
      data: {
        content,
        isPublished: true,
      },
    });

    revalidatePath("/admin/more");
    revalidatePath("/"); // revalidate homepage where notes are shown
  }

  async function togglePublishStatus(id: string, currentStatus: boolean) {
    "use server";
    await prisma.dailyNote.update({
      where: { id },
      data: { isPublished: !currentStatus },
    });
    revalidatePath("/admin/more");
    revalidatePath("/");
  }

  async function deleteNote(id: string) {
    "use server";
    await prisma.dailyNote.delete({
      where: { id },
    });
    revalidatePath("/admin/more");
    revalidatePath("/");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">More Features</h1>
        <p className="text-zinc-400">Manage Daily Notes, Love Reasons, and more.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xl font-serif font-bold text-white mb-6">Today's Little Notes</h2>
        
        <form action={addDailyNote} className="mb-8 flex gap-4">
          <input 
            name="content" 
            placeholder="Add a new daily note (e.g., 'You look beautiful today')..."
            className="flex-grow bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            required
            autoComplete="off"
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Add Note
          </button>
        </form>

        <div className="space-y-4">
          {dailyNotes.length === 0 ? (
            <p className="text-zinc-500 text-sm">No daily notes yet.</p>
          ) : (
            dailyNotes.map((note) => (
              <div key={note.id} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800/80 rounded-xl">
                <p className="text-zinc-300">"{note.content}"</p>
                
                <div className="flex items-center gap-4">
                  <form action={async () => { "use server"; await togglePublishStatus(note.id, note.isPublished); }}>
                    <button 
                      type="submit" 
                      className={`text-xs px-3 py-1 rounded-full ${note.isPublished ? 'bg-green-500/10 text-green-400' : 'bg-zinc-800 text-zinc-400'}`}
                    >
                      {note.isPublished ? 'Published' : 'Hidden'}
                    </button>
                  </form>
                  
                  <form action={async () => { "use server"; await deleteNote(note.id); }}>
                    <button type="submit" className="text-xs text-red-400 hover:text-red-300 transition-colors">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
