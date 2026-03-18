"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { Stars, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

function AnimatedSphere({ position, size, speed, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * speed) * 0.5
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} envMapIntensity={0.8} />
    </mesh>
  )
}

function FloatingCube({ position, size, speed, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * speed) * 0.5
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.4
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} envMapIntensity={0.8} />
    </mesh>
  )
}

function Scene() {
  const ref = useRef<THREE.Group>(null)
  const isInView = useInView(ref)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={ref}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3eeaac" />

      <AnimatedSphere position={[-4, 0, -5]} size={1} speed={0.5} color="#3eeaac" />
      <AnimatedSphere position={[4, 0, -10]} size={1.5} speed={0.3} color="#3e8eea" />
      <FloatingCube position={[8, 2, -15]} size={2} speed={0.2} color="#ea3e8e" />
      <FloatingCube position={[-8, -2, -12]} size={1.5} speed={0.4} color="#eaac3e" />

      <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />
    </group>
  )
}

export function ThreeDBackground() {
  return (
    <Canvas className="bg-black">
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}
