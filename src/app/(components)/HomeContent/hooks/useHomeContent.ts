import { useCallback, useState } from "react";

import { getFavorites } from "@/app/actions/action";
import CharactersService from "@/app/services/characters";
import { CharactersResponse } from "@/app/services/characters/types";

import type { Options } from "../types";

const options = [
  { label: "Characters", value: "characters" },
  { label: "Students", value: "students" },
  { label: "Staff", value: "staff" },
];

export default function useHomeContent() {
  const [selectedFilter, setSelectFilter] = useState<Options["value"]>(
    options[0].value,
  );

  const [list, setList] = useState<CharactersResponse[]>([]);

  const handleGetCards = useCallback(() => {
    const action = {
      [options[0].value]: CharactersService.get.getCharacters,
      [options[1].value]: CharactersService.get.getStudents,
      [options[2].value]: CharactersService.get.getStaff,
    };

    return action[selectedFilter]();
  }, [selectedFilter]);

  const handleGetFavorites = useCallback(async () => {
    const storedFavorite = await getFavorites();
    return storedFavorite?.value.split(",");
  }, []);

  return {
    options,
    list,
    selectedFilter,
    setList,
    setSelectFilter,
    handleGetCards,
    handleGetFavorites,
  };
}
