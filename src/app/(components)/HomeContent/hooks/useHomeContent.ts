import { useCallback, useState } from "react";

import CharactersService from "@/app/services/characters";

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

  const handleGetCards = useCallback(() => {
    const action = {
      [options[0].value]: CharactersService.get.getCharacters,
      [options[1].value]: CharactersService.get.getStudents,
      [options[2].value]: CharactersService.get.getStaff,
    };

    return action[selectedFilter]();
  }, [selectedFilter]);

  return {
    options,
    selectedFilter,
    setSelectFilter,
    handleGetCards,
  };
}
