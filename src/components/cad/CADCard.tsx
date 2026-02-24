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
    <div
      className="
      relative bg-white text-black rounded-3xl
      p-8 md:p-14 w-full
      shadow-2xl border border-black/5
      h-[960px] md:h-[700px]
      flex flex-col
      "
    >
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h3>
        <div className="mt-4 h-[4px] w-full bg-black/80 rounded-full" />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-2 md:items-center gap-10">
        
        {/* TEXT */}
        <div className="text-base md:text-lg leading-relaxed text-black/70 space-y-5">
          {description}
        </div>

        {/* MEDIA */}
        <div
  className="
  w-full rounded-2xl
  border border-black/10
  bg-black/[0.03]
  h-[320px] md:h-[440px]
  "
>
  <div className="relative w-full h-full p-6 overflow-hidden flex items-center justify-center">
    {children}
  </div>
</div>
      </div>
    </div>
  );
}