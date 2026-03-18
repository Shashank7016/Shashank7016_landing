"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { Stars, PerspectiveCamera, OrbitControls, Cloud, Float } from "@react-three/drei"
import * as THREE from "three" // Import THREE properly without 'type'

// Planet component with fallback colors instead of textures
function Planet({ position, size, rotationSpeed, color = "#3498db", rings = false }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
      </mesh>

      {rings && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[size * 1.3, size * 1.8, 64]} />
          <meshStandardMaterial color="#a89984" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

// Nebula cloud component
function Nebula({ position, color, size }: any) {
  return (
    <group position={position}>
      <Cloud opacity={0.5} speed={0.4} width={size} depth={size / 2} segments={20} color={color} />
    </group>
  )
}

// Asteroid component
function Asteroid({ position, size, speed }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create a random, jagged geometry for the asteroid
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(size, 1)
    const positions = geo.attributes.position

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)

      // Add some randomness to the vertices
      positions.setXYZ(
        i,
        x + (Math.random() - 0.5) * size * 0.2,
        y + (Math.random() - 0.5) * size * 0.2,
        z + (Math.random() - 0.5) * size * 0.2,
      )
    }

    return geo
  }, [size])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.5
      meshRef.current.rotation.z = clock.getElapsedTime() * speed * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshStandardMaterial color="#8d8d8d" roughness={0.8} />
      </mesh>
    </Float>
  )
}

// Main scene component
function SpaceScene({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Group>(null)
  const isInView = useInView(ref)

  // Calculate camera position based on scroll
  const cameraY = -scrollProgress * 50

  useFrame(({ camera }) => {
    // Move camera down as user scrolls
    camera.position.y = cameraY

    if (ref.current) {
      // Slow rotation of the entire scene
      ref.current.rotation.y = scrollProgress * 0.2
    }
  })

  return (
    <group ref={ref}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3eeaac" />

      {/* First section - Near Earth */}
      <Planet position={[0, 10, -15]} size={5} rotationSpeed={0.01} color="#2980b9" />

      {/* Asteroid belt section */}
      <group position={[0, -30, 0]}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Asteroid
            key={i}
            position={[(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 100]}
            size={Math.random() * 0.5 + 0.2}
            speed={Math.random() * 0.2 + 0.1}
          />
        ))}
      </group>

      {/* Nebula section */}
      <group position={[0, -80, 0]}>
        <Nebula position={[-20, 0, -30]} color="#ff5588" size={30} />
        <Nebula position={[20, 10, -20]} color="#5588ff" size={25} />
      </group>

      {/* Gas giant planet section */}
      <Planet position={[15, -130, -20]} size={8} rotationSpeed={0.005} color="#e74c3c" />

      {/* Ringed planet section */}
      <Planet position={[-20, -180, -25]} size={6} rotationSpeed={0.007} color="#f39c12" rings={true} />

      {/* Deep space section */}
      <group position={[0, -250, 0]}>
        <Nebula position={[0, 0, -40]} color="#8855ff" size={50} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      </group>

      {/* Background stars */}
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
    </group>
  )
}

export function EnhancedThreeDBackground({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <Canvas className="bg-black">
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={75} />
      <SpaceScene scrollProgress={scrollProgress} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}
