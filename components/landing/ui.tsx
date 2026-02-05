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
        "inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl font-black text-sm tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none relative overflow-hidden group",
        variant === "solid" && "bg-white/10 border border-white/20 text-white shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:bg-white/20 hover:shadow-[0_0_30px_rgba(0,242,234,0.3)] backdrop-blur-xl",
        variant === "ghost" && "bg-transparent border border-transparent text-white/70 hover:text-white hover:bg-white/5",
        className
      )}
      style={style}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 to-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative">{children}</span>
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
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-2xl transition-colors hover:bg-white/[0.06]",
        className
      )}
      style={style}
    >
      {/* Subtle top-light for depth */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

      {/* Aurora sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent-2)]/5 opacity-50 pointer-events-none" />

      {glow && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_-20%,rgba(0,242,234,0.15),transparent_60%)] pointer-events-none"
        />
      )}

      <div className="relative z-10">{children}</div>
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
