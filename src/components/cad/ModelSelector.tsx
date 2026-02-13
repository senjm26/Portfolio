"use client";

import CADViewer from "./CADViewer";

type ModelSelectorProps = {
  name: string;
  path: string;
};

export default function ModelSelector({ name, path }: ModelSelectorProps) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        {name}
      </h3>

      <div style={{ width: "100%", height: "400px" }}>
        <CADViewer modelPath={path} />
      </div>
    </div>
  );
}
