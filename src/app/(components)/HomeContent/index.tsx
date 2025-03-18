"use client";

import { useEffect } from "react";

import ContentList from "../ContentList";
import Filter from "../filter";

import useHomeContent from "./hooks/useHomeContent";

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
      handleGetCards()
        .then((characters) => {
          setList(
            characters.map((character) => ({
              ...character,
              favorite: favorites?.includes(character.id),
            })),
          );
        })
        .finally(() => setLoading(() => false));
    });
  }, [handleGetFavorites, handleGetCards, setList, setLoading]);

  return (
    <>
      <Filter
        optionValue={selectedFilter}
        options={options}
        setValue={setSelectFilter}
      />
      <ContentList
        items={list}
        loading={loading}
        selectedFilter={selectedFilter}
        setList={setList}
      />
    </>
  );
}
