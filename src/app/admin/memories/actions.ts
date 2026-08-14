"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";



export async function createMemory(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const dateStr = formData.get("date") as string;
  const caption = formData.get("caption") as string;
  const story = formData.get("story") as string;
  const location = formData.get("location") as string;
  const category = formData.get("category") as string || "Random";
  const isFavorite = formData.get("isFavorite") === "on";
  const isPublished = formData.get("isPublished") !== "false";
  
  const mediaUrlsStr = formData.get("mediaUrls") as string;
  const mediaUrls = mediaUrlsStr ? JSON.parse(mediaUrlsStr) : [];

  const memory = await prisma.memory.create({
    data: {
      title,
      date: dateStr ? new Date(dateStr) : null,
      caption,
      story,
      location,
      category,
      isFavorite,
      isPublished,
      media: {
        create: mediaUrls.map((m: any, idx: number) => ({
          filePath: m.url,
          mediaType: m.mimeType?.startsWith("video/") ? "video" : "image",
          mimeType: m.mimeType,
          sortOrder: idx
        }))
      }
    }
  });

  redirect("/admin/memories");
}

export async function updateMemory(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const dateStr = formData.get("date") as string;
  const caption = formData.get("caption") as string;
  const story = formData.get("story") as string;
  const location = formData.get("location") as string;
  const category = formData.get("category") as string || "Random";
  const isFavorite = formData.get("isFavorite") === "on";
  const isPublished = formData.get("isPublished") !== "false";

  const mediaUrlsStr = formData.get("mediaUrls") as string;
  const mediaUrls = mediaUrlsStr ? JSON.parse(mediaUrlsStr) : [];

  await prisma.memory.update({
    where: { id },
    data: {
      title,
      date: dateStr ? new Date(dateStr) : null,
      caption,
      story,
      location,
      category,
      isFavorite,
      isPublished,
      // For simplicity in this edit, we delete existing media and recreate.
      // In a more robust system, we would do a diff.
      media: {
        deleteMany: {},
        create: mediaUrls.map((m: any, idx: number) => ({
          filePath: m.url,
          mediaType: m.mimeType?.startsWith("video/") ? "video" : "image",
          mimeType: m.mimeType,
          sortOrder: idx
        }))
      }
    }
  });

  redirect("/admin/memories");
}

export async function deleteMemory(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.memory.delete({
    where: { id }
  });

  redirect("/admin/memories");
}
