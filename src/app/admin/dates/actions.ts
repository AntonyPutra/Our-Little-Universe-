"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createDate(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const dateStr = formData.get("date") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string || "Heart";
  const recurringYearly = formData.get("recurringYearly") === "on";
  const isPublished = formData.get("isPublished") !== "false";
  
  await prisma.specialDate.create({
    data: {
      title,
      date: new Date(dateStr),
      type: type || null,
      description: description || null,
      icon,
      recurringYearly,
      isPublished,
    }
  });

  redirect("/admin/dates");
}

export async function updateDate(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const dateStr = formData.get("date") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string || "Heart";
  const recurringYearly = formData.get("recurringYearly") === "on";
  const isPublished = formData.get("isPublished") !== "false";
  
  await prisma.specialDate.update({
    where: { id },
    data: {
      title,
      date: new Date(dateStr),
      type: type || null,
      description: description || null,
      icon,
      recurringYearly,
      isPublished,
    }
  });

  redirect("/admin/dates");
}

export async function deleteDate(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.specialDate.delete({
    where: { id }
  });

  redirect("/admin/dates");
}
