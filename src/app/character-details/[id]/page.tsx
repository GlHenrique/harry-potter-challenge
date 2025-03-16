"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { ItemCardProps } from "@/app/(components)/ItemCard";
import gryffindorBackdrop from "@/app/assets/Gryffindor-backdrop.svg";
import hufflepuffBackdrop from "@/app/assets/Hufflepuff-backdrop.svg";
import ravenclawBackdrop from "@/app/assets/Ravenclaw-backdrop.svg";
import slytherinBackdrop from "@/app/assets/Slytherin-backdrop.svg";

const backdropImages = {
  Gryffindor: gryffindorBackdrop,
  Hufflepuff: hufflepuffBackdrop,
  Ravenclaw: ravenclawBackdrop,
  Slytherin: slytherinBackdrop,
};

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

  return (
    <main>
      {character.house ? (
        <Image
          alt="Test"
          fill
          objectFit="cover"
          src={backdropImages[character.house as keyof typeof backdropImages]}
        />
      ) : null}
    </main>
  );
}
