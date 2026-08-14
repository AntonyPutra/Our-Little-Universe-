import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { EditDateForm } from "./EditDateForm";
import { getSession } from "@/lib/auth";

export default async function EditDatePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  
  const date = await prisma.specialDate.findUnique({
    where: { id }
  });

  if (!date) {
    notFound();
  }

  return <EditDateForm date={date} />;
}
