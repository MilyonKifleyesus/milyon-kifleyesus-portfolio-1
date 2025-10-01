"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FIX: Zoom-Out / Framing (numbers-only changes)
 * - Camera moved farther back (Z) with responsive thresholds
 * - Narrowed FOV on larger screens to avoid distortion while still fitting model
 * - Slightly reduced model scale to guarantee full-frame visibility
 * - Kept all other behavior unchanged (lights, interactions, animations)
 * 
 * Dependencies:
 *  - react 19+
 *  - three 0.178.x
 *  - @react-three/fiber 8.17.10
 *  - @react-three/drei 9.114.3
 * 
 * IMPORTANT: Only numeric values affecting zoom/framing were modified.
 * No new features/components added; no non-zoom logic altered.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as THREE from 'three';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF, PerspectiveCamera } from '@react-three/drei';

extend(THREE);

interface MacBookProps {
  open: boolean;
  onClick: () => void;
}

/**
 * 3D MacBook Model (unchanged logic; only scale numeric adjustment)
 */
function MacBook({ open, onClick }: MacBookProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/mac-draco.glb') as any;

  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  const lidRef = useRef<THREE.Group | THREE.Mesh | null>(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  useEffect(() => {
    if (!clonedScene) return;

    const lidNames = [
      'top', 'lid', 'screen', 'display',
      'Top', 'Lid', 'Screen', 'Display',
      'matte', 'cover', 'upper'
    ];

    clonedScene.traverse((child: any) => {
      if (child.isMesh || child.isGroup) {
        const childName = (child.name || '').toLowerCase();
        if (lidNames.some(name => childName.includes(name.toLowerCase()))) {
          lidRef.current = child;
          if (!child.userData.originalRotation) {
            child.userData.originalRotation = child.rotation.x;
          }
        }
      }
    });
  }, [clonedScene]);

  useEffect(() => {
    targetRotation.current = open ? -Math.PI * 0.4 : 0;
  }, [open]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.04;

    if (lidRef.current) {
      const lerpSpeed = 3.5;
      currentRotation.current = THREE.MathUtils.lerp(
        currentRotation.current,
        targetRotation.current,
        Math.min(delta * lerpSpeed, 1)
      );
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
        if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
      }}
    >
      {/* NUMERIC CHANGE: scale reduced from 2.2 → 2.0 to ensure full visibility */}
      <primitive
        object={clonedScene}
        scale={2.0}                // ← zoom-out aid (slightly smaller model)
        position={[0, -1.5, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

/**
 * Fallback geometric MacBook (unchanged except numeric parity retained)
 */
function FallbackBox({ open, onClick }: MacBookProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);

  useEffect(() => {
    targetRotation.current = open ? -Math.PI / 2.5 : 0;
  }, [open]);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;

    if (lidRef.current) {
      currentRotation.current = THREE.MathUtils.lerp(
        currentRotation.current,
        targetRotation.current,
        Math.min(delta * 3.5, 1)
      );
      lidRef.current.rotation.x = currentRotation.current;

      const denom = Math.abs(targetRotation.current) > 1e-6 ? targetRotation.current : -Math.PI / 2.5;
      const progress = Math.abs(currentRotation.current / denom);
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
        if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
      }}
    >
      <mesh ref={meshRef} position={[0, -1.5, 0]}>
        <boxGeometry args={[4, 0.15, 3]} />
        <meshStandardMaterial color="#0A7D71" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh ref={lidRef} position={[0, -1.4, -1.5]}>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {open && (
        <mesh position={[0, 0, -1.25]} rotation={[-Math.PI / 2.5, 0, 0]}>
          <planeGeometry args={[3.6, 2.2]} />
          <meshStandardMaterial color="#0C9081" emissive="#0A7D71" emissiveIntensity={0.3} />
        </mesh>
      )}
    </group>
  );
}

/**
 * Loader wrapper (unchanged)
 */
function ModelWithFallback({ open, onClick }: MacBookProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await useGLTF.preload('/mac-draco.glb');
        if (!mounted) return;
      } catch {
        if (!mounted) return;
        setHasError(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

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
 * Error boundary (unchanged)
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
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Responsive Camera
 * NUMERIC CHANGES ONLY:
 * - Desktop: Z=12, FOV=48 (slightly narrower for realistic proportions)
 * - Tablet:  Z=13, FOV=56
 * - Mobile:  Z=15, FOV=60
 * - Added near/far planes to reduce perspective clipping without affecting look
 */
function ResponsiveCamera() {
  const { viewport, size } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (!cameraRef.current) return;

    const width = size.width;

    if (width < 640) {
      cameraRef.current.position.set(0, 0, 15); // mobile farther back
      cameraRef.current.fov = 60;               // wider to fit on narrow screens
    } else if (width < 1024) {
      cameraRef.current.position.set(0, 0, 13); // tablet medium distance
      cameraRef.current.fov = 56;               // slightly wide for mid screens
    } else {
      cameraRef.current.position.set(0, 0, 12); // desktop optimal distance
      cameraRef.current.fov = 48;               // a touch narrower for realism
    }

    // keep generous frustum to avoid clipping on deep models
    cameraRef.current.near = 0.1;
    cameraRef.current.far = 200;

    cameraRef.current.updateProjectionMatrix();
  }, [size.width, viewport.width]);

  // Default values before first layout pass (already zoomed-out enough)
  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 12]}
      fov={48}
      near={0.1}
      far={200}
    />
  );
}

/**
 * Main Scene (unchanged except zoom-related numeric integrity kept)
 */
export default function MacbookModel() {
  const [open, setOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Camera handles zoom/framing numerically */}
        <ResponsiveCamera />

        {/* Lighting (unchanged) */}
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

        <Suspense fallback={null}>
          <group onClick={() => setOpen(!open)}>
            <ModelWithFallback open={open} onClick={() => setOpen(!open)} />
          </group>
          <Environment preset="city" />
        </Suspense>

        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>

      {/* UI (unchanged) */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border">
          <p className="text-muted-foreground text-xs sm:text-sm font-medium transition-all duration-300">
            {open ? 'Click to close' : 'Click to open'}
          </p>
        </div>
      </div>

      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 pointer-events-none">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground/60">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/60 animate-pulse" />
          <span className="hidden sm:inline">3D Model</span>
        </div>
      </div>
    </div>
  );
}

// Preload model (unchanged)
if (typeof window !== 'undefined') {
  useGLTF.preload('/mac-draco.glb');
}
