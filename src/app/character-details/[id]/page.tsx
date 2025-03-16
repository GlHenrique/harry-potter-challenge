"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { ItemCardProps } from "@/app/(components)/ItemCard";

export default function Test() {
  const searchParams = useSearchParams();
  const [character, setCharacter] = useState<ItemCardProps>(
    {} as ItemCardProps,
  );

  useEffect(() => {
    setCharacter({
      name: searchParams.get("name") || "",
      realName: searchParams.get("realName") || "",
      image: searchParams.get("image") || "",
      house: searchParams.get("house") || "",
      gender: searchParams.get("gender") || "",
      patronus: searchParams.get("patronus") || "",
    });
  }, [searchParams]);

  return <pre>{character.name}</pre>;
}
