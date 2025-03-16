"use client";

import { useEffect } from "react";

import ContentList from "../ContentList";

import useHomeContent from "./hooks/useHomeContent";
import Filter from "../Filter";

export default function HomeContent() {
  const {
    options,
    selectedFilter,
    loading,
    list,
    setSelectFilter,
    setLoading,
    setList,
    handleGetCards,
    handleGetFavorites,
  } = useHomeContent();

  useEffect(() => {
    handleGetFavorites().then((favorites) => {
      handleGetCards().then((characters) => {
        if (favorites?.length) {
          setList(
            characters.map((character) => ({
              ...character,
              favorite: favorites.includes(character.id),
            }))
          );
        }
      }).finally(() => setLoading(() => false));
    });
  }, [handleGetCards]);

  return (
    <>
      <Filter
        optionValue={selectedFilter}
        options={options}
        setValue={setSelectFilter}
      />
      <ContentList loading={loading} setList={setList} items={list} />
    </>
  );
}
