"use client";

import { useEffect } from "react";

import ContentList from "../ContentList";
import Filter from "../filter";

import useHomeContent from "./hooks/useHomeContent";

export default function HomeContent() {
  const { options, selectedFilter, setSelectFilter, handleGetCards } =
    useHomeContent();

  useEffect(() => {
    handleGetCards();
  }, [handleGetCards]);

  return (
    <>
      <Filter
        optionValue={selectedFilter}
        options={options}
        setValue={setSelectFilter}
      />
      <ContentList />
    </>
  );
}
