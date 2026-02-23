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
  w-9 h-9 md:w-14 md:h-14
  flex items-center justify-center
  rounded-full
  bg-black/80 md:bg-black/80
  text-white
  text-lg md:text-3xl
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