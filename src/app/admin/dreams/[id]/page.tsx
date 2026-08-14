import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { EditDreamForm } from "./EditDreamForm";
import { getSession } from "@/lib/auth";

export default async function EditDreamPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  
  const dream = await prisma.dream.findUnique({
    where: { id }
  });

  if (!dream) {
    notFound();
  }

  return <EditDreamForm dream={dream} />;
}
