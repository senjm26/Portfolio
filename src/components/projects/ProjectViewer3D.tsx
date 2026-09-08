"use client";

import CADViewer from "../cad/CADViewer";

export default function ProjectViewer3D({
  modelPath,
  explodedModelPath,
  cameraMargin,
}: {
  modelPath: string;
  explodedModelPath?: string;
  renderImage?: string;
  cameraMargin?: number;
}) {
  return (
    <div
      className={`grid gap-4 w-full h-full min-h-[320px] ${
        explodedModelPath ? "md:grid-cols-2" : "grid-cols-1"
      }`}
    >
      <CADViewer modelPath={modelPath} cameraMargin={cameraMargin} />
      {explodedModelPath && (
        <CADViewer modelPath={explodedModelPath} cameraMargin={cameraMargin} />
      )}
    </div>
  );
}
