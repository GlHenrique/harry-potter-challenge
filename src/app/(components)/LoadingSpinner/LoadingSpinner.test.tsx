import { render, screen } from "@testing-library/react";

import LoadingSpinner from ".";

describe("LoadingSpinner", () => {
  it("renders the spinner when loading is true", () => {
    render(<LoadingSpinner loading={true} />);

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();

    const svgIcon = screen.getByRole("status");
    expect(svgIcon).toBeInTheDocument();
  });

  it("does not render the spinner when loading is false", () => {
    render(<LoadingSpinner loading={false} />);

    const spinner = screen.queryByTestId("loading-spinner");
    expect(spinner).toBeNull();
  });
});
