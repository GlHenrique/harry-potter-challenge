import { render } from "@testing-library/react";

import Home from "./page";

describe("Home Component", () => {
  it("should render the component correctly", () => {
    render(<Home />);
  });
});
