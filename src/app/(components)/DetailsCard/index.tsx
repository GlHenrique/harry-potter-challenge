import Image from "next/image";

import fallbackCard from "@/app/assets/fallback-card.jpeg";

import { ItemCardProps } from "../ItemCard";

export default function DetailsCard({
  character,
}: {
  character: ItemCardProps["fullInfo"];
}) {
  return (
    <div
      className="
      flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl"
    >
      <Image
        alt={`Character ${character.name}`}
        className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        height={200}
        src={character.image || fallbackCard}
        width={150}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight ">
          {character.name}
        </h5>
        <h6 className="font-semibold text-base line-clamp-1">
          {character.actor || "No real name"}
        </h6>
        <p className="font-normal text-gray-700">
          House · {character.house || "none"}
        </p>
        <p className="font-normal text-gray-700">
          Gender · {character.gender || "none"}
        </p>
        <p className="font-normal text-gray-700">
          Patronus · {character.patronus || "none"}
        </p>
        <p className="font-normal text-gray-700">
          Birth · {character.dateOfBirth || "none"}
        </p>
        <p className="font-normal text-gray-700">
          Alive · {character.alive ? "Yes" : "No"}
        </p>
        <p className="font-normal text-gray-700">
          Ancestry · {character.ancestry || "Not informed"}
        </p>
      </div>
    </div>
  );
}
