import { fireEvent, render, screen } from "@testing-library/react";

import Filter from ".";

describe("Filter Component", () => {
  const mockOptions = [
    { label: "All", value: "all" },
    { label: "Favorites", value: "favorites" },
  ];
  const mockSetValue = jest.fn();

  it("renders the filter options correctly", () => {
    render(
      <Filter
        optionValue="all"
        options={mockOptions}
        setValue={mockSetValue}
      />,
    );

    expect(screen.getByLabelText("Filter:")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("all");
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });

  it("calls setValue when a new option is selected", () => {
    render(
      <Filter
        optionValue="all"
        options={mockOptions}
        setValue={mockSetValue}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "favorites" } });

    expect(mockSetValue).toHaveBeenCalledWith("favorites");
  });
});
