/* eslint-disable @typescript-eslint/no-explicit-any */

import { getHouse, setHouse } from "@/app/actions/action";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import MyHouse from ".";

jest.mock("@/app/actions/action", () => ({
  getHouse: jest.fn(),
  setHouse: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

describe("MyHouse", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct initial value", async () => {
    (getHouse as any).mockResolvedValue({ value: "Gryffindor" });

    render(<MyHouse house="Gryffindor" />);

    await waitFor(() => expect(getHouse).toHaveBeenCalled());
    expect(screen.getByRole("combobox")).toHaveValue("Gryffindor");
  });

  it("renders the correct image for the selected house", async () => {
    (getHouse as any).mockResolvedValue({ value: "Ravenclaw" });

    render(<MyHouse house="Ravenclaw" />);

    await waitFor(() => expect(getHouse).toHaveBeenCalled());

    const houseImage = screen.getByAltText("My favorite house");
    expect(houseImage).toHaveAttribute("src");
  });

  it("updates the house when the user selects a new house", () => {
    render(<MyHouse house="Gryffindor" />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Hufflepuff" } });

    expect(setHouse).toHaveBeenCalledWith("Hufflepuff");
    expect(select).toHaveValue("Hufflepuff");
  });

  it("calls setHouse when a new house is selected", () => {
    render(<MyHouse house="Gryffindor" />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Slytherin" } });

    expect(setHouse).toHaveBeenCalledWith("Slytherin");
  });

  it("loads the stored house when component mounts", async () => {
    (getHouse as any).mockResolvedValue({ value: "Hufflepuff" });

    render(<MyHouse house="Slytherin" />);

    await waitFor(() => expect(getHouse).toHaveBeenCalled());
    expect(screen.getByRole("combobox")).toHaveValue("Hufflepuff");
  });
});
