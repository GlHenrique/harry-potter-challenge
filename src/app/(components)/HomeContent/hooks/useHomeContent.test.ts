/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFavorites } from "@/app/actions/action";
import CharactersService from "@/app/services/characters";
import { act, renderHook } from "@testing-library/react";

import useHomeContent from "./useHomeContent";

jest.mock("@/app/actions/action", () => ({
  getFavorites: jest.fn(),
}));

jest.mock("@/app/services/characters", () => ({
  get: {
    getCharacters: jest.fn().mockResolvedValue([]),
    getStudents: jest.fn().mockResolvedValue([]),
    getStaff: jest.fn().mockResolvedValue([]),
  },
}));

describe("useHomeContent Hook", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useHomeContent());

    expect(result.current.selectedFilter).toBe("characters");
    expect(result.current.loading).toBe(false);
    expect(result.current.list).toEqual([]);
    expect(result.current.options.length).toBe(3);
  });

  it("calls getFavorites and returns stored favorites", async () => {
    (getFavorites as any).mockResolvedValue({ value: "1,2,3" });

    const { result } = renderHook(() => useHomeContent());
    const favorites = await result.current.handleGetFavorites();

    expect(getFavorites).toHaveBeenCalled();
    expect(favorites).toEqual(["1", "2", "3"]);
  });

  it("fetches characters based on selected filter", async () => {
    const { result } = renderHook(() => useHomeContent());

    await act(async () => {
      await result.current.handleGetCards();
    });

    expect(CharactersService.get.getCharacters).toHaveBeenCalled();
  });

  it("updates selected filter correctly", () => {
    const { result } = renderHook(() => useHomeContent());

    act(() => {
      result.current.setSelectFilter("students");
    });

    expect(result.current.selectedFilter).toBe("students");
  });
});
