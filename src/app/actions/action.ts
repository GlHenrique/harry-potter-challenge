"use server";

import { cookies } from "next/headers";

export async function setHouse(value: string) {
  const expiresIn = new Date();
  expiresIn.setDate(expiresIn.getDate() + 2); // 2 days expiration
  const cookieStore = await cookies();

  cookieStore.set("my-house", value, {
    expires: expiresIn,
  });
}

export async function getHouse() {
  const cookieStore = await cookies();

  return cookieStore.get("my-house");
}

export async function setFavorites(value: string[]) {
  const expiresIn = new Date();
  expiresIn.setDate(expiresIn.getDate() + 2); // 2 days expiration
  const cookieStore = await cookies();

  cookieStore.set("favorites", value.join(), {
    expires: expiresIn,
  });
}

export async function getFavorites() {
  const cookieStore = await cookies();

  return cookieStore.get("favorites");
}
