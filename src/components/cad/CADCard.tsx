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
    <div className="relative bg-white text-black rounded-3xl 
  p-8 md:p-14 w-full 
  shadow-2xl border border-black/5
  min-h-[520px] md:min-h-[560px]"
>

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h3>
        <div className="mt-4 h-[4px] w-full bg-black/80 rounded-full" />
      </div>

      <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:items-center">

        {/* TEXT */}
        <div className="text-base md:text-lg leading-relaxed text-black/70 space-y-5">
          {description}
        </div>

        {/* MEDIA */}
        <div className="flex items-center justify-center w-full rounded-2xl overflow-hidden border border-black/10 bg-black/[0.03] p-6 min-h-[260px]">
          {children}
        </div>

      </div>
    </div>
  );
}