"use server";

import { destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function unlock(prevState: any, formData: FormData) {
  const passcode = formData.get("passcode") as string;

  if (!passcode) {
    return { error: "Please enter the passcode." };
  }

  try {
    const { fetchApi } = await import('@/lib/api/client');
    const res = await fetchApi('/auth/unlock', {
        method: 'POST',
        body: JSON.stringify({ passcode }),
    });

    if (res.error) {
      return { error: res.error };
    }
  } catch (error) {
    console.error("Unlock error:", error);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
