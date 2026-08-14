import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { EditLetterForm } from "./EditLetterForm";
import { getSession } from "@/lib/auth";

export default async function EditLetterPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  
  const letter = await prisma.letter.findUnique({
    where: { id }
  });

  if (!letter) {
    notFound();
  }

  return <EditLetterForm letter={letter} />;
}
