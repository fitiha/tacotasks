"use client"

import { useEffect, useRef } from "react"

interface ParticleBackgroundProps {
  isDarkMode: boolean
}

export default function ParticleBackground({ isDarkMode }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; radius: number; dx: number; dy: number }[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      })
    }

    function animate() {
      requestAnimationFrame(animate)
      if (!ctx) return
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
        ctx.fill()

        particle.x += particle.dx
        particle.y += particle.dy

        if (canvas && (particle.x < 0 || particle.x > canvas.width)) particle.dx = -particle.dx
        if (canvas && (particle.y < 0 || particle.y > canvas.height)) particle.dy = -particle.dy
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isDarkMode])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

