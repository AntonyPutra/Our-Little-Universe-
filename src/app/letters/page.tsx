import prisma from "@/lib/prisma";
import { ClientLetters } from "./ClientLetters";



export default async function LettersPage() {
  const dbLetters = await prisma.letter.findMany({
    where: { isPublished: true },
    orderBy: { date: 'desc' }
  });

  const letters = dbLetters.map(l => ({
    id: l.id,
    title: l.title,
    date: l.date ? l.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null,
    content: l.content.split('\n\n'), // Simple split by double newline
    isSpecial: l.isFeatured
  }));

  return <ClientLetters letters={letters} />;
}
