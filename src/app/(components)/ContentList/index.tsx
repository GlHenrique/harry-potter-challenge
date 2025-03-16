"use client";

import { Dispatch, SetStateAction, useCallback } from "react";

import { getFavorites, setFavorites } from "@/app/actions/action";
import { CharactersResponse } from "@/app/services/characters/types";

import ItemCard from "../ItemCard";

type ContentListProps = {
  items: CharactersResponse[];
  setList: Dispatch<SetStateAction<CharactersResponse[]>>;
};

export default function ContentList({ items, setList }: ContentListProps) {
  const handleAddRemoveFavorite = useCallback(async (characterId: string) => {
    const storedFavorite = await getFavorites();
    if (storedFavorite?.value.split(",").includes(characterId)) {
      // Remove Favorite
      setFavorites(
        storedFavorite.value
          .split(",")
          .filter((value) => value !== characterId),
      );
      await handleUpdateContentList();
      return;
    }
    // Add favorite
    await setFavorites(
      storedFavorite?.value
        ? [storedFavorite?.value, characterId]
        : [characterId],
    );
    await handleUpdateContentList();
  }, []);

  const handleUpdateContentList = async () => {
    const storedFavorite = await getFavorites();
    const favorited = storedFavorite?.value.split(",");
    setList((currentList) =>
      currentList.map((character) => ({
        ...character,
        favorite: favorited?.includes(character.id),
      })),
    );
  };

  return (
    <main className="py-5 px-5">
      <h3 className="text-2xl w-fit mb-5">All characters</h3>
      <div className="flex flex-wrap gap-x-4 gap-y-8">
        {items.map(
          ({ id, name, gender, house, patronus, actor, image }, index) => (
            <ItemCard
              fullInfo={items[index]}
              gender={gender}
              house={house}
              image={image}
              key={id}
              name={name}
              onFavorite={handleAddRemoveFavorite}
              patronus={patronus}
              realName={actor}
            />
          ),
        )}
      </div>
    </main>
  );
}
