"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

export default function CADViewer({ modelPath }: { modelPath: string }) {
  return (
    <div className="w-full h-full bg-[#f1f1f1] rounded-xl p-3 shadow-inner">
      <Canvas
        camera={{ fov: 45 }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
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

        {/* Soft base */}
        <ambientLight intensity={0.6} />

        {/* Key light */}
        <directionalLight position={[5, 8, 10]} intensity={0.9} />

        {/* Fill light */}
        <directionalLight position={[-5, -3, 5]} intensity={0.4} />

        {/* Rim light */}
        <directionalLight position={[0, 5, -10]} intensity={0.3} />

        <Model path={modelPath} />
        <OrbitControls enableDamping />

      </Canvas>
    </div>
  );
}
