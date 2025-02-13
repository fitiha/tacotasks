"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type React from "react" // Added import for React

const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

interface ConfettiPieceProps {
  color: string
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ color }) => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomRotation = Math.random() * 360

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "10px",
        height: "10px",
        backgroundColor: color,
        left: `${randomX}%`,
        top: `-20px`,
      }}
      animate={{
        y: `${randomY}vh`,
        rotate: randomRotation,
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 2, ease: "easeOut" }}
    />
  )
}

export default function Confetti() {
  const [pieces, setPieces] = useState<JSX.Element[]>([])

  useEffect(() => {
    const newPieces = Array.from({ length: 50 }, (_, i) => (
      <ConfettiPiece key={i} color={colors[Math.floor(Math.random() * colors.length)]} />
    ))
    setPieces(newPieces)

    const timer = setTimeout(() => {
      setPieces([])
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      {pieces}
    </div>
  )
}

