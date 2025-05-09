"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  PerspectiveCamera,
  OrbitControls,
  Text,
  MeshDistortMaterial,
  GradientTexture,
  PointMaterial,
  Points,
  Billboard,
} from "@react-three/drei"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { useSkills, type Skill } from "./skill-context"
import { motion } from "framer-motion-3d"
import type * as THREE from "three"
import { Vector3 } from "three"
import { useSpring, animated } from "@react-spring/three"

// Central Orb Component
function CentralOrb({ isMenuOpen }: { isMenuOpen: boolean }) {
  const orbRef = useRef<THREE.Mesh>(null)
  const { selectedSkill } = useSkills()

  // Pulse animation
  const [scale, setScale] = useState(1)
  const [direction, setDirection] = useState(1)

  useFrame((state, delta) => {
    if (orbRef.current) {
      // Gentle rotation
      orbRef.current.rotation.y += delta * 0.2

      // Pulse animation
      setScale((prev) => {
        const newScale = prev + direction * delta * 0.05
        if (newScale > 1.1) setDirection(-1)
        if (newScale < 0.9) setDirection(1)
        return newScale
      })

      orbRef.current.scale.set(scale, scale, scale)

      // Auto-rotation when menu is closed
      if (!isMenuOpen) {
        state.camera.position.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 5
        state.camera.position.z = Math.cos(state.clock.getElapsedTime() * 0.3) * 5
        state.camera.lookAt(0, 0, 0)
      }
    }
  })

  // Change color based on selected skill
  const orbColor = selectedSkill ? selectedSkill.color : "#ffffff"

  return (
    <motion.mesh ref={orbRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial color={orbColor} distort={0.4} speed={2} transparent opacity={0.8}>
        <GradientTexture stops={[0, 0.5, 1]} colors={["#ffffff", orbColor, "#000000"]} />
      </MeshDistortMaterial>

      {/* Inner glow */}
      <pointLight color={orbColor} intensity={2} distance={3} />

      {/* Particles around orb */}
      <OrbParticles color={orbColor} />
    </motion.mesh>
  )
}

// Particles around the orb
function OrbParticles({ color }: { color: string }) {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 100

  // Generate random positions for particles
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 1.2 + Math.random() * 0.8
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * radius
    positions[i * 3 + 2] = Math.sin(angle) * radius
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <Points ref={particlesRef} positions={positions} stride={3}>
      <PointMaterial transparent color={color} size={0.05} sizeAttenuation depthWrite={false} blending={2} />
    </Points>
  )
}

// Skill Node Component
function SkillNode({ skill }: { skill: Skill }) {
  const { selectedSkill, setSelectedSkill, unlockSkill } = useSkills()
  const nodeRef = useRef<THREE.Mesh>(null)
  const isSelected = selectedSkill?.id === skill.id

  // Animation for hover and selection
  const { scale } = useSpring({
    scale: isSelected ? 1.2 : 1,
    config: { tension: 300, friction: 10 },
  })

  // Glow effect for unlocked skills
  const glowIntensity = skill.unlocked ? 1 + skill.level * 0.5 : 0.2

  useFrame((state, delta) => {
    if (nodeRef.current) {
      // Gentle floating animation
      nodeRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 2 + skill.position[0]) * delta * 0.05
    }
  })

  const handleClick = () => {
    setSelectedSkill(skill)
  }

  return (
    <animated.group position={skill.position} scale={scale} onClick={handleClick}>
      {/* Skill node sphere */}
      <mesh ref={nodeRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={glowIntensity}
          transparent
          opacity={0.8}
        />

        {/* Glow light */}
        <pointLight color={skill.color} intensity={glowIntensity * 2} distance={2} />
      </mesh>

      {/* Skill icon */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text position={[0, 0, 0.6]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          {skill.icon}
        </Text>
      </Billboard>

      {/* Skill name */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text position={[0, -0.8, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          {skill.name}
        </Text>
      </Billboard>
    </animated.group>
  )
}

// Connection Lines Component
function ConnectionLines() {
  const { skills } = useSkills()

  return (
    <group>
      {skills.map((skill) => (
        <ConnectionLine
          key={skill.id}
          start={[0, 0, 0]}
          end={skill.position}
          color={skill.color}
          unlocked={skill.unlocked}
          level={skill.level}
        />
      ))}
    </group>
  )
}

// Individual Connection Line
function ConnectionLine({
  start,
  end,
  color,
  unlocked,
  level,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  unlocked: boolean
  level: number
}) {
  const lineRef = useRef<THREE.Line>(null)
  const dashSize = 0.1
  const gapSize = 0.1

  // Calculate points for dashed line
  const points = []
  const startVec = new Vector3(...start)
  const endVec = new Vector3(...end)
  const direction = endVec.clone().sub(startVec).normalize()
  const distance = startVec.distanceTo(endVec)

  let currentDist = 0
  let isDash = true

  while (currentDist < distance) {
    if (isDash) {
      const dashEnd = Math.min(currentDist + dashSize, distance)
      points.push(
        startVec.clone().add(direction.clone().multiplyScalar(currentDist)),
        startVec.clone().add(direction.clone().multiplyScalar(dashEnd)),
      )
      currentDist = dashEnd
    } else {
      currentDist += gapSize
    }
    isDash = !isDash
  }

  // Animation for line
  useFrame((state, delta) => {
    if (lineRef.current) {
      // Rotate the line slightly for a more dynamic effect
      lineRef.current.rotation.z += delta * 0.1

      // Pulse effect for unlocked lines
      if (unlocked) {
        const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.5 + 0.5
        lineRef.current.material.opacity = 0.3 + pulse * 0.7
      }
    }
  })

  // Line opacity and width based on unlock status
  const lineOpacity = unlocked ? 0.8 : 0.3
  const lineWidth = unlocked ? 2 + level : 1

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={color} transparent opacity={lineOpacity} linewidth={lineWidth} />
    </line>
  )
}

// Main 3D Scene Component
function Scene({ isMenuOpen }: { isMenuOpen: boolean }) {
  const { skills } = useSkills()

  return (
    <>
      {/* Central orb */}
      <CentralOrb isMenuOpen={isMenuOpen} />

      {/* Connection lines */}
      <ConnectionLines />

      {/* Skill nodes */}
      {skills.map((skill) => (
        <SkillNode key={skill.id} skill={skill} />
      ))}

      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  )
}

// Main Canvas Component
export function SkillsCanvas({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />

        {/* Scene content */}
        <Scene isMenuOpen={isMenuOpen} />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
        </EffectComposer>

        {/* Controls - only enabled when menu is open */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={isMenuOpen}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}
