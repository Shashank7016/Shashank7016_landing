"use client"

import { useRef, useEffect } from "react"

export function DayBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Cloud properties with more realistic settings
    const clouds: {
      x: number
      y: number
      width: number
      height: number
      speed: number
      opacity: number
      layers: number
      centers: Array<{ x: number; y: number; radius: number }>
    }[] = []

    // Create fewer, more realistic clouds
    for (let i = 0; i < 6; i++) {
      const width = Math.random() * 300 + 200
      const height = Math.random() * 100 + 60
      const layers = Math.floor(Math.random() * 4) + 5

      // Distribute clouds evenly across the screen initially
      const initialX = (canvas.width / 6) * i + (Math.random() * 100 - 50)

      // Pre-generate cloud centers for consistent shape
      const centers = []
      const baseRadius = height / 2

      // Create more varied and realistic cloud shapes
      for (let j = 0; j < layers; j++) {
        centers.push({
          x: width * (j / layers) + Math.random() * width * 0.3 - width * 0.15,
          y: Math.random() * height * 0.6 - height * 0.3,
          radius: baseRadius * (0.6 + Math.random() * 0.8),
        })
      }

      clouds.push({
        x: initialX,
        y: Math.random() * (canvas.height / 4),
        width,
        height,
        speed: Math.random() * 0.1 + 0.03,
        opacity: Math.random() * 0.2 + 0.2,
        layers,
        centers,
      })
    }

    // More realistic birds with animation and bidirectional movement
    const birds = []
    for (let i = 0; i < 6; i++) {
      const direction = Math.random() > 0.5 ? 1 : -1 // Random direction: 1 = right, -1 = left
      birds.push({
        x: direction === 1 ? -20 : canvas.width + 20, // Start position based on direction
        y: Math.random() * (canvas.height / 6) + 50,
        size: Math.random() * 3 + 4, // Size that's visible but not too large
        speed: (Math.random() * 0.5 + 0.3) * direction, // Speed with direction
        wingPosition: Math.random(), // Random starting wing position (0-1)
        wingDirection: 1, // Direction of wing movement (up or down)
        wingSpeed: Math.random() * 0.02 + 0.01, // Speed of wing flapping
        direction: direction, // Store direction for drawing
      })
    }

    // Airplane properties
    const airplane = {
      x: -200,
      y: canvas.height * 0.15,
      speed: 0.3,
      active: false,
      trailOpacity: 0.8,
      trailPoints: [] as { x: number; y: number; opacity: number }[],
      nextAppearance: 7000,
      lastUpdate: 0,
    }

    // Draw a more realistic cloud
    const drawCloud = (
      x: number,
      y: number,
      width: number,
      height: number,
      opacity: number,
      centers: Array<{ x: number; y: number; radius: number }>,
    ) => {
      ctx.save()

      // Create gradient for more realistic shading
      const gradient = ctx.createLinearGradient(x, y - height / 2, x, y + height / 2)
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 1.2})`)
      gradient.addColorStop(1, `rgba(240, 240, 240, ${opacity})`)

      ctx.fillStyle = gradient

      // Draw cloud shape
      ctx.beginPath()

      // Start with the first circle
      if (centers.length > 0) {
        const firstCenter = centers[0]
        ctx.arc(x + firstCenter.x, y + firstCenter.y, firstCenter.radius, 0, Math.PI * 2)
      }

      // Add additional circles and connect them
      for (let i = 1; i < centers.length; i++) {
        const center = centers[i]
        ctx.arc(x + center.x, y + center.y, center.radius, 0, Math.PI * 2)
      }

      ctx.closePath()
      ctx.fill()

      // Add subtle shadow/highlight
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
      centers.forEach((center) => {
        ctx.beginPath()
        ctx.arc(x + center.x, y + center.y - center.radius * 0.2, center.radius * 0.8, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
    }

    // Draw a more realistic bird with wing flapping animation
    const drawBird = (x, y, size, wingPosition, direction) => {
      ctx.save()

      // Flip context for birds flying left
      if (direction === -1) {
        ctx.translate(x, 0)
        ctx.scale(-1, 1)
        x = 0
      }

      // Bird color - solid black for visibility
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"

      // Draw bird body - small oval
      ctx.beginPath()
      ctx.ellipse(x, y, size * 2, size, 0, 0, Math.PI * 2)
      ctx.fill()

      // Draw bird head - small circle
      ctx.beginPath()
      ctx.arc(x + size * 2, y - size * 0.5, size * 0.8, 0, Math.PI * 2)
      ctx.fill()

      // Draw wings with flapping animation
      ctx.beginPath()

      // Top wing
      ctx.moveTo(x, y - size * 0.5)
      ctx.quadraticCurveTo(
        x,
        y - size * (3 + wingPosition * 2), // Control point - higher when wingPosition is higher
        x - size * 3,
        y - size * (1 + wingPosition * 3), // End point - higher when wingPosition is higher
      )

      // Connect to body
      ctx.lineTo(x, y)

      // Bottom wing
      ctx.moveTo(x, y + size * 0.5)
      ctx.quadraticCurveTo(
        x,
        y + size * (1 - wingPosition), // Control point - lower when wingPosition is lower
        x - size * 3,
        y + size * (1 - wingPosition), // End point - lower when wingPosition is lower
      )

      ctx.fill()

      // Draw tail
      ctx.beginPath()
      ctx.moveTo(x - size * 2, y)
      ctx.lineTo(x - size * 4, y - size)
      ctx.lineTo(x - size * 4, y + size)
      ctx.closePath()
      ctx.fill()

      ctx.restore()
    }

    // Draw an airplane
    const drawAirplane = (x: number, y: number) => {
      ctx.save()

      // Draw airplane trail
      airplane.trailPoints.forEach((point, index) => {
        const trailWidth = 2 * (1 - index / airplane.trailPoints.length)
        ctx.strokeStyle = `rgba(255, 255, 255, ${point.opacity})`
        ctx.lineWidth = trailWidth

        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(point.x - 5, point.y)
        ctx.stroke()

        // Reduce opacity over time
        point.opacity -= 0.001
      })

      // Remove faded trail points
      airplane.trailPoints = airplane.trailPoints.filter((point) => point.opacity > 0)

      // Add new trail point
      if (Math.random() > 0.5) {
        airplane.trailPoints.push({
          x,
          y: y + (Math.random() * 2 - 1),
          opacity: 0.8,
        })
      }

      // Draw airplane body
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.moveTo(x + 30, y)
      ctx.lineTo(x - 30, y)
      ctx.lineTo(x - 40, y + 5)
      ctx.lineTo(x - 30, y + 10)
      ctx.lineTo(x + 20, y + 10)
      ctx.lineTo(x + 30, y)
      ctx.fill()

      // Draw cockpit
      ctx.fillStyle = "#a0d0ff"
      ctx.beginPath()
      ctx.arc(x + 20, y + 2, 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw wings
      ctx.fillStyle = "#f0f0f0"
      ctx.beginPath()
      ctx.moveTo(x, y + 5)
      ctx.lineTo(x - 10, y - 15)
      ctx.lineTo(x + 10, y - 15)
      ctx.lineTo(x + 15, y + 5)
      ctx.fill()

      // Draw tail wing
      ctx.beginPath()
      ctx.moveTo(x - 25, y + 5)
      ctx.lineTo(x - 35, y - 10)
      ctx.lineTo(x - 25, y - 10)
      ctx.lineTo(x - 20, y + 5)
      ctx.fill()

      ctx.restore()
    }

    // Animation loop with timestamp for smooth animation
    let lastTime = 0
    const render = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime
      lastTime = timestamp

      // Create realistic sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#1e88e5") // Deeper blue at top
      gradient.addColorStop(0.4, "#64b5f6") // Mid blue
      gradient.addColorStop(1, "#bbdefb") // Light blue at horizon

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw distant mountains for depth
      const mountainGradient = ctx.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height * 0.9)
      mountainGradient.addColorStop(0, "rgba(120, 140, 160, 0.3)")
      mountainGradient.addColorStop(1, "rgba(100, 120, 140, 0)")

      ctx.fillStyle = mountainGradient
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      // Create jagged mountain silhouette
      let x = 0
      while (x < canvas.width) {
        const peakHeight = Math.random() * canvas.height * 0.1 + canvas.height * 0.05
        const width = Math.random() * 200 + 100

        ctx.lineTo(x + width / 2, canvas.height - peakHeight)
        x += width
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fill()

      // Update and draw clouds with delta time for smooth movement
      clouds.forEach((cloud) => {
        // Use deltaTime to ensure consistent speed regardless of frame rate
        cloud.x += cloud.speed * (deltaTime / 16.67) // Normalized to 60fps

        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width
          cloud.y = Math.random() * (canvas.height / 4)
        }

        drawCloud(cloud.x, cloud.y, cloud.width, cloud.height, cloud.opacity, cloud.centers)
      })

      // Update and draw birds - now above clouds
      birds.forEach((bird) => {
        bird.x += bird.speed * (deltaTime / 16.67)

        // Reset bird position when it flies off screen
        if ((bird.direction === 1 && bird.x > canvas.width + 20) || (bird.direction === -1 && bird.x < -20)) {
          // Reset based on direction
          bird.x = bird.direction === 1 ? -20 : canvas.width + 20
          bird.y = Math.random() * (canvas.height / 6) + 50
          bird.size = Math.random() * 3 + 4
          bird.speed = (Math.random() * 0.5 + 0.3) * bird.direction
        }

        // Animate wings
        bird.wingPosition += bird.wingSpeed * bird.wingDirection * (deltaTime / 16.67)
        if (bird.wingPosition > 1) {
          bird.wingPosition = 1
          bird.wingDirection = -1
        } else if (bird.wingPosition < 0) {
          bird.wingPosition = 0
          bird.wingDirection = 1
        }

        drawBird(bird.x, bird.y, bird.size, bird.wingPosition, bird.direction)
      })

      // Update and draw airplane - now above birds but below sun
      if (airplane.active) {
        airplane.x += airplane.speed * (deltaTime / 16.67)

        if (airplane.x > canvas.width + 100) {
          airplane.active = false
          airplane.nextAppearance = timestamp + 7000 // 7 seconds until next appearance
          airplane.trailPoints = []
        } else {
          drawAirplane(airplane.x, airplane.y)
        }
      } else if (timestamp > airplane.nextAppearance) {
        airplane.active = true
        airplane.x = -100
        airplane.y = Math.random() * (canvas.height / 5) + 50
        airplane.speed = Math.random() * 0.3 + 0.2
      }

      // Draw sun with realistic glow AFTER other elements to ensure it's on top
      ctx.save()

      // Sun position
      const sunX = canvas.width * 0.8
      const sunY = canvas.height * 0.2
      const sunRadius = 60

      // Create sun glow
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 3)
      sunGlow.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      sunGlow.addColorStop(0.2, "rgba(255, 240, 180, 0.6)")
      sunGlow.addColorStop(0.5, "rgba(255, 210, 120, 0.2)")
      sunGlow.addColorStop(1, "rgba(255, 210, 120, 0)")

      ctx.fillStyle = sunGlow
      ctx.beginPath()
      ctx.arc(sunX, sunY, sunRadius * 3, 0, Math.PI * 2)
      ctx.fill()

      // Draw sun
      const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius)
      sunGradient.addColorStop(0, "#ffffff")
      sunGradient.addColorStop(0.2, "#fff5e0")
      sunGradient.addColorStop(1, "#ffd27f")

      ctx.fillStyle = sunGradient
      ctx.beginPath()
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      animationFrameId = window.requestAnimationFrame(render)
    }

    let animationFrameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
}
