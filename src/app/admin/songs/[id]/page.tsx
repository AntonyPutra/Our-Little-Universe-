import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { EditSongForm } from "./EditSongForm";
import { getSession } from "@/lib/auth";

export default async function EditSongPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  
  const song = await prisma.song.findUnique({
    where: { id }
  });

  if (!song) {
    notFound();
  }

  return <EditSongForm song={song} />;
}
