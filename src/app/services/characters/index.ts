import api from "../api";

import { CharactersResponse } from "./types";

const CharactersService = {
  get: {
    getCharacters: async () => {
      try {
        const response = await api.get<CharactersResponse[]>("/characters");
        return response.data;
      } catch {
        return [];
      }
    },
    getStudents: async () => {
      try {
        const response = await api.get<CharactersResponse[]>(
          "/characters/students",
        );
        return response.data;
      } catch {
        return [];
      }
    },
    getStaff: async () => {
      try {
        const response =
          await api.get<CharactersResponse[]>("/characters/staff");
        return response.data;
      } catch {
        return [];
      }
    },
  },
};

export default CharactersService;
