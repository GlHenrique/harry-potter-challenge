import { useCallback, useEffect, useState } from "react";

function toTop() {
  window?.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export default function useScrollToTop() {
  const [visible, setVisible] = useState<boolean>(false);

  const scrollToTop = useCallback(() => {
    if (visible) toTop();
  }, [visible]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 150) {
        setVisible(true);
        return;
      }
      setVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return { visible, scrollToTop };
}
