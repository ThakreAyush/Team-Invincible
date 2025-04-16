// src/components/EarthCanvas.jsx
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

const PollutionParticles = () => {
  const particlesRef = useRef()

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
    }
  })

  const count = 3000
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff0000"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.4}
      />
    </points>
  )
}

const Earth = () => {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#00ffae"
        emissive="#0aff9d"
        emissiveIntensity={0.3}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  )
}

const EarthCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} className="absolute inset-0 z-0">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <Stars radius={100} depth={50} count={4000} factor={4} fade />
      
      <Earth />
      <PollutionParticles />
    </Canvas>
  )
}

export default EarthCanvas
