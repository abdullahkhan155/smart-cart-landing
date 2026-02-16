"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { BarChart3, CheckCircle2, CreditCard, MapPin, Mic, ScanLine, ShieldCheck, Sparkles, Zap, TrendingUp, Lock, ArrowRight } from "lucide-react"
import { Card, SectionTitle, usePrefersReducedMotion } from "./ui"
import { Pill } from "./Pill"

type Scene = "assist" | "promo" | "scan" | "pay" | "security"

function useIsNarrow(breakpoint = 980) {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [breakpoint])
  return narrow
}

type Step = {
  k: string
  title: string
  subtitle: string
  scene: Scene
  icon: React.ReactNode
  accent: string
  accentStrong: string
}

const stepDescriptions: Record<Scene, { headline: string; body: string; stats: { label: string; value: string }[] }> = {
  assist: {
    headline: "Voice-Powered Help",
    body: "Find products and navigate aisles hands-free with AI.",
    stats: [
      { label: "Recognition", value: "98.7%" },
      { label: "Response", value: "<1s" },
      { label: "Languages", value: "12+" },
    ],
  },
  promo: {
    headline: "Deals That Find You",
    body: "Personalized offers triggered by your location in-store.",
    stats: [
      { label: "Avg. Saved", value: "$12.40" },
      { label: "Promo Lift", value: "+22%" },
      { label: "Relevance", value: "94%" },
    ],
  },
  scan: {
    headline: "Shop Without Stopping",
    body: "Scan items as you go with a running total in real time.",
    stats: [
      { label: "Scan Speed", value: "0.3s" },
      { label: "Accuracy", value: "99.9%" },
      { label: "Items/min", value: "15+" },
    ],
  },
  pay: {
    headline: "Skip the Line Entirely",
    body: "Tap to pay on the cart and walk out. No lanes, no waiting.",
    stats: [
      { label: "Time Saved", value: "12 min" },
      { label: "Methods", value: "All" },
      { label: "Security", value: "PCI L1" },
    ],
  },
  security: {
    headline: "Trust Built In",
    body: "Weight sensors and computer vision verify every item seamlessly.",
    stats: [
      { label: "Accuracy", value: "99.8%" },
      { label: "False Alerts", value: "<0.1%" },
      { label: "Shrink ↓", value: "65%" },
    ],
  },
}

