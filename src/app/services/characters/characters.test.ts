/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api";

import CharactersService from "./index";

jest.mock("../api");

describe("CharactersService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getCharacters - should return characters list", async () => {
    const mockData = [
      { id: 1, name: "Harry Potter", dateOfBirth: "", favorite: false },
    ];
    (api.get as any).mockResolvedValue({ data: mockData });

    const result = await CharactersService.get.getCharacters();
    expect(result).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith("/characters");
  });

  test("getCharacters - should return empty array when error", async () => {
    (api.get as any).mockRejectedValue(new Error("error"));

    const result = await CharactersService.get.getCharacters();
    expect(result).toEqual([]);
    expect(api.get).toHaveBeenCalledWith("/characters");
  });

  test("getStudents - should return students list", async () => {
    const mockData = [
      { id: 2, name: "Hermione Granger", dateOfBirth: "", favorite: false },
    ];
    (api.get as any).mockResolvedValue({ data: mockData });

    const result = await CharactersService.get.getStudents();
    expect(result).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith("/characters/students");
  });

  test("getStudents - should return empty list when error", async () => {
    (api.get as any).mockRejectedValue(new Error("error"));

    const result = await CharactersService.get.getStudents();
    expect(result).toEqual([]);
    expect(api.get).toHaveBeenCalledWith("/characters/students");
  });

  test("getStaff - should return staff list", async () => {
    const mockData = [
      { id: 3, name: "Albus Dumbledore", dateOfBirth: "", favorite: false },
    ];
    (api.get as any).mockResolvedValue({ data: mockData });

    const result = await CharactersService.get.getStaff();
    expect(result).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith("/characters/staff");
  });

  test("getStaff - shour return empty array when error", async () => {
    (api.get as any).mockRejectedValue(new Error("Erro na API"));

    const result = await CharactersService.get.getStaff();
    expect(result).toEqual([]);
    expect(api.get).toHaveBeenCalledWith("/characters/staff");
  });
});
