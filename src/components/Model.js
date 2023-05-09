import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Text, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import useZoomLevel from "./useZoomLevel";

export default function Model({ toggleState, liftData }) {
  const gltf = useLoader(GLTFLoader, "./LaPlagne_crop.glb");

  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const zoomLevel = useZoomLevel(boundingBox);

  const hasAncestorWithName = (object, name) => {
    while (object) {
      if (object.name === name) return true;
      object = object.parent;
    }
    return false;
  };

  const initializeMeshes = () => {
    const emptyObjects = [];
    const liftObjects = [];
    const runMeshes = [];

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (hasAncestorWithName(child, "Topography")) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new THREE.MeshStandardMaterial({
            color: "white",
            side: THREE.DoubleSide,
            roughness: 0.3,
          });
        } else if (hasAncestorWithName(child, "Buildings")) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      } else if (
        (child.type === "Group" || child.type === "Object3D") &&
        child.name.startsWith("Town_")
      ) {
        emptyObjects.push(child);
      }
      if (child.name.startsWith("Lift_")) {
        child.castShadow = true;
        liftObjects.push(child);
      }
      if (child.name.startsWith("Run_")) {
        runMeshes.push(child);
      }
    });

    return { emptyObjects, liftObjects, runMeshes };
  };

  const { emptyObjects, liftObjects, runMeshes } = initializeMeshes();

  const towns = emptyObjects.map((obj) => {
    const name = obj.name
      .split("_")
      .slice(1)
      .join(" "); // Split the name and join with a space
    return {
      name: name,
      position: obj.position,
    };
  });

  const lifts = liftObjects.map((obj) => {
    const name = obj.name
      .split("_")
      .slice(1)
      .join(" ");
    const lift = liftData().skiLifts.find((lift) => lift.name === name);
    const status = lift ? lift.status : "unknown";
    console.log(name, status);

    return {
      name: name,
      position: obj.position,
      status: status,
    };
  });

  useEffect(() => {
    runMeshes.forEach((child) => {
      child.visible = toggleState.runs;
    });
  }, [toggleState.runs]);

  return (
    <>
      <primitive object={gltf.scene} />
      {toggleState.resortLabels &&
        towns.map((obj) => (
          <Text
            key={obj.name}
            position={[obj.position.x, obj.position.y + 1.2, obj.position.z]}
            rotation={[Math.PI / 2, Math.PI, 0]}
            color={"black"}
            fontSize={0.4}
            fillOpacity={zoomLevel}
            font="./Rubik-Medium.ttf"
          >
            {obj.name.toUpperCase()}
          </Text>
        ))}
      {toggleState.liftLabels &&
        lifts.map((obj) => (
          <>
            <Text
              key={obj.name}
              position={[obj.position.x, obj.position.y + 0.2, obj.position.z]}
              rotation={[0, Math.PI, 0]}
              color={"black"}
              fontSize={0.1}
              outlineWidth={0.015}
              outlineColor={"white"}
              font="./Rubik-Medium.ttf"
              toneMapped={false}
            >
              {obj.name.toUpperCase()}
            </Text>
            <Sphere
              key={obj.name + "indicator"}
              position={[obj.position.x, obj.position.y + 0.06, obj.position.z]}
              args={[0.035, 16, 16]}
            >
              <meshBasicMaterial
                color={obj.status === "open" ? "green" : "red"}
              />
            </Sphere>
          </>
        ))}
    </>
  );
}
