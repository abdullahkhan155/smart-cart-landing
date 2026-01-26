"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(!!mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])
  return reduced
}

export function useBreakpoint(maxWidth: number) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [maxWidth])
  return matches
}

export function Button({
  children,
  onClick,
  variant = "solid",
  style,
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "solid" | "ghost"
  style?: React.CSSProperties
}) {
  const base: React.CSSProperties = {
    borderRadius: 16,
    padding: "12px 16px",
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: 0.2,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    userSelect: "none",
    color: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 24px 90px rgba(0,0,0,0.28)",
    transition: "transform 180ms ease, background 180ms ease, border 180ms ease",
  }

  const solid: React.CSSProperties = {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))",
    border: "1px solid rgba(255,255,255,0.22)",
  }

  const ghost: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.10)",
  }

  return (
    <button
      onClick={onClick}
      style={{ ...base, ...(variant === "solid" ? solid : ghost), ...style }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  )
}

export function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        color: "rgba(255,255,255,0.84)",
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: 0.2,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <span style={{ opacity: 0.9, display: "inline-flex" }}>{icon}</span>
      <span>{text}</span>
    </span>
  )
}

export function Card({
  children,
  style,
  glow = true,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  glow?: boolean
}) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.12)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        boxShadow: "0 36px 140px rgba(0,0,0,0.40)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        ...style,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,255,208,0.10), rgba(160,120,255,0.10), rgba(255,170,80,0.08))",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      {glow ? (
        <motion.div
          aria-hidden
          initial={{ opacity: 0.45 }}
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(700px 320px at 14% 0%, rgba(0,255,208,0.14), rgba(0,0,0,0)), radial-gradient(700px 320px at 84% 0%, rgba(160,120,255,0.14), rgba(0,0,0,0)), radial-gradient(700px 320px at 55% 120%, rgba(255,170,80,0.10), rgba(0,0,0,0))",
            pointerEvents: "none",
          }}
        />
      ) : null}

      <div style={{ position: "relative" }}>{children}</div>
    </div>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  const isTablet = useBreakpoint(1024)
  const isMobile = useBreakpoint(640)
  const titleSize = isMobile ? "clamp(28px, 7vw, 36px)" : isTablet ? "clamp(34px, 4vw, 44px)" : "clamp(38px, 3.6vw, 46px)"
  const subtitleSize = isMobile ? 14 : 16

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", padding: isMobile ? "0 4px" : 0 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 12px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.84)",
          fontSize: 12,
          fontWeight: 950,
          letterSpacing: 0.35,
          textTransform: "uppercase",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(255,255,255,0.75)" }} />
        <span>{eyebrow}</span>
      </div>

      <h2
        style={{
          marginTop: 18,
          fontSize: titleSize,
          lineHeight: 1.08,
          letterSpacing: -0.7,
          color: "rgba(255,255,255,0.95)",
          fontWeight: 980,
        }}
      >
        {title}
      </h2>

      <p
        style={{
          marginTop: 12,
          fontSize: subtitleSize,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.74)",
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}
