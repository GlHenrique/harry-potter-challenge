"use client";

import { Dispatch, SetStateAction, useCallback } from "react";

import { getFavorites, setFavorites } from "@/app/actions/action";
import { CharactersResponse } from "@/app/services/characters/types";

import ItemCard from "../ItemCard";
import LoadingSpinner from "../LoadingSpinner";

type ContentListProps = {
  items: CharactersResponse[];
  setList: Dispatch<SetStateAction<CharactersResponse[]>>;
  loading: boolean;
  selectedFilter: string;
};

export default function ContentList({
  items,
  setList,
  loading,
  selectedFilter,
}: ContentListProps) {
  const handleUpdateContentList = useCallback(async () => {
    const storedFavorite = await getFavorites();
    const favorited = storedFavorite?.value.split(",");
    setList((currentList) =>
      currentList.map((character) => ({
        ...character,
        favorite: favorited?.includes(character.id) || false,
      })),
    );
  }, [setList]);

  const handleAddRemoveFavorite = useCallback(
    async (characterId: string) => {
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
    },
    [handleUpdateContentList],
  );

  return (
    <main className="py-5 px-5">
      <h3 className="text-2xl w-fit mb-5">All {selectedFilter}</h3>
      <LoadingSpinner loading={loading} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 max-[370px]:justify-center">
        {!loading
          ? items.map(
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
            )
          : null}
      </div>
    </main>
  );
}
