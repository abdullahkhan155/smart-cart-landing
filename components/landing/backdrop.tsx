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
  const blur = reduced ? 0 : 18
  const dx = (mx - 0.5) * 22
  const dy = (my - 0.5) * 22

  const orbBase: React.CSSProperties = {
    position: "absolute",
    borderRadius: 999,
    filter: `blur(${blur}px)`,
    opacity: 0.9,
    mixBlendMode: "screen",
    transform: `translate3d(${dx}px, ${dy}px, 0)`,
    transition: reduced ? "none" : "transform 140ms ease",
  }

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
          background:
            "radial-gradient(1100px 800px at 14% 18%, rgba(0,255,208,0.16), rgba(0,0,0,0)), radial-gradient(1000px 800px at 86% 10%, rgba(160,120,255,0.16), rgba(0,0,0,0)), radial-gradient(1000px 800px at 55% 88%, rgba(255,170,80,0.12), rgba(0,0,0,0))",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          ...orbBase,
          left: "6%",
          top: "18%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle at 30% 30%, rgba(0,255,208,0.52), rgba(0,0,0,0))",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.10, ease: "easeOut" }}
        style={{
          ...orbBase,
          right: "2%",
          top: "8%",
          width: 640,
          height: 640,
          background: "radial-gradient(circle at 40% 30%, rgba(160,120,255,0.52), rgba(0,0,0,0))",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
        style={{
          ...orbBase,
          left: "36%",
          bottom: "6%",
          width: 720,
          height: 720,
          background: "radial-gradient(circle at 35% 35%, rgba(255,170,80,0.40), rgba(0,0,0,0))",
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
