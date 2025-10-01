"use client";

import * as THREE from 'three';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF, PerspectiveCamera } from '@react-three/drei';

interface MacBookProps {
  open: boolean;
  onClick: () => void;
}

/**
 * Main MacBook 3D Model Component
 * Loads the GLB file and handles lid animation
 */
function MacBook({ open, onClick }: MacBookProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/mac-draco.glb') as any;

  // Clone the scene to avoid shared state between instances
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  // References for lid animation
  const lidRef = useRef<THREE.Group | THREE.Mesh | null>(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  /**
   * Find and cache the lid mesh on mount
   * Searches for common naming patterns used in 3D modeling software
   */
  useEffect(() => {
    if (!clonedScene) return;

    // Common naming patterns for laptop lid/screen in 3D models
    const lidNames = [
      'top', 'lid', 'screen', 'display',
      'Top', 'Lid', 'Screen', 'Display',
      'matte', 'cover', 'upper'
    ];

    clonedScene.traverse((child: any) => {
      if (child.isMesh || child.isGroup) {
        const childName = (child.name || '').toLowerCase();

        // Check if this is the lid based on common naming patterns
        if (lidNames.some(name => childName.includes(name.toLowerCase()))) {
          lidRef.current = child;

          // Store original rotation for reference
          if (!child.userData.originalRotation) {
            child.userData.originalRotation = child.rotation.x;
          }

          console.log('✅ Lid mesh found:', child.name);
        }
      }
    });

    if (!lidRef.current) {
      console.warn('⚠️ Lid mesh not found. Animation may not work.');
    }
  }, [clonedScene]);

  /**
   * Update target rotation when open state changes
   * -Math.PI * 0.4 = approximately 72 degrees (realistic laptop opening angle)
   */
  useEffect(() => {
    targetRotation.current = open ? -Math.PI * 0.4 : 0;
  }, [open]);

  /**
   * Animation loop - runs every frame (60fps)
   * Handles floating animation and smooth lid rotation
   */
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle floating animation for visual interest
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.04;

    // Smooth lid rotation using lerp (linear interpolation)
    if (lidRef.current) {
      const lerpSpeed = 3.5; // Adjust for faster/slower animation

      currentRotation.current = THREE.MathUtils.lerp(
        currentRotation.current,
        targetRotation.current,
        Math.min(delta * lerpSpeed, 1) // Clamped for frame-rate independence
      );

      // Apply rotation relative to original position
      const originalRot = lidRef.current.userData.originalRotation || 0;
      lidRef.current.rotation.x = originalRot + currentRotation.current;
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
      <primitive
        object={clonedScene}
        scale={2.5}
        position={[0, -1.5, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

/**
 * Fallback geometric MacBook
 * Used when GLB model fails to load or during loading
 * Replicates the lid animation behavior
 */
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

      // Update position based on rotation for realistic movement
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

/**
 * Smart wrapper that tries to load the 3D model
 * Falls back to geometric shapes if loading fails
 */
function ModelWithFallback({ open, onClick }: MacBookProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to preload the model
    const loadModel = async () => {
      try {
        await useGLTF.preload('/mac-draco.glb');
        setIsLoading(false);
      } catch (error) {
        console.warn('Failed to load 3D model, using fallback:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadModel();
  }, []);

  // Use fallback if there's an error
  if (hasError) {
    return <FallbackBox open={open} onClick={onClick} />;
  }

  return (
    <Suspense fallback={<FallbackBox open={open} onClick={onClick} />}>
      <ErrorBoundary onError={() => setHasError(true)}>
        <MacBook open={open} onClick={onClick} />
      </ErrorBoundary>
    </Suspense>
  );
}

/**
 * Error boundary for catching 3D model loading errors
 * Ensures the app doesn't crash if the model fails to load
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('3D Model Error:', error.message);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

/**
 * Responsive Camera Component
 * Adjusts camera position and FOV based on screen size
 */
function ResponsiveCamera() {
  const { viewport, size } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (!cameraRef.current) return;

    // Adjust camera based on screen size
    const width = size.width;

    if (width < 640) {
      // Mobile - zoom out more to show full model
      cameraRef.current.position.set(0, 0, 12);
      cameraRef.current.fov = 65;
    } else if (width < 1024) {
      // Tablet - moderate zoom
      cameraRef.current.position.set(0, 0, 10);
      cameraRef.current.fov = 60;
    } else {
      // Desktop - optimal zoom for large screens
      cameraRef.current.position.set(0, 0, 8);
      cameraRef.current.fov = 55;
    }

    // CRITICAL: Update projection matrix after FOV change
    cameraRef.current.updateProjectionMatrix();
  }, [size.width, viewport.width]);

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} fov={55} />;
}

/**
 * Main MacbookModel Component
 * Exports the complete 3D scene with canvas, lighting, and interactions
 */
export default function MacbookModel() {
  const [open, setOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Canvas
        dpr={[1, 2]} // Retina display support
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* Responsive Camera - adjusts to screen size */}
        <ResponsiveCamera />

        {/* Enhanced lighting setup for realistic rendering */}
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

        {/* Model with loading states */}
        <Suspense fallback={null}>
          <group onClick={() => setOpen(!open)}>
            <ModelWithFallback open={open} onClick={() => setOpen(!open)} />
          </group>

          {/* HDR environment for realistic reflections */}
          <Environment preset="city" />
        </Suspense>

        {/* Contact shadows for grounding the model */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
      </Canvas>

      {/* Interactive overlay - Responsive positioning */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border">
          <p className="text-muted-foreground text-xs sm:text-sm font-medium transition-all duration-300">
            {open ? 'Click to close' : 'Click to open'}
          </p>
        </div>
      </div>

      {/* Loading indicator - Responsive */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 pointer-events-none">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground/60">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/60 animate-pulse" />
          <span className="hidden sm:inline">3D Model</span>
        </div>
      </div>
    </div>
  );
}

// Preload the model on module import for faster initial load
if (typeof window !== 'undefined') {
  useGLTF.preload('/mac-draco.glb');
}
