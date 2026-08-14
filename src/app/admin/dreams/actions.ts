"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createDream(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") as string;
  const isPublished = formData.get("isPublished") !== "false";
  
  await prisma.dream.create({
    data: {
      title,
      description: description || null,
      category: category || null,
      status: status || "Dreaming",
      isPublished,
    }
  });

  redirect("/admin/dreams");
}

export async function updateDream(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") as string;
  const isPublished = formData.get("isPublished") !== "false";
  
  await prisma.dream.update({
    where: { id },
    data: {
      title,
      description: description || null,
      category: category || null,
      status: status || "Dreaming",
      isPublished,
    }
  });

  redirect("/admin/dreams");
}

export async function deleteDream(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.dream.delete({
    where: { id }
  });

  redirect("/admin/dreams");
}
