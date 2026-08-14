import { fetchApi } from "./api/client";

/** Returns session payload if valid, null otherwise. */
export async function getSession() {
  const res = await fetchApi('/auth/status');
  if (res.data?.unlocked) {
    return { type: "couple_space" };
  }
  return null;
}

export async function destroySession() {
  await fetchApi('/auth/lock', { method: 'POST' });
}
