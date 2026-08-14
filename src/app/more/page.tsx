import prisma from "@/lib/prisma";
import { ClientMore } from "./ClientMore";



export default async function MorePage() {
  const [
    dbJarNotes,
    dbLoveReasons,
    dbSongs,
    dbDreams,
    dbAdventures
  ] = await Promise.all([
    prisma.jarNote.findMany({ where: { isPublished: true } }),
    prisma.loveReason.findMany({ where: { isPublished: true } }),
    prisma.song.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.dream.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.adventure.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } })
  ]);

  const jarNotes = dbJarNotes.map(n => n.content);
  const loveReasons = dbLoveReasons.map(r => r.content);

  return (
    <ClientMore 
      jarNotes={jarNotes}
      loveReasons={loveReasons}
      songs={dbSongs}
      dreams={dbDreams}
      adventures={dbAdventures}
    />
  );
}
