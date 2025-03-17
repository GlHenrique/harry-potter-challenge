import { fireEvent, render, screen } from "@testing-library/react";

import Favorite from ".";

describe("Favorite Component", () => {
  it("renders the filled star icon when favorite is true", () => {
    render(<Favorite favorite={true} />);
    const filledStar = screen.getByRole("button").querySelector("svg");
    expect(filledStar).toHaveClass("text-yellow-400");
  });

  it("renders the outlined star icon when favorite is false", () => {
    render(<Favorite favorite={false} />);
    const outlinedStar = screen.getByRole("button").querySelector("svg");
    expect(outlinedStar).toHaveClass("text-gray-300");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Favorite favorite={true} onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("stops event propagation when clicked", () => {
    const handleClick = jest.fn();
    const handleParentClick = jest.fn();

    render(
      <div onClick={handleParentClick}>
        <Favorite favorite={true} onClick={handleClick} />
      </div>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleParentClick).not.toHaveBeenCalled();
  });
});
