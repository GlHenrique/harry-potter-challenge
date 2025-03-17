import { CharactersResponse } from "@/app/services/characters/types";
import { fireEvent, render, screen } from "@testing-library/react";

import ItemCard, { ItemCardProps } from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

const mockOnFavorite = jest.fn();
const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const mockCharacter: ItemCardProps = {
  name: "Harry Potter",
  realName: "Harry James Potter",
  image: "https://example.com/harry.jpg",
  house: "Gryffindor",
  gender: "Male",
  patronus: "Stag",
  fullInfo: {
    id: "1",
    favorite: false,
  } as CharactersResponse,
  onFavorite: mockOnFavorite,
};

describe("ItemCard", () => {
  beforeEach(() => {
    mockOnFavorite.mockClear();
    mockRouterPush.mockClear();
  });

  it("renders character name, real name, and house", () => {
    render(<ItemCard {...mockCharacter} />);

    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.getByText("Harry James Potter")).toBeInTheDocument();
    expect(screen.getByText("House · Gryffindor")).toBeInTheDocument();
  });

  it("renders 'none' for missing real name, house, and patronus", () => {
    const characterWithoutRealName = { ...mockCharacter, realName: "" };
    const characterWithoutHouse = { ...mockCharacter, house: "" };
    const characterWithoutPatronus = { ...mockCharacter, patronus: "" };

    render(<ItemCard {...characterWithoutRealName} />);
    expect(screen.getByText("none")).toBeInTheDocument();

    render(<ItemCard {...characterWithoutHouse} />);
    expect(screen.getByText("none")).toBeInTheDocument();

    render(<ItemCard {...characterWithoutPatronus} />);
    expect(screen.getByText("none")).toBeInTheDocument();
  });

  it("renders fallback image when no image URL is provided", () => {
    const characterWithoutImage = { ...mockCharacter, image: "" };
    render(<ItemCard {...characterWithoutImage} />);

    const image = screen.getByAltText("character-Harry Potter");
    expect(image).toHaveAttribute("src");
  });

  it("calls onFavorite when favorite button is clicked", () => {
    render(<ItemCard {...mockCharacter} />);

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(mockOnFavorite).toHaveBeenCalledWith("1");
  });

  it("navigates to character details when the card is clicked", () => {
    render(<ItemCard {...mockCharacter} />);

    const card = screen.getByText("Harry Potter");
    fireEvent.click(card);

    expect(mockRouterPush).toHaveBeenCalledWith(
      `character-details/Harry Potter?id=1&favorite=false`,
    );
  });

  it("displays the house image", () => {
    render(<ItemCard {...mockCharacter} />);

    const houseImage = screen.getByAltText("House: Gryffindor");
    expect(houseImage).toBeInTheDocument();
  });
});
