"use client"

import React, { useMemo, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

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
        background: "var(--background)",
      }}
    >
      {/* Dynamic Aurora Orbs */}
      {!reduced && (
        <>
          <motion.div
            animate={{
              x: [0, 40, -40, 0],
              y: [0, -40, 40, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] bg-[var(--accent)]/10"
          />
          <motion.div
            animate={{
              x: [0, -60, 60, 0],
              y: [0, 60, -60, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] bg-[var(--accent-2)]/10"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full blur-[120px] bg-[var(--accent-3)]/05"
          />
        </>
      )}

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.20) 0%, rgba(5,5,5,0.7) 100%)",
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
    // Increased particle count for more livelihood
    for (let i = 0; i < 45; i += 1) {
      const r = rand()
      items.push({
        x: rand(),
        y: rand(),
        s: 2 + rand() * 4,
        o: 0.1 + rand() * 0.3,
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
          animate={{
            opacity: [0, p.o, 0],
            y: [0, -30, 0], // Move UP to simulate rising energy
            x: [0, (idx % 2 === 0 ? 10 : -10), 0] // Subtle horizontal drift
          }}
          transition={{ duration: 4 + p.d, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          style={{
            position: "absolute",
            left: `${p.x * 100}%`,
            top: `${p.y * 100}%`,
            width: p.s,
            height: p.s,
            borderRadius: 999,
            background: idx % 3 === 0 ? "var(--accent)" : idx % 3 === 1 ? "var(--accent-2)" : "rgba(255,255,255,0.8)",
            boxShadow: `0 0 ${p.s * 2}px ${idx % 3 === 0 ? "var(--accent)" : idx % 3 === 1 ? "var(--accent-2)" : "white"}`,
          }}
        />
      ))}
    </div>
  )
}
