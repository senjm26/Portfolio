"use client";

export default function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="
        w-12 h-12 md:w-16 md:h-16
        flex items-center justify-center
        rounded-full
        bg-black/70
        text-white
        text-2xl md:text-4xl
        cursor-pointer
        transition
        hover:scale-110 hover:bg-black
        shadow-lg
      "
    >
      {direction === "left" ? "‹" : "›"}
    </div>
  );
}
