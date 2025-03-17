import { act, renderHook } from "@testing-library/react";

import useScrollToTop from "./useScrollToTop";

describe("useScrollToTop Hook", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollTo", {
      value: jest.fn(),
      writable: true,
    });
  });

  test("should initialize with visible as false", () => {
    const { result } = renderHook(() => useScrollToTop());
    expect(result.current.visible).toBe(false);
  });

  test("should set visible to true when scrolling past 150px", () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.visible).toBe(true);
  });

  test("should set visible to false when scrolling back above 150px", () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current.visible).toBe(true);

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current.visible).toBe(false);
  });

  test("should call scrollTo when scrollToTop is triggered and visible is true", () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event("scroll"));
    });

    act(() => {
      result.current.scrollToTop();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("should not call scrollTo when scrollToTop is triggered and visible is false", () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      result.current.scrollToTop();
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
