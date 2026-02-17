"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

export default function CADViewer({ modelPath }: { modelPath: string }) {
  return (
    <div
  style={{
    background: "#f1f1f1",
    borderRadius: "12px",
    padding: "12px",
    height: "380px",
    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
  }}
>
  <Canvas
    camera={{ fov: 45 }}
    style={{ width: "100%", height: "100%" }}
  >

  {/* Soft base */}
  <ambientLight intensity={0.6} />

  {/* Key light */}
  <directionalLight
    position={[5, 8, 10]}
    intensity={0.9}
  />

  {/* Fill light */}
  <directionalLight
    position={[-5, -3, 5]}
    intensity={0.4}
  />

  {/* Rim light */}
  <directionalLight
    position={[0, 5, -10]}
    intensity={0.3}
  />

  <Model path={modelPath} />
  <OrbitControls />
</Canvas>

    </div>
  );
}