export function HowItWorksSection() {
  const reduced = usePrefersReducedMotion()
  const narrow = useIsNarrow(980)
  const compact = useIsNarrow(720)

  const steps = useMemo(
    () =>
      [
        {
          k: "Step 01",
          title: "Ask in aisle",
          subtitle: "AI voice assistant",
          scene: "assist" as const,
          icon: <Mic size={16} />,
          accent: "rgba(0,255,208,0.16)",
          accentStrong: "rgba(0,255,208,0.92)",
        },
        {
          k: "Step 02",
          title: "Get Personalized Promos",
          subtitle: "Deals as you shop",
          scene: "promo" as const,
          icon: <Sparkles size={16} />,
          accent: "rgba(255,170,80,0.14)",
          accentStrong: "rgba(255,170,80,0.92)",
        },
        {
          k: "Step 03",
          title: "Scan as you pick",
          subtitle: "Real-time total",
          scene: "scan" as const,
          icon: <ScanLine size={16} />,
          accent: "rgba(0,255,208,0.12)",
          accentStrong: "rgba(0,255,208,0.88)",
        },
        {
          k: "Step 04",
          title: "Pay on cart",
          subtitle: "No-lane checkout",
          scene: "pay" as const,
          icon: <CreditCard size={16} />,
          accent: "rgba(160,120,255,0.14)",
          accentStrong: "rgba(160,120,255,0.92)",
        },
        {
          k: "Step 05",
          title: "Secure every basket",
          subtitle: "Vision verification",
          scene: "security" as const,
          icon: <ShieldCheck size={16} />,
          accent: "rgba(0,190,120,0.14)",
          accentStrong: "rgba(0,190,120,0.92)",
        },
      ] as const,
    []
  )

  const [active, setActive] = useState(0)
  const [manualPaused, setManualPaused] = useState(false)
  const [hoverPaused, setHoverPaused] = useState(false)
  const resumeTimeoutRef = useRef<number | null>(null)
  const lastPauseResetRef = useRef(0)
  const sectionRef = useRef<HTMLElement | null>(null)
  const stickyCardRef = useRef<HTMLDivElement | null>(null)
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeRef = useRef(0)
  const ignoreScrollSyncUntilRef = useRef(0)
  const lastActiveUpdateRef = useRef(0)
  const scrollEndTimeoutRef = useRef<number | null>(null)
  const scrollingRef = useRef(false)
  const inView = useInView(sectionRef, { amount: 0.35 })
  const isPaused = manualPaused || hoverPaused
  const [scrolling, setScrolling] = useState(false)
  const perfReduced = compact

  useEffect(() => {
    activeRef.current = active
  }, [active])

  const pauseAutoplay = useCallback((ms: number) => {
    if (reduced || compact) return
    setManualPaused(true)
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = window.setTimeout(() => setManualPaused(false), ms)
  }, [compact, reduced])

  const scrollStepIntoView = useCallback((index: number) => {
    if (!narrow) return
    const el = stepRefs.current[index]
    if (!el) return

    const stickyHeight = stickyCardRef.current?.getBoundingClientRect().height ?? 0
    const topPadding = 14
    const rect = el.getBoundingClientRect()
    const absoluteTop = rect.top + window.scrollY

    window.scrollTo({
      top: Math.max(0, absoluteTop - stickyHeight - topPadding),
      behavior: "smooth",
    })
  }, [narrow])

  const handleSelect = useCallback((index: number) => {
    ignoreScrollSyncUntilRef.current = Date.now() + 900
    setActive(index)
    pauseAutoplay(10000)
    scrollStepIntoView(index)
  }, [pauseAutoplay, scrollStepIntoView])

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current)
      if (scrollEndTimeoutRef.current) window.clearTimeout(scrollEndTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!inView) return

    let raf = 0

    const computeActiveFromScroll = () => {
      raf = 0
      const now = Date.now()
      if (now < ignoreScrollSyncUntilRef.current) return

      if (compact) {
        if (!scrollingRef.current) {
          scrollingRef.current = true
          setScrolling(true)
        }
        if (scrollEndTimeoutRef.current) window.clearTimeout(scrollEndTimeoutRef.current)
        scrollEndTimeoutRef.current = window.setTimeout(() => {
          scrollingRef.current = false
          setScrolling(false)
        }, 140)
      }

      if (!compact && now - lastPauseResetRef.current > 180) {
        lastPauseResetRef.current = now
        pauseAutoplay(5000)
      }

      const stickyEnabled = narrow
      const stickyHeight = stickyEnabled ? (stickyCardRef.current?.getBoundingClientRect().height ?? 0) : 0
      const hiddenTop = stickyEnabled ? stickyHeight + 12 : 0
      const focusY = stickyEnabled ? hiddenTop + (window.innerHeight - hiddenTop) * 0.38 : window.innerHeight * 0.44

      let bestIndex = activeRef.current
      let bestDistance = Number.POSITIVE_INFINITY
      let foundVisible = false

      for (let i = 0; i < steps.length; i++) {
        const el = stepRefs.current[i]
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.bottom <= hiddenTop || r.top >= window.innerHeight) continue
        foundVisible = true
        const center = (r.top + r.bottom) / 2
        const dist = Math.abs(center - focusY)
        if (dist < bestDistance) {
          bestDistance = dist
          bestIndex = i
        }
      }

      if (!foundVisible) {
        for (let i = 0; i < steps.length; i++) {
          const el = stepRefs.current[i]
          if (!el) continue
          const r = el.getBoundingClientRect()
          const center = (r.top + r.bottom) / 2
          const dist = Math.abs(center - focusY)
          if (dist < bestDistance) {
            bestDistance = dist
            bestIndex = i
          }
        }
      }

      if (compact) {
        if (now - lastActiveUpdateRef.current < 110) return
        lastActiveUpdateRef.current = now
      }
      setActive((prev) => (prev === bestIndex ? prev : bestIndex))
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(computeActiveFromScroll)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) window.cancelAnimationFrame(raf)
      if (scrollEndTimeoutRef.current) window.clearTimeout(scrollEndTimeoutRef.current)
    }
  }, [compact, inView, narrow, pauseAutoplay, steps.length])

  useEffect(() => {
    if (reduced || compact || isPaused || !inView) return
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % steps.length)
    }, 6800)
    return () => window.clearInterval(id)
  }, [reduced, compact, isPaused, inView, steps.length])

  const activeStep = steps[active]

  return (
    <section ref={sectionRef} id="how" style={{ position: "relative", paddingTop: 20, paddingBottom: 20 }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(900px 520px at 50% 10%, rgba(0,255,208,0.10), rgba(0,0,0,0)), radial-gradient(900px 520px at 92% 30%, rgba(160,120,255,0.12), rgba(0,0,0,0)), radial-gradient(900px 520px at 8% 70%, rgba(255,170,80,0.10), rgba(0,0,0,0))",
          filter: "blur(2px)",
          opacity: 0.9,
        }}
      />

      <div style={{ width: "min(1080px, calc(100% - 40px))", margin: "0 auto", position: "relative" }}>
        <SectionTitle
          eyebrow="How it works"
          title="From Aisle to Exit, Reimagined."
          subtitle="A cart that helps first, sells smarter, and ends the trip without a line."
        />

        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: narrow ? "1fr" : "minmax(480px, 520px) minmax(0, 1fr)", gap: 16, alignItems: "start" }}>
          <div
            ref={stickyCardRef}
            style={
              narrow
                ? { position: "sticky", top: compact ? 76 : 86, zIndex: 20 }
                : { position: "sticky", top: 96 }
            }
          >
            <Card style={{ padding: compact ? 10 : 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <div>

                </div>
                <Pill icon={<Sparkles size={14} />} text={activeStep.k} />
              </div>

              <div style={{ marginTop: 12 }}>
                <CartOSDemo
                  step={activeStep}
                  reduced={reduced}
                  perfReduced={perfReduced}
                  paused={isPaused}
                  stacked={narrow}
                  compact={compact}
                  onHoverChange={(hovering) => {
                    if (reduced || compact) return
                    setHoverPaused(hovering)
                  }}
                  onSelectScene={(scene) => {
                    const idx = steps.findIndex((s) => s.scene === scene)
                    if (idx !== -1) handleSelect(idx)
                  }}
                />
              </div>

              {!compact ? (
                <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Pill icon={<Mic size={14} />} text="Assistant" />
                  <Pill icon={<Sparkles size={14} />} text="Promos" />
                  <Pill icon={<ScanLine size={14} />} text="Scan" />
                  <Pill icon={<CreditCard size={14} />} text="Checkout" />
                </div>
              ) : null}
            </Card>
          </div>

          <div style={{ width: "100%", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ display: "grid", gap: 8 }}>
              {steps.map((s, i) => (
                <StepCard
                  key={s.k}
                  step={s.k}
                  title={s.title}
                  subtitle={s.subtitle}
                  icon={s.icon}
                  accent={s.accentStrong}
                  active={i === active}
                  onClick={() => handleSelect(i)}
                  compact={compact}
                  buttonRef={(el) => {
                    stepRefs.current[i] = el
                  }}
                />
              ))}
            </div>
            <div aria-hidden style={{ height: compact ? 120 : narrow ? 340 : 300 }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({
  step,
  title,
  subtitle,
  icon,
  accent,
  active,
  onClick,
  compact,
  buttonRef,
}: {
  step: string
  title: string
  subtitle: string
  icon: React.ReactNode
  accent: string
  active: boolean
  onClick: () => void
  compact?: boolean
  buttonRef?: (el: HTMLButtonElement | null) => void
}) {
  const pad = compact ? 14 : 18
  const iconBox = compact ? 34 : 40
  const iconRadius = compact ? 10 : 12

  return (
    <motion.button
      type="button"
      onClick={onClick}
      ref={buttonRef}
      animate={{ opacity: active ? 1 : 0.52, y: compact ? 0 : active ? 0 : 6 }}
      transition={{ duration: compact ? 0.22 : 0.32 }}
      style={{
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        padding: pad,
        borderRadius: compact ? 20 : 24,
        border: active ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.08)",
        background: active
          ? "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))"
          : "rgba(255,255,255,0.02)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(720px 320px at 14% 20%, ${active ? `${accent.replace("0.92", "0.18").replace("0.88", "0.18")}` : "rgba(0,0,0,0)"}, rgba(0,0,0,0))`,
          opacity: active ? 1 : 0,
          transition: "opacity 300ms ease",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: iconBox,
                height: iconBox,
                borderRadius: iconRadius,
                border: "1px solid rgba(255,255,255,0.14)",
                background: active ? "rgba(0,0,0,0.30)" : "rgba(0,0,0,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: active ? accent : "rgba(255,255,255,0.75)",
                boxShadow: active ? `0 0 30px ${accent.replace("0.92", "0.18").replace("0.88", "0.18")}` : undefined,
                transition: "box-shadow 300ms ease, color 300ms ease",
              }}
            >
              {icon}
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.16)", color: "rgba(255,255,255,0.78)", fontSize: 12, fontWeight: 950 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: active ? accent : "rgba(255,255,255,0.75)", transition: "background 300ms ease" }} />
              <span>{step}</span>
            </div>
          </div>


        </div>

        <div style={{ marginTop: 10, fontSize: compact ? 17 : 19, fontWeight: 980, color: "rgba(255,255,255,0.93)" }}>{title}</div>
        <div style={{ marginTop: 4, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.46)", lineHeight: 1.4 }}>{subtitle}</div>
      </div>
    </motion.button>
  )
}

function CartOSDemo({
  step,
  reduced,
  perfReduced,
  paused,
  stacked,
  compact,
  onHoverChange,
  onSelectScene,
}: {
  step: Step
  reduced: boolean
  perfReduced: boolean
  paused: boolean
  stacked: boolean
  compact: boolean
  onHoverChange?: (hovering: boolean) => void
  onSelectScene?: (scene: Scene) => void
}) {
  const animReduced = reduced || perfReduced
  const stageHeight = compact ? 260 : stacked ? 340 : 380
  const shellPadding = compact ? 10 : 14
  const tabButtonPadding = compact ? "9px 8px" : "10px 10px"
  const demoCorner = compact ? 20 : 24

  const nav = useMemo(
    () =>
      [
        { scene: "assist" as const, icon: <Mic size={14} />, label: "Assistant" },
        { scene: "promo" as const, icon: <Sparkles size={14} />, label: "Promos" },
        { scene: "scan" as const, icon: <ScanLine size={14} />, label: "Scan" },
        { scene: "pay" as const, icon: <CreditCard size={14} />, label: "Pay" },
        { scene: "security" as const, icon: <ShieldCheck size={14} />, label: "Security" },
      ],
    []
  )

  const navWrapStyle: React.CSSProperties = compact
    ? { marginTop: 12, display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 2 }
    : { marginTop: 12, display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 8 }

  return (
    <div
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocusCapture={() => onHoverChange?.(true)}
      onBlurCapture={() => onHoverChange?.(false)}
      style={{
        position: "relative",
        borderRadius: demoCorner,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.30)",
        boxShadow: "0 40px 120px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -2,
          background: `radial-gradient(900px 420px at 20% 10%, ${step.accent}, rgba(0,0,0,0)), radial-gradient(900px 420px at 92% 40%, rgba(160,120,255,0.12), rgba(0,0,0,0)), radial-gradient(900px 420px at 50% 120%, rgba(255,170,80,0.10), rgba(0,0,0,0))`,
          opacity: 0.9,
          pointerEvents: "none",
        }}
      />

      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.55))", pointerEvents: "none" }} />

      <div style={{ position: "relative", padding: shellPadding }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              aria-hidden
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: step.accentStrong,
                boxShadow: `0 0 18px ${step.accentStrong.replace("0.92", "0.22").replace("0.88", "0.20")}`,
              }}
            />
            <div style={{ fontSize: 12, fontWeight: 950, letterSpacing: 0.3, color: "rgba(255,255,255,0.82)" }}>SMART CART OS</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.62)" }}>
              <span style={{ opacity: 0.85 }}>Aisle</span> <span style={{ color: "rgba(255,255,255,0.86)" }}>6</span>
            </div>
            <div aria-hidden style={{ width: 1, height: 12, background: "rgba(255,255,255,0.16)" }} />
            <Pill icon={<MapPin size={14} />} text="In store" />
          </div>
        </div>

        <div style={{ marginTop: 12, position: "relative", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.30)" }}>
          <div style={{ position: "relative", height: stageHeight }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.scene}
                initial={animReduced ? { opacity: 1 } : compact ? { opacity: 0, y: 8 } : { opacity: 0, y: 12, scale: 0.98 }}
                animate={animReduced ? { opacity: 1 } : compact ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                exit={animReduced ? { opacity: 1 } : compact ? { opacity: 0, y: -8 } : { opacity: 0, y: -12, scale: 1.02 }}
                transition={animReduced ? { duration: 0.01 } : { duration: compact ? 0.26 : 0.4, ease: "easeOut" }}
                style={{ position: "absolute", inset: 0 }}
              >
                <SceneVisual scene={step.scene} reduced={animReduced} tone={step.accentStrong} accent={step.accent} lite={compact} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div style={navWrapStyle}>
          {nav.map((n) => {
            const isActive = n.scene === step.scene
            return (
              <button
                key={n.scene}
                type="button"
                onClick={() => onSelectScene?.(n.scene)}
                aria-label={n.label}
                aria-pressed={isActive}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: tabButtonPadding,
                  borderRadius: 16,
                  minWidth: compact ? 44 : undefined,
                  minHeight: compact ? 44 : undefined,
                  flex: compact ? "0 0 auto" : undefined,
                  scrollSnapAlign: compact ? "start" : undefined,
                  border: isActive ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.10)",
                  background: isActive ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.22)",
                  color: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.62)",
                  fontSize: 12,
                  fontWeight: 920,
                  transition: "transform 160ms ease, background 160ms ease, border 160ms ease, color 160ms ease",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                title={n.label}
              >
                <span style={{ display: "inline-flex", opacity: isActive ? 0.92 : 0.82, color: isActive ? step.accentStrong : undefined }}>{n.icon}</span>
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: 10, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.40)", textAlign: "center", letterSpacing: "0.02em" }}>
          {reduced ? "Tap a step to switch views." : paused ? "Paused while you explore." : "Auto-rotating preview · Hover to pause"}
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(600px 220px at 18% 0%, rgba(255,255,255,0.06), rgba(0,0,0,0)), radial-gradient(600px 220px at 92% 20%, rgba(255,255,255,0.03), rgba(0,0,0,0))",
          mixBlendMode: "screen",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

/* ─── Scene Visual: Pure text/icon/gradient visual per scene ─── */

function SceneVisual({ scene, reduced, tone, accent, lite }: { scene: Scene; reduced: boolean; tone: string; accent: string; lite: boolean }) {
  const data = stepDescriptions[scene]
  const sceneIcon = {
    assist: <Mic size={lite ? 36 : 44} />,
    promo: <Sparkles size={lite ? 36 : 44} />,
    scan: <ScanLine size={lite ? 36 : 44} />,
    pay: <CreditCard size={lite ? 36 : 44} />,
    security: <ShieldCheck size={lite ? 36 : 44} />,
  }[scene]

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: lite ? 16 : 24, overflow: "hidden" }}>
      {/* Animated gradient background */}
      <motion.div
        aria-hidden
        animate={reduced ? { opacity: 0.4 } : { opacity: [0.25, 0.5, 0.25] }}
        transition={reduced ? { duration: 0.01 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: -40,
          background: `radial-gradient(500px 400px at 30% 20%, ${tone.replace("0.92", "0.20").replace("0.88", "0.18")}, rgba(0,0,0,0)), radial-gradient(400px 300px at 80% 70%, ${accent}, rgba(0,0,0,0))`,
          pointerEvents: "none",
        }}
      />

      {/* Decorative grid lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          maskImage: "radial-gradient(500px 400px at 50% 50%, black 20%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(500px 400px at 50% 50%, black 20%, transparent 90%)",
        }}
      />

      {/* Floating accent orb */}
      <motion.div
        aria-hidden
        animate={reduced ? { scale: 1, opacity: 0.15 } : { scale: [1, 1.3, 1], opacity: [0.12, 0.25, 0.12], x: [0, 20, 0], y: [0, -15, 0] }}
        transition={reduced ? { duration: 0.01 } : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: lite ? 100 : 140,
          height: lite ? 100 : 140,
          borderRadius: "50%",
          background: tone,
          filter: `blur(${lite ? 40 : 60}px)`,
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          animate={reduced ? {} : { scale: [1, 1.05, 1] }}
          transition={reduced ? { duration: 0.01 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: lite ? 60 : 76,
            height: lite ? 60 : 76,
            borderRadius: lite ? 16 : 20,
            border: `1px solid ${tone.replace("0.92", "0.30").replace("0.88", "0.28")}`,
            background: `linear-gradient(135deg, ${tone.replace("0.92", "0.14").replace("0.88", "0.12")}, rgba(0,0,0,0.30))`,
            color: tone,
            boxShadow: `0 0 40px ${tone.replace("0.92", "0.14").replace("0.88", "0.12")}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          {sceneIcon}
        </motion.div>
      </div>

      {/* Headline */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0.01 } : { duration: 0.4, delay: 0.1 }}
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: lite ? 14 : 18,
          fontSize: lite ? 22 : 28,
          fontWeight: 980,
          letterSpacing: -0.5,
          lineHeight: 1.15,
          color: "rgba(255,255,255,0.95)",
        }}
      >
        {data.headline}
      </motion.div>

      {/* Body */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0.01 } : { duration: 0.4, delay: 0.18 }}
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: lite ? 6 : 10,
          fontSize: lite ? 13 : 14,
          fontWeight: 700,
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.52)",
          maxWidth: 360,
        }}
      >
        {data.body}
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0.01 } : { duration: 0.4, delay: 0.28 }}
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: lite ? 16 : 22,
          display: "flex",
          gap: lite ? 8 : 10,
          flexWrap: "wrap",
        }}
      >
        {data.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduced ? { duration: 0.01 } : { duration: 0.35, delay: 0.3 + i * 0.08 }}
            style={{
              padding: lite ? "8px 12px" : "10px 14px",
              borderRadius: 14,
              border: `1px solid ${tone.replace("0.92", "0.18").replace("0.88", "0.16")}`,
              background: `linear-gradient(180deg, ${tone.replace("0.92", "0.08").replace("0.88", "0.06")}, rgba(0,0,0,0.30))`,
              backdropFilter: lite ? undefined : "blur(8px)",
              WebkitBackdropFilter: lite ? undefined : "blur(8px)",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 850, color: "rgba(255,255,255,0.46)", textTransform: "uppercase" as const, letterSpacing: 0.6 }}>{stat.label}</div>
            <div style={{ marginTop: 3, fontSize: lite ? 16 : 18, fontWeight: 980, color: tone, letterSpacing: -0.3 }}>{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        aria-hidden
        animate={reduced ? { scaleX: 0.5, opacity: 0.3 } : { scaleX: [0.2, 1, 0.2], opacity: [0.15, 0.45, 0.15] }}
        transition={reduced ? { duration: 0.01 } : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: 2,
          borderRadius: 999,
          background: `linear-gradient(90deg, rgba(0,0,0,0), ${tone}, rgba(0,0,0,0))`,
          transformOrigin: "center",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
