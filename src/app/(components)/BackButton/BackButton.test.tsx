import { useRouter } from "next/navigation";

import { fireEvent, render, screen } from "@testing-library/react";

import BackButton from "../BackButton"; // ajuste o caminho conforme necessário

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackButton", () => {
  it("renders correctly", () => {
    render(<BackButton />);
    const button = screen.getByRole("button", { name: /go back/i });
    expect(button).toBeInTheDocument();
  });

  it("calls router.back() when clicked", () => {
    const mockBack = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useRouter as any).mockReturnValue({ back: mockBack });

    render(<BackButton />);
    const button = screen.getByRole("button", { name: /go back/i });
    fireEvent.click(button);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
