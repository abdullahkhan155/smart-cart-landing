"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false)
    useEffect(() => {
        const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
        const update = () => setReduced(mqMotion.matches)
        update()
        mqMotion.addEventListener?.("change", update)
        return () => mqMotion.removeEventListener?.("change", update)
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
                "relative overflow-hidden rounded-[var(--radius-lg)] border border-white/[0.08] bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-500",
                className
            )}
            style={style}
        >
            {/* Top edge highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Aurora shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.03] via-transparent to-[var(--accent-2)]/[0.03] pointer-events-none" />

            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }} />

            {glow && (
                <div
                    className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_-30%,rgba(0,255,224,0.05),transparent_60%)] pointer-events-none"
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
        <div className="text-center px-4 mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-[11px] font-extrabold tracking-[0.15em] text-white/70 uppercase backdrop-blur-md mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                <span>{eyebrow}</span>
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-[1.1] font-space mb-4">
                {title}
            </h2>

            <p className="text-base text-white/55 leading-relaxed max-w-sm mx-auto font-medium">
                {subtitle}
            </p>
        </div>
    )
}

export function Button({
    children,
    className,
    variant = "solid",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "ghost" }) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95",
                variant === "solid" ? "bg-white text-black hover:bg-white/90" : "bg-white/10 text-white hover:bg-white/15",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
