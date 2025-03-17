/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHouse } from "@/app/actions/action";
import { render, screen, waitFor } from "@testing-library/react";

import Header from ".";

jest.mock("@/app/actions/action", () => ({
  getHouse: jest.fn(),
}));

describe("Header Component", () => {
  it("renders the header with default house when getHouse returns null", async () => {
    (getHouse as any).mockResolvedValue(null);

    render(await Header());

    expect(screen.getByText("Harry Potter Challenge")).toBeInTheDocument();
    expect(screen.getByText("Welcome to HP Card Game ⚡️")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Gryffindor")).toBeInTheDocument();
    });
  });

  it("renders the header with the stored house from getHouse", async () => {
    (getHouse as any).mockResolvedValue({ value: "Slytherin" });

    render(await Header());

    await waitFor(() => {
      expect(screen.getByText("Slytherin")).toBeInTheDocument();
    });
  });
});
