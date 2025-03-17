import { getFavorites, setFavorites } from "@/app/actions/action";
import { CharactersResponse } from "@/app/services/characters/types";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ContentList from "./index";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/actions/action", () => ({
  getFavorites: jest.fn(),
  setFavorites: jest.fn(),
}));

describe("ContentList Component", () => {
  const mockSetList = jest.fn();
  const mockItems: CharactersResponse[] = [
    {
      id: "1",
      name: "Harry Potter",
      gender: "male",
      house: "Gryffindor",
      patronus: "stag",
      actor: "Daniel Radcliffe",
      image: "/harry.jpg",
      favorite: false,
      alternate_names: [],
      species: "",
      dateOfBirth: "",
      yearOfBirth: 0,
      wizard: false,
      ancestry: "",
      eyeColour: "",
      hairColour: "",
      wand: {
        wood: "",
        core: "",
        length: 0,
      },
      hogwartsStudent: false,
      hogwartsStaff: false,
      alternate_actors: [],
      alive: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(
      <ContentList
        items={mockItems}
        loading={false}
        selectedFilter="Wizards"
        setList={mockSetList}
      />,
    );
    expect(screen.getByText("All Wizards")).toBeInTheDocument();
    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
  });

  it("displays loading spinner when loading is true", () => {
    render(
      <ContentList
        items={mockItems}
        loading={true}
        selectedFilter="Wizards"
        setList={mockSetList}
      />,
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("calls getFavorites when updating favorites", async () => {
    (getFavorites as jest.Mock).mockResolvedValue({ value: "1" });
    render(
      <ContentList
        items={mockItems}
        loading={false}
        selectedFilter="Wizards"
        setList={mockSetList}
      />,
    );

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    await waitFor(() => {
      expect(getFavorites).toHaveBeenCalled();
      expect(setFavorites).toHaveBeenCalled();
    });
  });
});
