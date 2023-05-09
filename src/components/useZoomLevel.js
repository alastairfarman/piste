import { useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const useZoomLevel = (boundingBox) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const { camera } = useThree();

  useFrame(() => {
    const closestPoint = new THREE.Vector3();
    boundingBox.clampPoint(camera.position, closestPoint);
    const distance = camera.position.distanceTo(closestPoint);
    const calculatedZoomLevel = Math.min(distance / 10, 1);

    if (zoomLevel !== calculatedZoomLevel) {
      setZoomLevel(calculatedZoomLevel);
    }
  });

  return zoomLevel;
};

export default useZoomLevel;
