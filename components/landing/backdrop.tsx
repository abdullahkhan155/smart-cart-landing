"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useBreakpoint } from "./ui"

export function AnimatedBackdrop({
  mx,
  my,
  reduced,
}: {
  mx: number
  my: number
  reduced: boolean
}) {
  const isMobile = useBreakpoint(800)

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
      {/* Animated aurora orbs */}
      {!reduced && !isMobile && (
        <>
          <motion.div
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 80, 0],
              scale: [1, 1.2, 0.9, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "-15%",
              left: "-5%",
              width: "50vw",
              height: "50vw",
              borderRadius: "50%",
              filter: "blur(120px)",
              background: "rgba(0, 255, 224, 0.08)",
            }}
          />
          <motion.div
            animate={{
              x: [0, -80, 60, 0],
              y: [0, 60, -80, 0],
              scale: [1, 0.9, 1.15, 1],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            style={{
              position: "absolute",
              bottom: "-15%",
              right: "-5%",
              width: "55vw",
              height: "55vw",
              borderRadius: "50%",
              filter: "blur(140px)",
              background: "rgba(99, 102, 241, 0.08)",
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
            style={{
              position: "absolute",
              top: "35%",
              left: "25%",
              width: "40vw",
              height: "40vw",
              borderRadius: "50%",
              filter: "blur(130px)",
              background: "rgba(232, 121, 249, 0.05)",
            }}
          />
        </>
      )}

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          mask: "radial-gradient(ellipse 70% 50% at 50% 30%, black, transparent)",
          WebkitMask: "radial-gradient(ellipse 70% 50% at 50% 30%, black, transparent)",
        }}
      />

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(3,3,5,0.15) 0%, rgba(3,3,5,0.75) 100%)",
        }}
      />

      {!reduced && !isMobile ? <Particles /> : null}
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
    for (let i = 0; i < 35; i += 1) {
      const r = rand()
      items.push({
        x: rand(),
        y: rand(),
        s: 1.5 + rand() * 3,
        o: 0.08 + rand() * 0.22,
        d: r * 3,
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, p.o, 0],
            y: [0, -40, 0],
            x: [0, (idx % 2 === 0 ? 15 : -15), 0],
          }}
          transition={{ duration: 5 + p.d, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          style={{
            position: "absolute",
            left: `${p.x * 100}%`,
            top: `${p.y * 100}%`,
            width: p.s,
            height: p.s,
            borderRadius: 999,
            background: idx % 3 === 0 ? "var(--accent)" : idx % 3 === 1 ? "var(--accent-2)" : "rgba(255,255,255,0.6)",
            boxShadow: `0 0 ${p.s * 3}px ${idx % 3 === 0 ? "rgba(0,255,224,0.4)" : idx % 3 === 1 ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.3)"}`,
          }}
        />
      ))}
    </div>
  )
}
