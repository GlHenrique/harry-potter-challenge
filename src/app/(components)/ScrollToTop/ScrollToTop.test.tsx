/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";

import useScrollToTop from "./hooks/useScrollToTop";
import ScrollToTopButton from ".";

jest.mock("./hooks/useScrollToTop");

describe("ScrollToTopButton", () => {
  test("should render button when visible is true", () => {
    (useScrollToTop as any).mockReturnValue({
      visible: true,
      scrollToTop: jest.fn(),
    });

    render(<ScrollToTopButton />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("show");
  });

  test("should not render button when visible is false", () => {
    (useScrollToTop as any).mockReturnValue({
      visible: false,
      scrollToTop: jest.fn(),
    });

    render(<ScrollToTopButton />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("hide");
  });

  test("should call scrollToTop function when button is clicked", () => {
    const scrollToTopMock = jest.fn();
    (useScrollToTop as any).mockReturnValue({
      visible: true,
      scrollToTop: scrollToTopMock,
    });

    render(<ScrollToTopButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(scrollToTopMock).toHaveBeenCalled();
  });
});
