import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { GridHelper } from "three";
import { useThree } from "@react-three/fiber";



//foundation 
//axis of rotation from the foundation(or from any rotation point)
//create rotating joint

/*
    A robotic arm consists of a foundation that rotates the entire structure
    the first joint can move freely(180deg) on the y-plane
*/

function Ground() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <boxGeometry args={[100, 1, 100]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function GroundGrid() {
    const { scene } = useThree();
    React.useEffect(() => {
      const grid = new GridHelper(100, 100);
      scene.add(grid);
      return () => scene.remove(grid);
    }, [scene]);
    return null;
  }


function ArmSegment() {
    const meshRef = useRef();
    const t = useRef(0);
  
    const radiusTop = 4;
    const radiusBottom = 4;
    const height = 20;
    const radialSegments = 12;
  
    // Animate rotation
    useFrame(() => {
      t.current += 0.01;
      meshRef.current.rotation.z = Math.sin(t.current); // example rotation
    });
  
    return (
      <group ref={meshRef}>
        <mesh position={[0, height / 2, 0]}>
          <cylinderGeometry
            args={[radiusTop, radiusBottom, height, radialSegments]}
          />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>
    );
  }

function RotatingJoint () {
    return (
        <mesh>

        </mesh>
    )
}

function Scene() {
  return (
    <Canvas 
        style={{ width: "70vw", height: "100vh" }}
        camera={{ position: [10, 100, 100], fov: 50 }}
    >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} />
        <Ground />
        <ArmSegment />
        <OrbitControls />
    </Canvas>
  );
}

export default Scene;