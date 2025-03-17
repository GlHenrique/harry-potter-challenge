"use client";

import useScrollToTop from "./hooks/useScrollToTop";

import styles from "./ScrollToTop.module.css";

export default function ScrollToTopButton() {
  const { visible, scrollToTop } = useScrollToTop();
  console.log(visible);

  return (
    <button
      className={`
      bg-amber-500
        hover:bg-amber-600
        shadow
        fixed
        bottom-10
        right-5
        transition-all
        ${visible ? styles.show : styles.hide}
        font-medium
        cursor-pointer
        rounded-lg text-sm p-2.5 text-center inline-flex items-center
    `}
      onClick={scrollToTop}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-white"
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 6v13m0-13 4 4m-4-4-4 4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
