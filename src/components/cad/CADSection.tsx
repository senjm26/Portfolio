"use client";

import CADCarousel from "./CADCarousel";

export default function CADSection() {
  return (
    <section id="portfolio"
      style={{
        background: "black",
        padding: "100px 0",
        color: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "60px",
        }}
      >
        Engineering Portfolio
      </h2>

      <CADCarousel />
    </section>
  );
}
