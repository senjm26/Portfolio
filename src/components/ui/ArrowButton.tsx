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
        w-10 h-10 sm:w-14 sm:h-14
        flex items-center justify-center
        rounded-full
        bg-black/80
        text-white
        text-xl sm:text-3xl
        backdrop-blur-md
        transition
        hover:scale-110 hover:bg-black
        active:scale-95
      "
    >
      {direction === "left" ? "‹" : "›"}
    </button>
  );
}