import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function FloatingParticles({ count = 800 }) {
  const meshRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const colorPalette = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#10f0a0'),
      new THREE.Color('#0080ff'),
      new THREE.Color('#ec4899'),
    ]

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 80
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.04 + mouse.current.x * 0.15
      meshRef.current.rotation.x = Math.sin(t * 0.03) * 0.1 + mouse.current.y * 0.1
    }
  })

  // Track mouse globally
  useMemo(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function GeometricShapes() {
  const group = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = t * 0.05
      group.current.rotation.x = Math.sin(t * 0.04) * 0.15
    }
  })

  return (
    <group ref={group}>
      {/* Wireframe icosahedra scattered around */}
      {[
        [-12, 5, -8],
        [14, -4, -12],
        [-6, -10, 5],
        [8, 10, -5],
        [-15, 2, 10],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <icosahedronGeometry args={[1.2 + i * 0.4, 0]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}
      {/* Octahedra */}
      {[
        [5, -8, 8],
        [-10, 8, -6],
        [18, 5, 2],
      ].map((pos, i) => (
        <mesh key={`oct-${i}`} position={pos}>
          <octahedronGeometry args={[0.8 + i * 0.3, 0]} />
          <meshBasicMaterial
            color="#10f0a0"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-0" style={{ background: 'radial-gradient(ellipse at center, #0a0520 0%, #030310 60%, #020208 100%)' }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 200 }}
        gl={{ antialias: false, alpha: false }}
      >
        {/* Deep space star background */}
        <Stars
          radius={120}
          depth={60}
          count={3000}
          factor={3}
          saturation={0.3}
          fade
          speed={0.5}
        />

        {/* Custom particles */}
        <FloatingParticles count={700} />

        {/* Wireframe shapes */}
        <GeometricShapes />

        {/* Ambient deep blue light */}
        <ambientLight intensity={0.2} color="#00d4ff" />
        <pointLight position={[20, 20, 10]} intensity={0.5} color="#a855f7" />
        <pointLight position={[-20, -10, 5]} intensity={0.3} color="#00d4ff" />
      </Canvas>

      {/* Gradient vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(3, 3, 16, 0.6) 100%)',
        }}
      />
    </div>
  )
}
