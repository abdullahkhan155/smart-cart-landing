"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"

type BenefitItem = {
  title: string
  desc: string
  tone: string
  icon: React.ReactNode
  image: string
  bullets?: string[]
}

export function RetailBenefitsShowcase({ items }: { items: BenefitItem[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const resumeTimeoutRef = useRef<number | null>(null)
  const inView = useInView(wrapRef, { amount: 0.35 })

  const activeItem = items[active]

  const safeItems = useMemo(() => items.filter(Boolean), [items])

  const pauseTemporarily = (ms = 8000) => {
    setPaused(true)
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = window.setTimeout(() => setPaused(false), ms)
  }

  useEffect(() => {
    if (!inView || paused) return
    if (safeItems.length <= 1) return
    const id = window.setInterval(() => setActive((v) => (v + 1) % safeItems.length), 5200)
    return () => window.clearInterval(id)
  }, [inView, paused, safeItems.length])

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  if (!safeItems.length) return null

  const tabBase: React.CSSProperties = {
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: 18,
    padding: 18,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.18)",
    color: "rgba(255,255,255,0.86)",
    display: "grid",
    gap: 8,
  }

  return (
    <div ref={wrapRef}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "grid", gap: 10 }}>
          {safeItems.map((it, idx) => {
            const isActive = idx === active
            return (
              <button
                key={it.title}
                type="button"
                onClick={() => {
                  setActive(idx)
                  pauseTemporarily()
                }}
                onMouseEnter={() => {
                  setActive(idx)
                  pauseTemporarily(12000)
                }}
                style={{
                  ...tabBase,
                  border: isActive ? `1px solid ${it.tone}` : tabBase.border,
                  background: isActive ? `linear-gradient(140deg, ${it.tone}22, rgba(0,0,0,0.22))` : tabBase.background,
                  boxShadow: isActive ? `0 18px 60px ${it.tone}22` : "none",
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.14)",
                        background: "rgba(0,0,0,0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: it.tone,
                        boxShadow: isActive ? `0 0 30px ${it.tone}44` : "none",
                      }}
                    >
                      {it.icon}
                    </div>
                    <div style={{ fontWeight: 980, fontSize: 16, lineHeight: 1.25, color: "rgba(255,255,255,0.95)" }}>{it.title}</div>
                  </div>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: isActive ? it.tone : "rgba(255,255,255,0.12)" }} />
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.75)", fontWeight: 720 }}>{it.desc}</div>
              </button>
            )
          })}
        </div>

        <div
          onMouseEnter={() => pauseTemporarily(15000)}
          style={{
            position: "relative",
            borderRadius: 24,
            border: `1px solid ${activeItem.tone}`,
            background: "linear-gradient(140deg, rgba(255,255,255,0.06), rgba(0,0,0,0.30))",
            overflow: "hidden",
            minHeight: 520,
          }}
        >
          <motion.div
            aria-hidden
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: -120,
              background: `radial-gradient(520px 340px at 15% 10%, ${activeItem.tone}35, transparent), radial-gradient(520px 340px at 85% 100%, rgba(88,130,255,0.18), transparent)`,
              pointerEvents: "none",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", height: "100%", display: "grid", gridTemplateRows: "1fr auto", gap: 14, padding: 18 }}
            >
              <div style={{ display: "grid", gap: 16 }}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: 22,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(0,0,0,0.32)",
                    boxShadow: "0 34px 140px rgba(0,0,0,0.58)",
                    height: "clamp(260px, 34vw, 460px)",
                  }}
                >
                  <motion.img
                    src={activeItem.image}
                    alt={activeItem.title}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      padding: 10,
                    }}
                    loading="lazy"
                  />

                  <motion.div
                    aria-hidden
                    animate={{ opacity: [0.25, 0.55, 0.25] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.50))`,
                      pointerEvents: "none",
                    }}
                  />

                  {[
                    { x: "18%", y: "22%" },
                    { x: "74%", y: "30%" },
                    { x: "52%", y: "76%" },
                  ].map((p, i) => (
                    <motion.span
                      key={i}
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: p.x,
                        top: p.y,
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        background: activeItem.tone,
                        boxShadow: `0 0 18px ${activeItem.tone}`,
                      }}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.35, 0.9] }}
                      transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, alignItems: "start" }}>
                  <div style={{ display: "grid", gap: 12 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.22)", width: "fit-content" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: activeItem.tone }} />
                      <span style={{ fontSize: 12, fontWeight: 950, letterSpacing: 0.35, textTransform: "uppercase", color: "rgba(255,255,255,0.82)" }}>Benefits</span>
                    </div>

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: activeItem.tone, boxShadow: `0 0 30px ${activeItem.tone}44` }}>
                        {activeItem.icon}
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 980, color: "rgba(255,255,255,0.95)", letterSpacing: -0.3, lineHeight: 1.1 }}>{activeItem.title}</div>
                    </div>

                    <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", fontWeight: 740 }}>{activeItem.desc}</div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    {(activeItem.bullets?.length ? activeItem.bullets : ["Feels premium in aisle", "Measurable uplift and visibility", "Built for store operations"]).map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "rgba(255,255,255,0.78)", fontWeight: 740, fontSize: 13, lineHeight: 1.6 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 999, background: activeItem.tone, marginTop: 4, flex: "0 0 auto" }} />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 850, color: "rgba(255,255,255,0.66)" }}>
                    {active + 1}/{safeItems.length}
                  </span>
                  <div style={{ width: 180, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
                    <motion.div
                      key={active}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused ? 0 : 5.2, ease: "linear" }}
                      style={{ height: "100%", background: `linear-gradient(90deg, ${activeItem.tone}, rgba(255,255,255,0.65))` }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive((v) => (v - 1 + safeItems.length) % safeItems.length)
                      pauseTemporarily()
                    }}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.14)",
                      background: "rgba(0,0,0,0.22)",
                      color: "rgba(255,255,255,0.86)",
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActive((v) => (v + 1) % safeItems.length)
                      pauseTemporarily()
                    }}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 14,
                      border: `1px solid ${activeItem.tone}`,
                      background: `linear-gradient(120deg, ${activeItem.tone}55, rgba(0,0,0,0.22))`,
                      color: "rgba(255,255,255,0.92)",
                      fontWeight: 950,
                      cursor: "pointer",
                      boxShadow: `0 12px 40px ${activeItem.tone}22`,
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
