"use client";

import { useEffect } from "react";

import ContentList from "../ContentList";
import Filter from "../filter";

import useHomeContent from "./hooks/useHomeContent";

export default function HomeContent() {
  const { options, selectedFilter, list, setSelectFilter, setList, handleGetCards } =
    useHomeContent();

  useEffect(() => {
    handleGetCards().then(setList);
  }, [handleGetCards]);

  return (
    <>
      <Filter
        optionValue={selectedFilter}
        options={options}
        setValue={setSelectFilter}
      />
      <ContentList items={list} />
    </>
  );
}
