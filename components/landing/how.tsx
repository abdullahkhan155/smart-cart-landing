"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { BarChart3, CheckCircle2, CreditCard, MapPin, Mic, ScanLine, ShieldCheck, Sparkles } from "lucide-react"
import { Card, Pill, SectionTitle, usePrefersReducedMotion } from "./ui"

type Scene = "assist" | "promo" | "scan" | "pay" | "security" | "insights"

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
  body: string
  scene: Scene
  icon: React.ReactNode
  accent: string
  accentStrong: string
  image?: string
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
          body: "Talk or tap. The cart gives one clear next move and points you to the shelf.",
          scene: "assist" as const,
          icon: <Mic size={16} />,
          accent: "rgba(0,255,208,0.16)",
          accentStrong: "rgba(0,255,208,0.92)",
          image: "/AI_Screen.png",
        },
        {
          k: "Step 02",
          title: "Surface the right deal",
          body: "Promos appear when they save money and match what\'s in your basket.",
          scene: "promo" as const,
          icon: <Sparkles size={16} />,
          accent: "rgba(255,170,80,0.14)",
          accentStrong: "rgba(255,170,80,0.92)",
          image: "/Promo.png",
        },
        {
          k: "Step 03",
          title: "Scan as you pick",
          body: "Instant confirmation, fewer mistakes, and a running total that stays obvious.",
          scene: "scan" as const,
          icon: <ScanLine size={16} />,
          accent: "rgba(0,255,208,0.12)",
          accentStrong: "rgba(0,255,208,0.88)",
          image: "/Self_Checkout.png",
        },
        {
          k: "Step 04",
          title: "Pay on cart",
          body: "Tap to pay, get a receipt, and finish the trip without a lane.",
          scene: "pay" as const,
          icon: <CreditCard size={16} />,
          accent: "rgba(160,120,255,0.14)",
          accentStrong: "rgba(160,120,255,0.92)",
          image: "/Self_Checkout.png",
        },
        {
          k: "Step 05",
          title: "Keep every basket secure",
          body: "Real-time integrity checks reduce shrink without slowing honest shoppers.",
          scene: "security" as const,
          icon: <ShieldCheck size={16} />,
          accent: "rgba(0,190,120,0.14)",
          accentStrong: "rgba(0,190,120,0.92)",
          image: "/Security.png",
        },
        {
          k: "Step 06",
          title: "Measure and improve",
          body: "Dashboards track throughput, promo lift, and exceptions - so the system keeps getting better.",
          scene: "insights" as const,
          icon: <BarChart3 size={16} />,
          accent: "rgba(0,255,208,0.12)",
          accentStrong: "rgba(0,255,208,0.88)",
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
  const perfReduced = compact && scrolling

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

      // User scroll = user intent. Pause autoplay briefly while scrolling in this section.
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

      // If nothing is visible (fast scroll / edge cases), pick the closest step overall.
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
    <section ref={sectionRef} id="how" style={{ position: "relative", paddingTop: 92, paddingBottom: 92 }}>
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

      <div style={{ width: "min(1200px, calc(100% - 40px))", margin: "0 auto", position: "relative" }}>
        <SectionTitle
          eyebrow="How it works"
          title="Get Assistance. Find Deals. Checkout Faster."
          subtitle="A cart that helps first, sells smarter, and ends the trip without a line."
        />

        <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: narrow ? "1fr" : "560px minmax(0, 1fr)", gap: 18, alignItems: "start" }}>
          <div
            ref={stickyCardRef}
            style={
              narrow
                ? { position: "sticky", top: compact ? 76 : 86, zIndex: 20 }
                : { position: "sticky", top: 96 }
            }
          >
            <Card style={{ padding: compact ? 14 : 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Interactive cart demo</div>
                  <div style={{ marginTop: 4, fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.62)" }}>
                    {compact ? "Tap a step (or icons) to explore." : "Tap a step (or the tabs) to explore. Auto-plays while visible."}
                  </div>
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
            <div style={{ display: "grid", gap: 12 }}>
              {steps.map((s, i) => (
                <StepCard
                  key={s.k}
                  step={s.k}
                  title={s.title}
                  body={s.body}
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
            <div aria-hidden style={{ height: compact ? 80 : narrow ? 240 : 280 }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({
  step,
  title,
  body,
  icon,
  accent,
  active,
  onClick,
  compact,
  buttonRef,
}: {
  step: string
  title: string
  body: string
  icon: React.ReactNode
  accent: string
  active: boolean
  onClick: () => void
  compact?: boolean
  buttonRef?: (el: HTMLButtonElement | null) => void
}) {
  const pad = compact ? 14 : 18
  const iconBox = compact ? 34 : 38
  const iconRadius = compact ? 12 : 14

  return (
    <motion.button
      type="button"
      onClick={onClick}
      ref={buttonRef}
      animate={{ opacity: active ? 1 : 0.58, y: compact ? 0 : active ? 0 : 10 }}
      transition={{ duration: compact ? 0.22 : 0.28 }}
      style={{
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        padding: pad,
        borderRadius: compact ? 20 : 22,
        border: active ? "1px solid rgba(255,255,255,0.26)" : "1px solid rgba(255,255,255,0.10)",
        background: active
          ? "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))"
          : "rgba(255,255,255,0.03)",
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
          background: `radial-gradient(720px 320px at 14% 20%, ${active ? `${accent.replace("0.92", "0.20").replace("0.88", "0.20")}` : "rgba(0,0,0,0)"}, rgba(0,0,0,0))`,
          opacity: active ? 1 : 0,
          transition: "opacity 240ms ease",
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
                boxShadow: active ? `0 0 30px ${accent.replace("0.92", "0.20").replace("0.88", "0.20")}` : undefined,
              }}
            >
              {icon}
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.16)", color: "rgba(255,255,255,0.78)", fontSize: 12, fontWeight: 950 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: active ? accent : "rgba(255,255,255,0.75)" }} />
              <span>{step}</span>
            </div>
          </div>

          <div aria-hidden style={{ width: 70, height: 2, borderRadius: 999, background: active ? `linear-gradient(90deg, ${accent}, rgba(0,0,0,0))` : "rgba(255,255,255,0.10)" }} />
        </div>

        <div style={{ marginTop: 12, fontSize: compact ? 17 : 18, fontWeight: 980, color: "rgba(255,255,255,0.93)" }}>{title}</div>
        <div style={{ marginTop: 8, fontSize: compact ? 13 : 14, lineHeight: 1.75, color: "rgba(255,255,255,0.72)", fontWeight: 850 }}>{body}</div>
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
  const stageHeight = compact ? 220 : stacked ? 300 : 390
  const shellPadding = compact ? 12 : 14
  const tabButtonPadding = compact ? "9px 8px" : "10px 10px"
  const demoCorner = compact ? 20 : 22
  const navWrapStyle: React.CSSProperties = compact
    ? { marginTop: 12, display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 2 }
    : { marginTop: 12, display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 8 }

  const nav = useMemo(
    () =>
      [
        { scene: "assist" as const, icon: <Mic size={14} />, label: "Assistant" },
        { scene: "promo" as const, icon: <Sparkles size={14} />, label: "Promos" },
        { scene: "scan" as const, icon: <ScanLine size={14} />, label: "Scan" },
        { scene: "pay" as const, icon: <CreditCard size={14} />, label: "Pay" },
        { scene: "security" as const, icon: <ShieldCheck size={14} />, label: "Security" },
        { scene: "insights" as const, icon: <BarChart3 size={14} />, label: "Insights" },
      ],
    []
  )

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
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.24)",
        boxShadow: "0 60px 160px rgba(0,0,0,0.55)",
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

        <div style={{ marginTop: 12, position: "relative", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,0.04), rgba(0,0,0,0), rgba(255,255,255,0.03))" }} />

          <div style={{ position: "relative", height: stageHeight }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.scene}
                initial={animReduced ? { opacity: 1 } : compact ? { opacity: 0, y: 8 } : { opacity: 0, y: 10, scale: 0.99 }}
                animate={animReduced ? { opacity: 1 } : compact ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                exit={animReduced ? { opacity: 1 } : compact ? { opacity: 0, y: -8 } : { opacity: 0, y: -10, scale: 1.01 }}
                transition={animReduced ? { duration: 0.01 } : { duration: compact ? 0.26 : 0.35, ease: "easeOut" }}
                style={{ position: "absolute", inset: 0 }}
              >
                {step.scene === "insights" ? (
                  <InsightsPanel reduced={animReduced} tone={step.accentStrong} lite={compact} />
                ) : (
                  <SceneImage image={step.image ?? ""} reduced={animReduced} tone={step.accentStrong} lite={compact} />
                )}

                <SceneOverlays scene={step.scene} reduced={animReduced} tone={step.accentStrong} lite={compact} />
              </motion.div>
            </AnimatePresence>

            <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(520px 260px at 50% 0%, rgba(255,255,255,0.05), rgba(0,0,0,0))" }} />
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

        <div style={{ marginTop: 10, fontSize: 12, fontWeight: 850, color: "rgba(255,255,255,0.56)", textAlign: "center" }}>
          {reduced ? "Tap a step to switch views." : paused ? "Paused while you explore." : "Auto-rotating preview. Hover to pause."}
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

function SceneImage({ image, reduced, tone, lite }: { image: string; reduced: boolean; tone: string; lite: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <motion.img
        src={image}
        alt=""
        loading="lazy"
        animate={
          reduced
            ? { scale: 1 }
            : lite
              ? { scale: [1, 1.01, 1] }
              : { scale: [1, 1.015, 1], filter: ["saturate(1)", "saturate(1.15)", "saturate(1)"] }
        }
        transition={reduced ? { duration: 0.01 } : { duration: lite ? 8.4 : 7.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "50% 50%",
          display: "block",
          filter: lite ? "none" : "saturate(1.05) contrast(1.02)",
        }}
      />

      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.44))" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(520px 280px at 50% 15%, ${tone.replace("0.92", "0.12").replace("0.88", "0.10")}, rgba(0,0,0,0))` }} />
    </div>
  )
}

function SceneOverlays({ scene, reduced, tone, lite }: { scene: Scene; reduced: boolean; tone: string; lite: boolean }) {
  if (scene === "assist") {
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        <DemoToast reduced={reduced} tone={tone} lite={lite} at={{ left: 14, top: 14 }} title="Listening" body={'Ask: "Where is pasta sauce?"'} />
        <DemoToast reduced={reduced} tone={tone} lite={lite} at={{ left: 14, bottom: 14 }} title="Route ready" body="Aisle 6 - Top shelf" />
      </div>
    )
  }

  if (scene === "promo") {
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        <DemoToast reduced={reduced} tone={tone} lite={lite} at={{ left: 14, top: 14 }} title="Deal nearby" body="Olive oil - 15% off in Aisle 7" />
        <motion.div
          aria-hidden
          animate={reduced ? { opacity: 0.7 } : { opacity: [0.0, 0.85, 0.0], y: [10, 0, -10] }}
          transition={reduced ? { duration: 1 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            right: 16,
            top: 74,
            width: 10,
            height: 10,
            borderRadius: 999,
            background: tone,
            boxShadow: `0 0 20px ${tone.replace("0.92", "0.22").replace("0.88", "0.20")}`,
          }}
        />
      </div>
    )
  }

  if (scene === "scan") {
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        <motion.div
          aria-hidden
          animate={reduced ? { opacity: 0.6 } : { y: [26, 270, 26], opacity: [0, 0.9, 0] }}
          transition={reduced ? { duration: 1 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            height: 4,
            borderRadius: 999,
            background: `linear-gradient(90deg, rgba(0,0,0,0), ${tone}, rgba(0,0,0,0))`,
            boxShadow: `0 0 26px ${tone.replace("0.92", "0.18").replace("0.88", "0.16")}`,
            top: 0,
          }}
        />
        <DemoToast reduced={reduced} tone={tone} lite={lite} at={{ right: 14, top: 14 }} title="Added" body="Olive oil -$1.20" />
        <BasketMini reduced={reduced} tone={tone} lite={lite} />
      </div>
    )
  }

  if (scene === "pay") {
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        <DemoToast reduced={reduced} tone={tone} lite={lite} at={{ left: 14, top: 14 }} title="Total ready" body="$48.72 - Tap to pay" />
        <motion.div
          initial={reduced ? false : { y: 18, opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { y: [18, 8, 18], opacity: [0.9, 1, 0.9] }}
          transition={reduced ? { duration: 0.01 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 14,
            padding: 12,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.16)",
            background: lite ? "rgba(0,0,0,0.62)" : "rgba(0,0,0,0.48)",
            backdropFilter: lite ? undefined : "blur(10px)",
            WebkitBackdropFilter: lite ? undefined : "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.90)" }}>Pay on cart</div>
            <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>No lane</div>
          </div>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 12px", borderRadius: 14, border: `1px solid ${tone.replace("0.92", "0.24").replace("0.88", "0.22")}`, background: tone.replace("0.92", "0.14").replace("0.88", "0.12"), color: "rgba(255,255,255,0.92)", fontWeight: 980, fontSize: 13 }}>
            <CheckCircle2 size={16} />
            <span>Tap to pay</span>
          </div>
        </motion.div>
      </div>
    )
  }

  if (scene === "security") {
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        <DemoToast reduced={reduced} tone={tone} lite={lite} at={{ left: 14, top: 14 }} title="Integrity" body="All items accounted for" />
        <DemoToast reduced={reduced} tone={tone} lite={lite} at={{ left: 14, bottom: 14 }} title="Low friction" body="Alerts only when something is off" />
        <motion.div
          aria-hidden
          animate={reduced ? { opacity: 0.55 } : { opacity: [0.2, 0.65, 0.2], scale: [0.98, 1.02, 0.98] }}
          transition={reduced ? { duration: 1 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            right: 20,
            top: 78,
            width: 120,
            height: 120,
            borderRadius: 999,
            border: `1px solid ${tone.replace("0.92", "0.35").replace("0.88", "0.33")}`,
            boxShadow: `0 0 28px ${tone.replace("0.92", "0.16").replace("0.88", "0.14")}`,
          }}
        />
      </div>
    )
  }

  return null
}

function DemoToast({
  title,
  body,
  at,
  reduced,
  tone,
  lite,
}: {
  title: string
  body: string
  at: Partial<Record<"left" | "right" | "top" | "bottom", number>>
  reduced: boolean
  tone: string
  lite: boolean
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0.01 } : { duration: 0.35, ease: "easeOut" }}
      style={{
        position: "absolute",
        ...at,
        maxWidth: 240,
        padding: "10px 12px",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.16)",
        background: lite ? "rgba(0,0,0,0.62)" : "rgba(0,0,0,0.48)",
        backdropFilter: lite ? undefined : "blur(10px)",
        WebkitBackdropFilter: lite ? undefined : "blur(10px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 980, color: "rgba(255,255,255,0.90)" }}>{title}</div>
        <div aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: tone, boxShadow: `0 0 16px ${tone.replace("0.92", "0.22").replace("0.88", "0.20")}` }} />
      </div>
      <div style={{ marginTop: 4, fontSize: 12, fontWeight: 850, color: "rgba(255,255,255,0.70)", lineHeight: 1.45 }}>{body}</div>
    </motion.div>
  )
}

