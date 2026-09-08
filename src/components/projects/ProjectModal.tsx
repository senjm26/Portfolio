"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Project } from "@/data/projects";
import SpecRow from "../ui/SpecRow";
import Eyebrow from "../ui/Eyebrow";
import ArrowButton from "../ui/ArrowButton";
import ProjectViewer3D from "./ProjectViewer3D";

export default function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [drawingIndex, setDrawingIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (drawingIndex !== null) {
        setDrawingIndex(null);
      } else if (expandedImage) {
        setExpandedImage(null);
      } else {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawingIndex, expandedImage, onClose]);

  const toolsLabel = project.category === "manufacturing" ? "Process" : "Software";
  const partsCount = project.parts?.length ?? 0;
  const drawingImages = project.drawingImages ?? [];

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-stretch md:items-center justify-center md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl bg-cream-raised md:rounded-lg border border-ink/10 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky control bar: prev / next / close */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-cream-raised/95 backdrop-blur border-b border-ink/10">
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" onClick={onPrev} />
            <ArrowButton direction="right" onClick={onNext} />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-cream border border-ink/15 text-ink hover:text-sky hover:border-sky transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 md:p-10">
          {/* Header */}
          <h2 className="font-display text-2xl md:text-4xl tracking-tight text-ink">
            {project.title}
          </h2>

          {/* Media */}
          <div className="mt-8 w-full">
            {project.modelPath ? (
              <div className="w-full h-[280px] md:h-[380px] overflow-hidden rounded-md">
                <ProjectViewer3D
                  modelPath={project.modelPath}
                  explodedModelPath={project.explodedModelPath}
                  renderImage={project.renderImage}
                  cameraMargin={project.cameraMargin}
                />
              </div>
            ) : project.images && project.images.length > 1 ? (
              <div className="flex flex-col gap-4">
                {project.images.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setExpandedImage(img)}
                    className="w-full rounded-md overflow-hidden border border-ink/10 bg-cream cursor-zoom-in hover:border-sky transition"
                  >
                    <img
                      src={img}
                      alt={project.title}
                      className="w-full h-auto object-contain"
                    />
                  </button>
                ))}
              </div>
            ) : project.renderImage ? (
              <div className="w-full h-[280px] md:h-[380px]">
                <img
                  src={project.renderImage}
                  alt={project.title}
                  className="w-full h-full object-contain rounded-md border border-ink/10 bg-cream"
                />
              </div>
            ) : (
              <div className="w-full h-[280px] md:h-[380px] rounded-md border border-ink/10 bg-cream flex items-center justify-center font-mono text-xs tracking-[0.25em] uppercase text-ink/30">
                No Render Available
              </div>
            )}
          </div>

          {drawingImages.length > 0 && (
            <button
              type="button"
              onClick={() => setDrawingIndex(0)}
              className="mt-4 font-mono text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-sm border border-ink/20 text-ink/80 hover:border-sky hover:text-sky transition"
            >
              View Drawing ({drawingImages.length} Pages)
            </button>
          )}

          {/* Spec strip */}
          <div className="mt-10 max-w-md">
            <SpecRow label={toolsLabel} value={project.tools.join(", ") || "—"} />
          </div>

          {/* Write-up */}
          <div className="mt-10 space-y-4 max-w-2xl">
            {project.description.map((paragraph, i) => (
              <p key={i} className="text-ink/70 leading-relaxed text-base">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Parts gallery */}
          {partsCount > 1 && (
            <div className="mt-10">
              <Eyebrow>{partsCount} Parts</Eyebrow>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.parts!.map((part) => (
                  <div key={part.label} className="rounded-md border border-ink/10 p-3">
                    {part.image && (
                      <img
                        src={part.image}
                        alt={part.label}
                        className="w-full h-32 object-cover rounded-sm mb-2"
                      />
                    )}
                    <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink/60">
                      {part.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Supplementary image lightbox */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-30 bg-ink/80 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setExpandedImage(null)}
        >
          <img src={expandedImage} alt="" className="max-w-full max-h-full rounded-md" />
        </div>
      )}

      {/* Drawing pager */}
      {drawingIndex !== null && (
        <div
          className="fixed inset-0 z-30 bg-ink/80 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setDrawingIndex(null)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 md:top-6 md:right-6 text-off-white text-3xl hover:text-sky transition"
              onClick={() => setDrawingIndex(null)}
              aria-label="Close drawing"
            >
              <X size={28} />
            </button>

            <img
              src={drawingImages[drawingIndex]}
              alt="Drawing"
              className="max-w-full max-h-full rounded-md bg-cream-raised"
            />

            <button
              className="absolute left-2 md:left-6 text-off-white text-3xl hover:text-sky transition"
              onClick={() =>
                setDrawingIndex(
                  (drawingIndex - 1 + drawingImages.length) % drawingImages.length
                )
              }
              aria-label="Previous page"
            >
              ‹
            </button>

            <button
              className="absolute right-2 md:right-6 text-off-white text-3xl hover:text-sky transition"
              onClick={() => setDrawingIndex((drawingIndex + 1) % drawingImages.length)}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
