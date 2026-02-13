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
      style={{
        fontSize: "3rem",
        color: "white",
        cursor: "pointer",
        userSelect: "none",
        opacity: 0.7,
        transition: "opacity 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
    >
      {direction === "left" ? "<" : ">"}
    </div>
  );
}
