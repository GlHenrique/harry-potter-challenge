import Image from "next/image";

import fallbackCard from "@/app/assets/fallback-card.jpeg";

import "./itemCard.css";

type ItemCardProps = {
  name: string;
  realName: string;
  image: string;
  house: string;
  gender: string;
  patronus: string;
};

export default function ItemCard({
  name,
  realName,
  image,
  house,
  gender,
  patronus,
}: ItemCardProps) {
  return (
    <div className="flex flex-col min-w-[150px] max-w-[200px] card-base">
      <div className="w-[150px] h-[200px]">
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
