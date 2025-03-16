"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import BackButton from "@/app/(components)/BackButton";
import DetailsCard from "@/app/(components)/DetailsCard";
import { ItemCardProps } from "@/app/(components)/ItemCard";
import gryffindorBackdrop from "@/app/assets/Gryffindor-backdrop.svg";
import gryffindorTag from "@/app/assets/Gryffindor-tag.svg";
import hufflepuffBackdrop from "@/app/assets/Hufflepuff-backdrop.svg";
import hufflepuffTag from "@/app/assets/Hufflepuff-tag.svg";
import ravenclawBackdrop from "@/app/assets/Ravenclaw-backdrop.svg";
import ravenclawTag from "@/app/assets/Ravenclaw-tag.svg";
import slytherinBackdrop from "@/app/assets/Slytherin-backdrop.svg";
import slytherinTag from "@/app/assets/Slytherin-tag.svg";

const backdropImages = {
  Gryffindor: gryffindorBackdrop,
  Hufflepuff: hufflepuffBackdrop,
  Ravenclaw: ravenclawBackdrop,
  Slytherin: slytherinBackdrop,
};

const tagImages = {
  Gryffindor: gryffindorTag,
  Hufflepuff: hufflepuffTag,
  Ravenclaw: ravenclawTag,
  Slytherin: slytherinTag,
};

export default function CharacterDetails() {
  const searchParams = useSearchParams();
  const [character, setCharacter] = useState<ItemCardProps["fullInfo"]>(
    {} as ItemCardProps["fullInfo"],
  );

  useEffect(() => {
    setCharacter({
      id: searchParams.get("id") || "",
      name: searchParams.get("name") || "",
      alternate_names: [],
      species: searchParams.get("species") || "",
      gender: searchParams.get("gender") || "",
      house: searchParams.get("house") || "",
      dateOfBirth: searchParams.get("dateOfBirth") || "",
      yearOfBirth: Number(searchParams.get("yearOfBirth")) || 0,
      wizard: searchParams.get("wizard") === "true",
      ancestry: searchParams.get("ancestry") || "",
      eyeColour: searchParams.get("eyeColour") || "",
      hairColour: searchParams.get("hairColour") || "",
      wand: {
        wood: "",
        core: "",
        length: 0,
      },
      patronus: searchParams.get("patronus") || "",
      hogwartsStudent: searchParams.get("hogwartsStudent") === "true",
      hogwartsStaff: searchParams.get("hogwartsStaff") === "true",
      actor: searchParams.get("actor") || "",
      alternate_actors: [],
      alive: searchParams.get("alive") === "true",
      image: searchParams.get("image") || "",
    });
  }, [searchParams]);

  return (
    <main className="relative flex h-dvh justify-center items-center">
      <BackButton />
      <div>{character.name ? <DetailsCard character={character} /> : null}</div>
      {character.house ? (
        <Image
          alt={`Background ${character.house}`}
          className="absolute z-[-1]"
          fill
          objectFit="cover"
          src={backdropImages[character.house as keyof typeof backdropImages]}
        />
      ) : null}
      {character.house ? (
        <Image
          alt={`House ${character.house}`}
          className="absolute top-0 right-0"
          height={200}
          src={tagImages[character.house as keyof typeof tagImages]}
          width={40}
        />
      ) : null}
    </main>
  );
}
