"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

type ModelProps = {
  path: string;
};

export default function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);

  useEffect(() => {
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    // Center model
    scene.position.sub(center);
    scene.updateMatrixWorld(true);

    // Fix CAD shading
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry.computeVertexNormals();
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

useGLTF.preload("/models/silent_float_assy.glb");