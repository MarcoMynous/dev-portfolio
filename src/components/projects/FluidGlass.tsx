'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, useFBO, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import styles from './FluidGlass.module.css';

type LensProps = { scale?: number; ior?: number; thickness?: number; chromaticAberration?: number; anisotropy?: number };
type FluidGlassProps = {
  mode?: 'lens' | 'bar' | 'cube';
  lensProps?: LensProps;
};

// Tune these two values only. Lower follow damping feels heavier/slower; higher is more immediate.
const CURSOR_FOLLOW_DAMPING = 0.01;
const CURSOR_ROTATION_RESPONSE = 99;

function Lens({ scale = 0.25, ior = 1.15, thickness = 5, chromaticAberration = 0.1, anisotropy = 0.01 }: Required<LensProps>) {
  const mesh = useRef<THREE.Mesh>(null);
  const mountain = useTexture('/images/project-portal.webp');
  const buffer = useFBO();
  const { gl, camera, viewport } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const followPointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', followPointer, { passive: true });
    return () => window.removeEventListener('pointermove', followPointer);
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    easing.damp3(mesh.current.position, [pointer.current.x * viewport.width * 0.42, pointer.current.y * viewport.height * 0.42, 0], CURSOR_FOLLOW_DAMPING, delta);
    mesh.current.rotation.x += (-pointer.current.y * 0.28 - mesh.current.rotation.x) * Math.min(1, delta * CURSOR_ROTATION_RESPONSE);
    mesh.current.rotation.y += (pointer.current.x * 0.28 - mesh.current.rotation.y) * Math.min(1, delta * CURSOR_ROTATION_RESPONSE);
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return <>
    {createPortal(<mesh position={[0, 0, -5]} scale={[viewport.width * 2, viewport.height * 2, 1]}><planeGeometry /><meshBasicMaterial map={mountain} toneMapped={false} /></mesh>, scene)}
    <mesh ref={mesh} scale={scale * 6}>
      <sphereGeometry args={[1, 96, 96]} />
      <MeshTransmissionMaterial buffer={buffer.texture} transmission={1} roughness={0.012} ior={ior} thickness={thickness} chromaticAberration={chromaticAberration} anisotropy={anisotropy} distortion={0.16} distortionScale={0.15} temporalDistortion={0.045} color="#eef7ff" />
    </mesh>
  </>;
}

export default function FluidGlass({ mode = 'lens', lensProps = {} }: FluidGlassProps) {
  if (mode !== 'lens') return null;
  return <div className={styles.glass} aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 8], fov: 24 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}>
      <ambientLight intensity={1.8} color="#a9cbff" />
      <directionalLight position={[3, 4, 4]} intensity={2.2} color="#ffffff" />
      <Suspense fallback={null}><Lens scale={lensProps.scale ?? 0.25} ior={lensProps.ior ?? 1.15} thickness={lensProps.thickness ?? 5} chromaticAberration={lensProps.chromaticAberration ?? 0.1} anisotropy={lensProps.anisotropy ?? 0.01} /></Suspense>
    </Canvas>
  </div>;
}
