"use client";

import { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left w-full flex flex-col rounded-md overflow-hidden border border-ink/10 bg-cream-raised hover:border-sky hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 transition-all duration-300"
    >
      <div className="relative w-full aspect-[4/3] bg-[#dcd9d2] overflow-hidden">
        {project.renderImage ? (
          <img
            src={project.renderImage}
            alt={project.title}
            className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink/30">
              {project.categoryLabel}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-display text-lg tracking-tight text-ink group-hover:text-sky transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-ink/60 leading-relaxed line-clamp-2">
          {project.description[0]}
        </p>

        {project.tools[0] && (
          <span className="self-start font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-sm border border-ink/15 text-ink/50">
            {project.tools[0]}
          </span>
        )}
      </div>
    </button>
  );
}
