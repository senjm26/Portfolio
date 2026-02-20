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
    <div className="bg-white text-black rounded-2xl p-6 md:p-10 pb-12 md:pb-16 w-full max-w-6xl shadow-[0_30px_80px_rgba(0,0,0,0.35)]">

      <h3 className="text-xl md:text-2xl font-medium mb-6">
        {title}
      </h3>

      <div className="flex flex-col gap-8 md:grid md:grid-cols-[1fr_1.4fr]">

        {/* TEXT */}
        <div className="text-base leading-relaxed">
          {description}
        </div>

        {/* MEDIA */}
        <div className="w-full h-[260px] sm:h-[300px] md:h-[380px]">
          {children}
        </div>

      </div>
    </div>
  );
}
