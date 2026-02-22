"use client";

import { ReactNode } from "react";

export default function CADCard({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative bg-white/95 backdrop-blur-md text-black rounded-3xl p-10 md:p-14 w-full max-w-6xl shadow-[0_40px_100px_rgba(0,0,0,0.45)] border border-white/10">

      {/* Header */}
      <div className="mb-10 border-b border-black/10 pb-6">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h3>
      </div>

      <div className="flex flex-col gap-12 md:grid md:grid-cols-[1.05fr_1fr] md:items-start">

        {/* TEXT */}
        <div className="text-base md:text-lg leading-relaxed text-black/70 space-y-5">
          {description}
        </div>

        {/* MEDIA */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-black/5 p-4">
          <div className="relative w-full aspect-[16/10]">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}