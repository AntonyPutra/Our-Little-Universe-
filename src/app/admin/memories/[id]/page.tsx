import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditMemoryForm } from "./EditMemoryForm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EditMemoryPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  
  const memory = await prisma.memory.findUnique({
    where: { id },
    include: {
      media: {
        orderBy: { sortOrder: 'asc' }
      }
    }
  });

  if (!memory) {
    notFound();
  }

  return <EditMemoryForm memory={memory} />;
}
