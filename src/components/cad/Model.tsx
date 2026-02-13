"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

type ModelProps = {
  path: string;
};

export default function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);
  const { camera } = useThree();

  useEffect(() => {
    scene.updateMatrixWorld(true);

    // Bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    console.log("Model size:", size);

    // Center model
    scene.position.sub(center);
    scene.updateMatrixWorld(true);

    // Camera fit
    const cam = camera as THREE.PerspectiveCamera;
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (cam.fov * Math.PI) / 180;
    const distance = maxDim / (2 * Math.tan(fov / 2));

    cam.position.set(distance * 1.3, distance * 0.9, distance * 1.2);
    cam.near = distance / 100;
    cam.far = distance * 100;
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();

    // Fix CAD shading
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry.computeVertexNormals();
      }
    });
  }, [scene, camera]);

  return <primitive object={scene} />;
}

useGLTF.preload("/models/silent_float_assy.glb");
