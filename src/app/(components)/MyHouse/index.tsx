"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { getHouse, setHouse } from "@/app/actions/action";
import { tagImages } from "@/app/constants";

const options = [
  { label: "Gryffindor", value: "Gryffindor", color: "text-amber-400" },
  { label: "Hufflepuff", value: "Hufflepuff", color: "text-amber-900" },
  { label: "Ravenclaw", value: "Ravenclaw", color: "text-cyan-500" },
  { label: "Slytherin", value: "Slytherin", color: "text-green-600" },
];

export default function MyHouse({ house }: { house: string }) {
  const [value, setValue] = useState(house || "Gryffindor");

  const handleGetStoredHouse = useCallback(async () => {
    const storedHouse = await getHouse();

    if (storedHouse?.value) {
      setValue(storedHouse?.value);
    }
  }, []);

  const handleSetHouse = useCallback((option: string) => {
    setValue(option);
    setHouse(option);
  }, []);

  useEffect(() => {
    void handleGetStoredHouse();
  }, [handleGetStoredHouse]);

  return (
    <div className="flex mr-8">
      <label className="mr-1">My House:</label>
      <select
        className={`${options.find((option) => option.value === value)?.color}`}
        id="filter"
        name="filter"
        onChange={(e) => handleSetHouse(e.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Image
        alt="My favorite house"
        className="topToEnter absolute top-0 right-0"
        height={200}
        key={house}
        src={tagImages[house as keyof typeof tagImages]}
        width={40}
      />
    </div>
  );
}
