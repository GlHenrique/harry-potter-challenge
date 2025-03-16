"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="
        absolute
        top-8
        left-8
        bg-white
        hover:bg-gray-200
        font-medium
        cursor-pointer
        rounded-lg text-sm p-2.5 text-center inline-flex items-center"
      onClick={() => router.back()}
      title="Go back"
      type="button"
    >
      <svg
        className="w-[36px] h-[36px]"
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12h14M5 12l4-4m-4 4 4 4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
