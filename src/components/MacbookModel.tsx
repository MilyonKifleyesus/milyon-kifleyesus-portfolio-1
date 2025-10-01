"use client";

import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';

interface MacBookProps {
  open: boolean;
  onClick: () => void;
}

function FallbackBox({ open, onClick }: MacBookProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);

  // Update target when open changes
  useEffect(() => {
    targetRotation.current = open ? -Math.PI / 2.5 : 0;
  }, [open]);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Floating animation
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;

    // Smooth lid rotation
    if (lidRef.current) {
      currentRotation.current = THREE.MathUtils.lerp(
        currentRotation.current,
        targetRotation.current,
        Math.min(delta * 3.5, 1)
      );
      lidRef.current.rotation.x = currentRotation.current;

      // Update position based on rotation
      const progress = Math.abs(currentRotation.current / (targetRotation.current || 1));
      lidRef.current.position.y = -1.4 + progress * 1.4;
      lidRef.current.position.z = -1.5 + progress * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => {
        if (typeof document !== 'undefined') {
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        if (typeof document !== 'undefined') {
          document.body.style.cursor = 'auto';
        }
      }}
    >
      {/* Laptop base */}
      <mesh ref={meshRef} position={[0, -1.5, 0]}>
        <boxGeometry args={[4, 0.15, 3]} />
        <meshStandardMaterial
          color="#0A7D71"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Laptop screen lid */}
      <mesh ref={lidRef} position={[0, -1.4, -1.5]}>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Screen display when open */}
      {open && (
        <mesh
          position={[0, 0, -1.25]}
          rotation={[-Math.PI / 2.5, 0, 0]}
        >
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
    <div className="w-full h-full relative">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Enhanced lighting setup */}
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ffffff" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <ambientLight intensity={0.4} />

        <FallbackBox open={open} onClick={() => setOpen(!open)} />
        <Environment preset="city" />

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
      </Canvas>

      {/* Interactive overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
          <p className="text-muted-foreground text-sm font-medium transition-all duration-300">
            {open ? 'Click to close' : 'Click to open'}
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
          3D Model
        </div>
      </div>
    </div>
  );
}