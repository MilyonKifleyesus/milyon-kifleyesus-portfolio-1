"use client";

import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';

interface ModelProps {
  open: boolean;
}

function FallbackBox({ open }: { open: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Subtle floating animation
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    groupRef.current.position.y = open ? Math.sin(t) * 0.3 - 1 : -2;
  });

  return (
    <group ref={groupRef}>
      {/* Laptop base */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.15, 3]} />
        <meshStandardMaterial 
          color="#0A7D71" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Laptop screen */}
      <mesh position={[0, open ? 1.5 : 0.1, open ? -1.3 : -1.5]} rotation={[open ? -Math.PI / 3 : 0, 0, 0]}>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Screen display */}
      {open && (
        <mesh position={[0, 1.5, -1.25]} rotation={[-Math.PI / 3, 0, 0]}>
          <planeGeometry args={[3.6, 2.2]} />
          <meshStandardMaterial 
            color="#0C9081" 
            emissive="#0A7D71"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
    </group>
  );
}

export default function MacbookModel() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full h-full relative cursor-pointer">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 50 }}>
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <ambientLight intensity={0.3} />
        
        <Suspense fallback={null}>
          <group
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}>
            <FallbackBox open={open} />
          </group>
          <Environment preset="city" />
        </Suspense>
        
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
        />
      </Canvas>
      
      {/* Click instruction overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <p className="text-muted-foreground/60 text-sm font-medium">
          {open ? 'Click to close' : 'Click to open'}
        </p>
      </div>
    </div>
  );
}