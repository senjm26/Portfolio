"use client";

export default function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
      w-9 h-9 md:w-10 md:h-10
      flex items-center justify-center
      rounded-full
      bg-cream-raised text-ink border border-ink/15
      transition
      hover:border-sky hover:text-sky hover:scale-105
      active:scale-95
      "
    >
      <svg
        viewBox="0 0 24 24"
        className="w-3 h-3 md:w-4 md:h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}