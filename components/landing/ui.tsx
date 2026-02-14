"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
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
        "inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-extrabold text-sm tracking-wide transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none relative overflow-hidden group",
        variant === "solid" && "bg-white/[0.06] border border-white/[0.12] text-white shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:bg-white/[0.12] hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,255,224,0.15)] backdrop-blur-xl",
        variant === "ghost" && "bg-transparent border border-transparent text-white/70 hover:text-white hover:bg-white/5",
        className
      )}
      style={style}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/5 to-[var(--accent)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <span className="relative">{children}</span>
    </button>
  )
}

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
        "noise-overlay relative overflow-hidden rounded-[var(--radius-lg)] border border-white/[0.08] bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.14] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]",
        className
      )}
      style={style}
    >
      {/* Top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Aurora shimmer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.03] via-transparent to-[var(--accent-2)]/[0.03] pointer-events-none" />

      {glow && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_-30%,rgba(0,255,224,0.08),transparent_60%)] pointer-events-none"
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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl mx-auto text-center px-4"
    >
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-[11px] font-extrabold tracking-[0.15em] text-white/70 uppercase backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
        <span>{eyebrow}</span>
      </div>

      <h2 className="mt-6 text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.08]">
        {title}
      </h2>

      <p className="mt-5 text-base md:text-lg text-white/55 leading-relaxed max-w-xl mx-auto font-medium">
        {subtitle}
      </p>
    </motion.div>
  )
}
