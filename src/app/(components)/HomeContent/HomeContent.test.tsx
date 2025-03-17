/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react";

import useHomeContent from "./hooks/useHomeContent";
import HomeContent from "./index";

jest.mock("./hooks/useHomeContent");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("HomeContent Component", () => {
  const mockUseHomeContent = {
    options: [
      { label: "All", value: "all" },
      { label: "Favorites", value: "favorites" },
    ],
    selectedFilter: "all",
    loading: false,
    list: [
      { id: "1", name: "Harry Potter", favorite: false },
      { id: "2", name: "Hermione Granger", favorite: true },
    ],
    setSelectFilter: jest.fn(),
    setLoading: jest.fn(),
    setList: jest.fn(),
    handleGetCards: jest.fn().mockResolvedValue([]),
    handleGetFavorites: jest.fn().mockResolvedValue([]),
  };

  beforeEach(() => {
    (useHomeContent as any).mockReturnValue(mockUseHomeContent);
  });

  it("renders the filter and content list", async () => {
    render(<HomeContent />);

    expect(screen.getByLabelText("Filter:")).toBeInTheDocument();
    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.getByText("Hermione Granger")).toBeInTheDocument();
  });

  it("calls handleGetFavorites and handleGetCards on mount", async () => {
    render(<HomeContent />);

    await waitFor(() => {
      expect(mockUseHomeContent.handleGetFavorites).toHaveBeenCalled();
      expect(mockUseHomeContent.handleGetCards).toHaveBeenCalled();
    });
  });
});
