import { CharactersResponse } from "@/app/services/characters/types";
import { render, screen } from "@testing-library/react";

import { ItemCardProps } from "../ItemCard";

import DetailsCard from ".";

describe("DetailsCard Component", () => {
  const mockCharacter: ItemCardProps["fullInfo"] = {
    id: "1",
    name: "Harry Potter",
    gender: "male",
    house: "Gryffindor",
    patronus: "stag",
    actor: "Daniel Radcliffe",
    image: "/harry.jpg",
    dateOfBirth: "31-07-1980",
    alive: true,
    ancestry: "half-blood",
    alternate_names: [],
    species: "",
    yearOfBirth: 0,
    wizard: false,
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
  };

  it("renders the component with character details", () => {
    render(<DetailsCard character={mockCharacter} />);

    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.getByText("Daniel Radcliffe")).toBeInTheDocument();
    expect(screen.getByText("House · Gryffindor")).toBeInTheDocument();
    expect(screen.getByText("Gender · male")).toBeInTheDocument();
    expect(screen.getByText("Patronus · stag")).toBeInTheDocument();
    expect(screen.getByText("Birth · 31-07-1980")).toBeInTheDocument();
    expect(screen.getByText("Alive · Yes")).toBeInTheDocument();
    expect(screen.getByText("Ancestry · half-blood")).toBeInTheDocument();
  });

  it("renders fallback values when data is missing", () => {
    const mockCharacterWithMissingData = {
      id: "2",
      name: "Unknown",
    } as ItemCardProps["fullInfo"];

    render(<DetailsCard character={mockCharacterWithMissingData} />);

    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.getByText("No real name")).toBeInTheDocument();
    expect(screen.getByText("House · none")).toBeInTheDocument();
    expect(screen.getByText("Gender · none")).toBeInTheDocument();
    expect(screen.getByText("Patronus · none")).toBeInTheDocument();
    expect(screen.getByText("Birth · none")).toBeInTheDocument();
    expect(screen.getByText("Alive · No")).toBeInTheDocument();
    expect(screen.getByText("Ancestry · Not informed")).toBeInTheDocument();
  });

  it("renders character image or fallback image", () => {
    render(<DetailsCard character={mockCharacter} />);
    const characterImage = screen.getByAltText("Character Harry Potter");
    expect(characterImage).toHaveAttribute(
      "src",
      expect.stringContaining("harry.jpg"),
    );

    render(
      <DetailsCard
        character={{ id: "2", name: "Unknown" } as CharactersResponse}
      />,
    );
    const fallbackImage = screen.getByAltText("Character Unknown");
    expect(fallbackImage).toHaveAttribute("src");
  });
});
