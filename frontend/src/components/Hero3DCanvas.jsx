import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3DCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Scene Setup
    const scene = new THREE.Scene()

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 4.5

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 4. 3D Object Group
    const group = new THREE.Group()
    scene.add(group)

    // Outer Wireframe / Geometric Mesh (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.8, 2)
    
    // Shader-like Material with neon gradient glow
    const wireframeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.3,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
    })
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial)
    group.add(wireframeMesh)

    // Inner Core Sphere with metallic shine
    const coreGeometry = new THREE.IcosahedronGeometry(0.9, 1)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    })
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
    group.add(coreMesh)

    // Floating Particles around the 3D Object
    const particlesCount = 200
    const particlesGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    const color1 = new THREE.Color(0x6366f1)
    const color2 = new THREE.Color(0x06b6d4)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position particles in a spherical radius
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 2.5 + Math.random() * 1.5

      positions[i] = r * Math.sin(phi) * Math.cos(theta)
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i + 2] = r * Math.cos(phi)

      // Gradient color interpolation
      const mixedColor = color1.clone().lerp(color2, Math.random())
      colors[i] = mixedColor.r
      colors[i + 1] = mixedColor.g
      colors[i + 2] = mixedColor.b
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial)
    group.add(particleSystem)

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    // Interactive Point Light following the mouse in 3D
    const pointLight = new THREE.PointLight(0x06b6d4, 3, 10)
    pointLight.position.set(2, 2, 3)
    scene.add(pointLight)

    const purpleLight = new THREE.PointLight(0xa855f7, 2, 10)
    purpleLight.position.set(-2, -2, 2)
    scene.add(purpleLight)

    // 6. Interactive Mouse Physics
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      mouseX = (x / container.clientWidth) * 2 - 1
      mouseY = -(y / container.clientHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 7. Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth interpolation for interactive mouse rotation (Ease/Damping)
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Continuous ambient rotations
      wireframeMesh.rotation.x = elapsedTime * 0.15 + targetY * 0.8
      wireframeMesh.rotation.y = elapsedTime * 0.2 + targetX * 0.8

      coreMesh.rotation.x = -elapsedTime * 0.2
      coreMesh.rotation.y = -elapsedTime * 0.25

      particleSystem.rotation.y = elapsedTime * 0.05

      // Light response to mouse position
      pointLight.position.x = targetX * 3
      pointLight.position.y = targetY * 3

      // Floating oscillation effect
      group.position.y = Math.sin(elapsedTime * 1.5) * 0.1

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // 8. Handle Window Resize
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // 9. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      // Dispose geometry and materials to free GPU memory
      geometry.dispose()
      wireframeMaterial.dispose()
      coreGeometry.dispose()
      coreMaterial.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-[420px] lg:h-[550px] relative z-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  )
}
