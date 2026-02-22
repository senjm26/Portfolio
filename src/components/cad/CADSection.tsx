"use client";

import CADCarousel from "./CADCarousel";

export default function CADSection() {
  return (
    <section
      id="portfolio"
      className="relative py-32 px-6 bg-[#0c0f14] text-white border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto text-center mb-20">
        <p className="text-xs tracking-[0.35em] uppercase text-white/40 mb-6">
          Portfolio
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold">
          Engineering Work
        </h2>

        <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
          CAD modeling, structural analysis, and mechanical systems designed
          through coursework, motorsport engineering, and independent builds.
        </p>
      </div>

      <CADCarousel />
    </section>
  );
}