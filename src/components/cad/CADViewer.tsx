"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

export default function CADViewer({ modelPath }: { modelPath: string }) {
  return (
    <div className="w-full h-full bg-[#f1f1f1] rounded-xl p-3 shadow-inner overflow-hidden">
      <Canvas
        camera={{ fov: 45, position: [0, 0, 6] }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (event) => {
              event.preventDefault();
              console.log("WebGL context lost");
            },
            false
          );
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 10]} intensity={0.9} />
        <directionalLight position={[-5, -3, 5]} intensity={0.4} />
        <directionalLight position={[0, 5, -10]} intensity={0.3} />

        <Model path={modelPath} />

        <OrbitControls
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}
