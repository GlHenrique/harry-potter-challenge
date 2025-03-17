import { useSearchParams } from "next/navigation";

import { render, screen, waitFor } from "@testing-library/react";

import CharacterDetails from "./page";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

describe("CharacterDetails", () => {
  const mockSearchParams = (params: Record<string, string | null>) => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => params[key] || null,
    });
  };

  it("renders character details based on URL search params", async () => {
    const mockParams = {
      id: "1",
      name: "Harry Potter",
      species: "Human",
      gender: "Male",
      house: "Gryffindor",
      patronus: "Stag",
      actor: "Daniel Radcliffe",
      favorite: "true",
      image: "/path/to/harry.jpg",
    };

    mockSearchParams(mockParams);

    render(<CharacterDetails />);

    await waitFor(() =>
      expect(screen.getByText("Harry Potter")).toBeInTheDocument(),
    );

    const backgroundImage = screen.getByAltText("Background Gryffindor");
    expect(backgroundImage).toHaveAttribute("src");

    const houseImage = screen.getByAltText("House Gryffindor");
    expect(houseImage).toHaveAttribute("src");

    const favoriteIcon = screen.getAllByRole("button")[0];
    expect(favoriteIcon).toBeInTheDocument();
  });

  it("does not render background or house images when house is not provided", async () => {
    const mockParams = {
      id: "1",
      name: "Harry Potter",
      species: "Human",
      gender: "Male",
      house: null,
      patronus: "Stag",
      actor: "Daniel Radcliffe",
      favorite: "false",
      image: "/path/to/harry.jpg",
    };

    mockSearchParams(mockParams);

    render(<CharacterDetails />);

    const backgroundImage = screen.queryByAltText("Background Gryffindor");
    expect(backgroundImage).toBeNull();

    const houseImage = screen.queryByAltText("House Gryffindor");
    expect(houseImage).toBeNull();
  });

  it("renders DetailsCard if character data is present", async () => {
    const mockParams = {
      id: "1",
      name: "Hermione Granger",
      species: "Human",
      gender: "Female",
      house: "Gryffindor",
      patronus: "Otter",
      actor: "Emma Watson",
      favorite: "false",
      image: "/path/to/hermione.jpg",
    };

    mockSearchParams(mockParams);

    render(<CharacterDetails />);

    await waitFor(() =>
      expect(screen.getByText("Hermione Granger")).toBeInTheDocument(),
    );
  });

  it("handles the absence of character name gracefully", async () => {
    const mockParams = {
      id: "1",
      name: null,
      species: "Human",
      gender: "Male",
      house: "Slytherin",
      patronus: "Snake",
      actor: "Tom Riddle",
      favorite: "false",
      image: "/path/to/tomriddle.jpg",
    };

    mockSearchParams(mockParams);

    render(<CharacterDetails />);

    await waitFor(() => expect(screen.queryByText("Tom Riddle")).toBeNull());
  });
});