function BasketMini({ reduced, tone, lite }: { reduced: boolean; tone: string; lite: boolean }) {
  const items = [
    { name: "Pasta", price: "$2.99" },
    { name: "Olive oil", price: "$8.49" },
    { name: "Chips", price: "$3.79" },
    { name: "Bread", price: "$2.59" },
  ]

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0.01 } : { duration: 0.35, ease: "easeOut", delay: 0.05 }}
      style={{
        position: "absolute",
        left: 14,
        bottom: 14,
        width: 270,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.14)",
        background: lite ? "rgba(0,0,0,0.62)" : "rgba(0,0,0,0.48)",
        backdropFilter: lite ? undefined : "blur(10px)",
        WebkitBackdropFilter: lite ? undefined : "blur(10px)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.90)", fontSize: 12 }}>Basket</div>
        <div style={{ fontWeight: 950, color: "rgba(255,255,255,0.70)", fontSize: 12 }}>Total $48.72</div>
      </div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.10)" }} />
      <div style={{ padding: 12, display: "grid", gap: 8 }}>
        {items.map((it, idx) => (
          <motion.div
            key={it.name}
            initial={reduced ? false : { opacity: 0, x: -12 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={reduced ? { duration: 0.01 } : { duration: 0.35, ease: "easeOut", delay: idx * 0.06 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div aria-hidden style={{ width: 9, height: 9, borderRadius: 999, background: tone.replace("0.92", "0.85").replace("0.88", "0.80"), boxShadow: `0 0 14px ${tone.replace("0.92", "0.18").replace("0.88", "0.16")}` }} />
              <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.78)" }}>{it.name}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 950, color: "rgba(255,255,255,0.76)" }}>{it.price}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function InsightsPanel({ reduced, tone, lite }: { reduced: boolean; tone: string; lite: boolean }) {
  const bars = [0.55, 0.85, 0.62, 0.72, 0.46, 0.68]
  return (
    <div style={{ position: "absolute", inset: 0, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Store dashboard</div>
          <div style={{ marginTop: 4, fontSize: 12, fontWeight: 850, color: "rgba(255,255,255,0.66)" }}>Throughput, promo lift, exceptions</div>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.28)", color: "rgba(255,255,255,0.78)", fontSize: 12, fontWeight: 950 }}>
          <BarChart3 size={14} style={{ opacity: 0.9 }} />
          <span>Today</span>
        </div>
      </div>

      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
        <MetricChip label="Time saved" value="12m" tone={tone} />
        <MetricChip label="Promo lift" value="+9%" tone={tone} />
        <MetricChip label="Exceptions" value="Low" tone={tone} />
      </div>

      <div style={{ marginTop: 12, position: "absolute", left: 16, right: 16, bottom: 16, height: 160, borderRadius: 18, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.25)", padding: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: "100%" }}>
          {bars.map((b, i) => (
            <motion.div
              key={i}
              animate={
                reduced || lite
                  ? { height: `${b * 100}%` }
                  : { height: [`${b * 60}%`, `${b * 100}%`, `${b * 60}%`] }
              }
              transition={
                reduced
                  ? { duration: 0.01 }
                  : lite
                    ? { duration: 0.55, ease: "easeOut", delay: i * 0.03 }
                    : { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }
              }
              style={{
                width: "100%",
                borderRadius: 14,
                background: `linear-gradient(180deg, ${tone.replace("0.92", "0.18").replace("0.88", "0.16")}, rgba(255,255,255,0.05))`,
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MetricChip({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div style={{ padding: 12, borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)" }}>
      <div style={{ fontSize: 12, fontWeight: 850, color: "rgba(255,255,255,0.66)" }}>{label}</div>
      <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{value}</div>
        <div aria-hidden style={{ width: 10, height: 10, borderRadius: 999, background: tone, boxShadow: `0 0 18px ${tone.replace("0.92", "0.22").replace("0.88", "0.20")}` }} />
      </div>
    </div>
  )
}
