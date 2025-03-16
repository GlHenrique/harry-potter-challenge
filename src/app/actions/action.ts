"use server";

import { cookies } from "next/headers";

export async function setHouse(value: string) {
  const cookieStore = await cookies();

  cookieStore.set("my-house", value);
}

export async function getHouse() {
  const cookieStore = await cookies();

  return cookieStore.get("my-house");
}

export async function setFavorites(value: string[]) {
  const cookieStore = await cookies();

  cookieStore.set("favorites", value.join());
}

export async function getFavorites() {
  const cookieStore = await cookies();

  return cookieStore.get("favorites");
}
