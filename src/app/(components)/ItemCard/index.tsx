"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import fallbackCard from "@/app/assets/fallback-card.jpeg";
import gryffindor from "@/app/assets/Gryffindor.svg";
import hufflepuff from "@/app/assets/Hufflepuff.svg";
import ravenclaw from "@/app/assets/Ravenclaw.svg";
import slytherin from "@/app/assets/Slytherin.svg";
import { CharactersResponse } from "@/app/services/characters/types";

import Favorite from "../Favorite";

import "./itemCard.css";

export type ItemCardProps = {
  name: string;
  realName: string;
  image: string;
  house: string;
  gender: string;
  patronus: string;
  fullInfo: CharactersResponse;
  onFavorite?: (characterId: string) => void;
};

const houses = {
  Gryffindor: gryffindor,
  Hufflepuff: hufflepuff,
  Ravenclaw: ravenclaw,
  Slytherin: slytherin,
};

export default function ItemCard({
  name,
  realName,
  image,
  house,
  gender,
  patronus,
  fullInfo,
  onFavorite,
}: ItemCardProps) {
  const router = useRouter();

  const handleNavigate = (infos: ItemCardProps) => () => {
    const search = new URLSearchParams(
      infos.fullInfo as unknown as Record<string, string>,
    ).toString();
    router.push(`character-details/${name}?${search}`);
  };

  return (
    <div
      className="flex flex-col min-w-[150px] max-w-[200px] card-base"
      onClick={handleNavigate({
        name,
        realName,
        image,
        house,
        gender,
        patronus,
        fullInfo,
      })}
    >
      <div className="relative w-[150px] h-[200px]">
        {house ? (
          <span className="absolute left-2 top-2">
            <Image
              alt={`House: ${house}`}
              height={5}
              src={houses[house as keyof typeof houses]}
              width={10}
            />
          </span>
        ) : null}
        <Favorite
          favorite={fullInfo.favorite}
          onClick={() => onFavorite?.(fullInfo.id)}
        />
        <Image
          alt={`character-${name}`}
          className="rounded max-h-[200px] h-[200px]"
          height={200}
          src={image || fallbackCard}
          width={150}
        />
      </div>
      <div className="flex flex-col">
        <h4 className="font-bold text-xl line-clamp-2">{name}</h4>
        <h5 className="font-semibold text-base line-clamp-1">
          {realName || "none"}
        </h5>
      </div>
      <div className="flex flex-col">
        <p className="text-sm uppercase font-extralight">
          House · {house || "none"}
        </p>
        <p className="text-sm uppercase font-extralight">
          Gender · {gender || "none"}
        </p>
        <p className="text-sm uppercase font-extralight line-clamp-1">
          Patronus · {patronus || "none"}
        </p>
      </div>
    </div>
  );
}
