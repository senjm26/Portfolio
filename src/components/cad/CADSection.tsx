"use client";

import CADCarousel from "./CADCarousel";

export default function CADSection() {
  return (
    <section
      id="portfolio"
      className="relative py-32 px-6 bg-[#0c0f14] text-white border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto text-center mb-20">
        <p className="text-md tracking-[0.35em] uppercase text-white/60 mb-6">
          Engineering Portfolio
        </p>

      </div>

      <CADCarousel />
    </section>
  );
}