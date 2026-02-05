"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function AnimatedBackdrop({
  mx,
  my,
  reduced,
}: {
  mx: number
  my: number
  reduced: boolean
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(7,9,20,0.30), rgba(5,7,11,0.82) 62%, rgba(4,6,10,0.92))",
        }}
      />

      {!reduced ? <Particles /> : null}
    </div>
  )
}

function Particles() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const dotsRef = useRef<Array<{ x: number; y: number; s: number; o: number; d: number }> | null>(null)
  if (!dotsRef.current) {
    const items: Array<{ x: number; y: number; s: number; o: number; d: number }> = []
    let seed = 42
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let i = 0; i < 34; i += 1) {
      const r = rand()
      items.push({
        x: rand(),
        y: rand(),
        s: 2 + rand() * 3,
        o: 0.05 + rand() * 0.12,
        d: r * 2,
      })
    }
    dotsRef.current = items
  }

  const dots = dotsRef.current
  if (!mounted) return null

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {dots.map((p, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, p.o, 0], y: [0, 12, 0] }}
          transition={{ duration: 3.2 + p.d, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          style={{
            position: "absolute",
            left: `${p.x * 100}%`,
            top: `${p.y * 100}%`,
            width: p.s,
            height: p.s,
            borderRadius: 999,
            background: "rgba(255,255,255,0.85)",
          }}
        />
      ))}
    </div>
  )
}
