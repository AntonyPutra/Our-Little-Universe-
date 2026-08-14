"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createLetter(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const letterType = formData.get("letterType") as string;
  const fromAuthor = formData.get("fromAuthor") as string;
  const toAuthor = formData.get("toAuthor") as string;
  const dateStr = formData.get("date") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const isPublished = formData.get("isPublished") !== "false";
  
  await prisma.letter.create({
    data: {
      title,
      content,
      letterType: letterType || "regular",
      fromAuthor: fromAuthor || null,
      toAuthor: toAuthor || null,
      date: dateStr ? new Date(dateStr) : null,
      isFeatured,
      isPublished,
    }
  });

  redirect("/admin/letters");
}

export async function updateLetter(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const letterType = formData.get("letterType") as string;
  const fromAuthor = formData.get("fromAuthor") as string;
  const toAuthor = formData.get("toAuthor") as string;
  const dateStr = formData.get("date") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const isPublished = formData.get("isPublished") !== "false";
  
  await prisma.letter.update({
    where: { id },
    data: {
      title,
      content,
      letterType: letterType || "regular",
      fromAuthor: fromAuthor || null,
      toAuthor: toAuthor || null,
      date: dateStr ? new Date(dateStr) : null,
      isFeatured,
      isPublished,
    }
  });

  redirect("/admin/letters");
}

export async function deleteLetter(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.letter.delete({
    where: { id }
  });

  redirect("/admin/letters");
}
