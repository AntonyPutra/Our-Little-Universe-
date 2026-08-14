"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createSong(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const artist = formData.get("artist") as string;
  const spotifyUrl = formData.get("spotifyUrl") as string;
  const youtubeUrl = formData.get("youtubeUrl") as string;
  const note = formData.get("note") as string;
  const isFavorite = formData.get("isFavorite") === "on";
  const isPublished = formData.get("isPublished") !== "false";
  
  // Media URL for cover (optional)
  const coverPath = formData.get("coverPath") as string;

  await prisma.song.create({
    data: {
      title,
      artist,
      spotifyUrl: spotifyUrl || null,
      youtubeUrl: youtubeUrl || null,
      note: note || null,
      isFavorite,
      isPublished,
      coverPath: coverPath || null,
    }
  });

  redirect("/admin/songs");
}

export async function updateSong(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const artist = formData.get("artist") as string;
  const spotifyUrl = formData.get("spotifyUrl") as string;
  const youtubeUrl = formData.get("youtubeUrl") as string;
  const note = formData.get("note") as string;
  const isFavorite = formData.get("isFavorite") === "on";
  const isPublished = formData.get("isPublished") !== "false";
  
  const coverPath = formData.get("coverPath") as string;

  await prisma.song.update({
    where: { id },
    data: {
      title,
      artist,
      spotifyUrl: spotifyUrl || null,
      youtubeUrl: youtubeUrl || null,
      note: note || null,
      isFavorite,
      isPublished,
      ...(coverPath && { coverPath })
    }
  });

  redirect("/admin/songs");
}

export async function deleteSong(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.song.delete({
    where: { id }
  });

  redirect("/admin/songs");
}
