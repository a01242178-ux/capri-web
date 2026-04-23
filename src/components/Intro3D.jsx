import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import './Intro3D.css'

export default function Intro3D({ onComplete }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const bodiesRef = useRef([])
  const animationIdRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a1a)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xff4444, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Physics world
    const world = new CANNON.World()
    world.gravity.set(0, -9.82, 0)
    world.defaultContactMaterial.friction = 0.3

    // Create falling meat cubes
    const meatBodies = []
    const geometries = []
    const materials = []
    const meshes = []

    try {
      for (let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        const material = new THREE.MeshPhongMaterial({
          color: 0xB0000B,
          emissive: 0x8B0008,
          shininess: 100
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(
          (Math.random() - 0.5) * 6,
          5 + i * 1.5,
          0
        )
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)
        meshes.push(mesh)

        geometries.push(geometry)
        materials.push(material)

        // Physics body
        const shape = new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25))
        const body = new CANNON.Body({ mass: 1 })
        body.addShape(shape)
        body.position.set(mesh.position.x, mesh.position.y, mesh.position.z)
        body.velocity.set(
          (Math.random() - 0.5) * 2,
          -2,
          0
        )
        world.addBody(body)

        meatBodies.push({ mesh, body })
      }
      bodiesRef.current = meatBodies
    } catch (err) {
      console.error('Error creating meat cubes:', err)
      onComplete()
      return
    }

    // Ground plane (invisible)
    const groundShape = new CANNON.Plane()
    const groundBody = new CANNON.Body({ mass: 0 })
    groundBody.addShape(groundShape)
    groundBody.position.y = -4
    world.addBody(groundBody)

    // Animation loop
    let elapsed = 0
    const duration = 4000 // 4 seconds intro

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      elapsed += 16 // ~60fps

      // Physics step
      world.step(1 / 60)

      // Update mesh positions from physics
      meatBodies.forEach(({ mesh, body }) => {
        mesh.position.copy(body.position)
        mesh.quaternion.copy(body.quaternion)
      })

      // Camera animation (slight zoom/rotation)
      camera.position.z = 5 - (elapsed / duration) * 0.5
      camera.rotation.x = (elapsed / duration) * 0.2

      // Fade out near end
      if (elapsed > duration - 500) {
        renderer.domElement.style.opacity = Math.max(
          0,
          1 - (elapsed - (duration - 500)) / 500
        )
      }

      renderer.render(scene, camera)

      // Complete intro
      if (elapsed >= duration) {
        cancelAnimationFrame(animationIdRef.current)
        onComplete()
      }
    }

    animate()

    // Skip on click/touch
    const handleInteraction = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      onComplete()
    }
    renderer.domElement.addEventListener('click', handleInteraction)
    renderer.domElement.addEventListener('touchstart', handleInteraction)

    // Handle window resize
    const handleResize = () => {
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      try {
        window.removeEventListener('resize', handleResize)
        if (renderer && renderer.domElement) {
          renderer.domElement.removeEventListener('click', handleInteraction)
          renderer.domElement.removeEventListener('touchstart', handleInteraction)
          if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement)
          }
        }
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
        }
        geometries.forEach(g => g?.dispose?.())
        materials.forEach(m => m?.dispose?.())
        meshes.forEach(m => {
          scene.remove(m)
          m.geometry?.dispose?.()
          m.material?.dispose?.()
        })
        renderer?.dispose?.()
      } catch (err) {
        console.error('Error in Intro3D cleanup:', err)
      }
    }
  }, [onComplete])

  return <div ref={containerRef} className="intro3d-container" />
}
