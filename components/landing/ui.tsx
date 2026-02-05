"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost"
  style?: React.CSSProperties
}

export function Button({
  children,
  className,
  variant = "solid",
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl font-black text-sm tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
        variant === "solid" && "bg-white/5 border border-white/20 text-white/90 shadow-2xl hover:bg-white/10 backdrop-blur-md",
        variant === "ghost" && "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </button>
  )
}

// Pill is now in Pill.tsx, removing from here to avoid duplication if we export from index

export function Card({
  children,
  className,
  glow = true,
  style,
}: {
  children: React.ReactNode
  className?: string
  glow?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/5 shadow-2xl backdrop-blur-xl",
        className
      )}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent-2)]/10 to-[var(--accent-3)]/10 opacity-70 pointer-events-none" />

      {glow && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0.45 }}
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(700px_320px_at_14%_0%,rgba(0,255,208,0.14),transparent),radial-gradient(700px_320px_at_84%_0%,rgba(160,120,255,0.14),transparent)] pointer-events-none"
        />
      )}

      <div className="relative">{children}</div>
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
  return (
    <div className="max-w-4xl mx-auto text-center px-4">
      <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-full border border-white/15 bg-white/5 text-xs font-black tracking-widest text-white/85 uppercase">
        <span className="w-2 h-2 rounded-full bg-white/75" />
        <span>{eyebrow}</span>
      </div>

      <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white/95 leading-[1.1]">
        {title}
      </h2>

      <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  )
}
