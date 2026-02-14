"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { ArrowRight, Check, CreditCard, MapPin, Mic, Package, Sparkles, Star, ShoppingBag, Wand2, TrendingUp, Percent, Gift, Zap, Shield, ScanLine, Navigation, Clock, Footprints } from "lucide-react"
import { Card, useBreakpoint, usePrefersReducedMotion } from "./ui"
import { Pill } from "./Pill"

type Mode = "ask" | "map" | "promo" | "checkout"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const FLOW: Mode[] = ["ask", "map", "promo", "checkout"]
const SCRIPT_DELAYS: Record<Mode, readonly number[]> = {
  ask: [2200, 4200, 3000, 4200, 2600],
  map: [1800, 2200, 2400, 2000],
  promo: [2400, 3000, 2800],
  checkout: [2200, 2600, 3000, 3600],
}

export function TryCartSection() {
  const isMobile = useBreakpoint(768)

  if (isMobile) return <MobileFeatureShowcase />

  return <DesktopTryCartDemo />
}

function DesktopTryCartDemo() {
  const demo = useTryCartDemo()
  const { panelRef, ...cardProps } = demo

  return (
    <section id="try" style={{ paddingTop: 20, paddingBottom: 16 }}>
      <div style={{ width: "min(960px, calc(100% - 32px))", margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 12, justifyItems: "center", textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", color: "rgba(255,255,255,0.70)", fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <span style={{ position: "relative", display: "flex", width: 8, height: 8 }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: "rgba(0,255,224,0.8)", animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
              <span style={{ position: "relative", width: 8, height: 8, borderRadius: 999, background: "var(--accent)" }} />
            </span>
            <span>Live cart demo</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.95)", margin: 0, lineHeight: 1.1 }}>
            Experience the <span style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>cart</span>
          </h2>
          <p style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: 420 }}>
            Watch how Vexa handles questions, deals, and checkout in real time.
          </p>
        </div>

        <div ref={panelRef}>
          <TryCartCard {...cardProps} />
        </div>
      </div>
    </section>
  )
}

/* ─── MOBILE FEATURE SHOWCASE ─── */
const MOBILE_FEATURES = [
  {
    icon: Mic,
    title: "Ask anything",
    desc: "\"Where are running shoes under $80?\" — Vexa finds it, prices it, and tells you exactly where to go.",
    accent: "rgba(0,255,208,0.95)",
    accentBg: "rgba(0,255,208,0.08)",
    accentBorder: "rgba(0,255,208,0.22)",
    stat: "< 2s",
    statLabel: "response time",
  },
  {
    icon: Navigation,
    title: "Store navigation",
    desc: "GPS-like turn-by-turn routing inside any store. Never wander aisles again.",
    accent: "rgba(56,189,248,0.95)",
    accentBg: "rgba(56,189,248,0.08)",
    accentBorder: "rgba(56,189,248,0.22)",
    stat: "45s",
    statLabel: "avg find time",
  },
  {
    icon: Gift,
    title: "Smart promos",
    desc: "AI matches deals to your cart in real time. Coupons, bundles, and loyalty points — auto-applied.",
    accent: "rgba(255,170,80,0.95)",
    accentBg: "rgba(255,170,80,0.08)",
    accentBorder: "rgba(255,170,80,0.22)",
    stat: "$18+",
    statLabel: "avg savings",
  },
  {
    icon: CreditCard,
    title: "Zero-lane checkout",
    desc: "Scan, pay on the cart screen, and walk out. No lines, no waiting.",
    accent: "rgba(160,120,255,0.95)",
    accentBg: "rgba(160,120,255,0.08)",
    accentBorder: "rgba(160,120,255,0.22)",
    stat: "0",
    statLabel: "checkout lines",
  },
] as const

function MobileFeatureShowcase() {
  return (
    <section id="try" style={{ paddingTop: 32, paddingBottom: 16 }}>
      <div style={{ width: "calc(100% - 32px)", margin: "0 auto", maxWidth: 480 }}>
        {/* Header */}
        <div style={{ display: "grid", gap: 10, justifyItems: "center", textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.70)", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--accent)" }} />
            <span>How it works</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.95)", margin: 0, lineHeight: 1.1 }}>
            4 ways Vexa{" "}
            <span style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              transforms
            </span>{" "}
            shopping
          </h2>
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gap: 12 }}>
          {MOBILE_FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                style={{
                  borderRadius: 20,
                  border: `1px solid ${f.accentBorder}`,
                  background: `linear-gradient(145deg, ${f.accentBg}, rgba(0,0,0,0.30))`,
                  padding: 18,
                  display: "grid",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 14,
                      background: f.accentBg,
                      border: `1px solid ${f.accentBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={18} color={f.accent} />
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 16, color: "rgba(255,255,255,0.94)" }}>
                      {f.title}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 20, fontWeight: 980, color: f.accent, lineHeight: 1 }}>{f.stat}</div>
                    <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,0.40)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>{f.statLabel}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>
                  {f.desc}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom stat banner */}
        <div style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
        }}>
          {[
            { value: "97%", label: "Accuracy" },
            { value: "3x", label: "Faster trips" },
            { value: "$18+", label: "Avg saved" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "14px 8px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 980, background: "linear-gradient(135deg, var(--accent), var(--accent-2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.40)", textTransform: "uppercase" as const, letterSpacing: 0.5, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TryCartHeroCard() {
  const demo = useTryCartDemo()
  const { panelRef, ...cardProps } = demo
  return (
    <div ref={panelRef}>
      <TryCartCard {...cardProps} />
    </div>
  )
}

function useTryCartDemo() {
  const reduced = usePrefersReducedMotion()
  const isMobile = useBreakpoint(820)
  const [mode, setMode] = useState<Mode>("ask")
  const [scriptStep, setScriptStep] = useState(0)
  const [scriptRun, setScriptRun] = useState(0)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(panelRef, { amount: 0.4 })

  const flowIndex = FLOW.indexOf(mode)
  const totalSteps = SCRIPT_DELAYS[mode].length + 1

  const modes = useMemo(
    () =>
      [
        {
          id: "ask" as const,
          label: "Ask the cart",
          accent: "rgba(0,255,208,0.28)",
          accentSolid: "rgba(0,255,208,0.95)",
          desc: "Voice-first answers, aisle-aware.",
        },
        {
          id: "map" as const,
          label: "Store navigation",
          accent: "rgba(56,189,248,0.28)",
          accentSolid: "rgba(56,189,248,0.95)",
          desc: "GPS-like in-store routing.",
        },
        {
          id: "promo" as const,
          label: "Smart promos",
          accent: "rgba(255,170,80,0.28)",
          accentSolid: "rgba(255,170,80,0.95)",
          desc: "Personalized offers in real time.",
        },
        {
          id: "checkout" as const,
          label: "Self-checkout",
          accent: "rgba(160,120,255,0.28)",
          accentSolid: "rgba(160,120,255,0.95)",
          desc: "Scan, total, and walk out.",
        },
      ] as const,
    []
  )

  const active = modes.find((m) => m.id === mode)!

  useEffect(() => {
    setScriptStep(0)
    if (reduced || !isInView) return
    const delays = SCRIPT_DELAYS[mode]
    const timers: number[] = []
    let acc = 0
    for (let i = 0; i < delays.length; i++) {
      acc += delays[i] ?? 800
      timers.push(window.setTimeout(() => setScriptStep((s) => Math.min(s + 1, totalSteps - 1)), acc))
    }
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [mode, reduced, isInView, totalSteps, scriptRun])

  const goNext = () => setMode(FLOW[(flowIndex + 1) % FLOW.length])
  const restartScript = () => {
    setScriptStep(0)
    setScriptRun((v) => v + 1)
  }

  useEffect(() => {
    if (scriptStep < totalSteps - 1) return
    const timer = window.setTimeout(
      () => setMode(FLOW[(flowIndex + 1) % FLOW.length]),
      reduced ? 3500 : 5000
    )
    return () => window.clearTimeout(timer)
  }, [mode, scriptStep, totalSteps, flowIndex, reduced])

  return {
    reduced,
    isMobile,
    mode,
    setMode,
    scriptStep,
    totalSteps,
    flow: FLOW as readonly Mode[],
    flowIndex,
    panelRef,
    active,
    goNext,
    restartScript,
  }
}

type TryCartDemo = ReturnType<typeof useTryCartDemo>
type TryCartCardProps = Omit<TryCartDemo, "panelRef">

function TryCartCard({
  reduced,
  isMobile,
  mode,
  setMode,
  scriptStep,
  totalSteps,
  flow,
  flowIndex,
  active,
  goNext,
  restartScript,
}: TryCartCardProps) {
  return (
    <Card style={{ padding: isMobile ? 14 : 20, position: "relative", overflow: "hidden", boxShadow: "0 30px 100px -20px rgba(0,0,0,0.6)" }}>

      <div style={{ position: "relative", zIndex: 1, display: "grid", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 14, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} style={{ opacity: 0.92 }} />
            </div>
            <div>
              <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.94)" }}>Cart screen</div>
              <div style={{ fontSize: 12, fontWeight: 850, color: "rgba(255,255,255,0.64)" }}>Guided live preview</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <MiniChip text="Live" tone="rgba(0,255,208,0.85)" />
            <MiniChip text="In store" tone="rgba(255,255,255,0.75)" />
            <ActionButton icon={<Sparkles size={12} />} label="Replay demo" onClick={restartScript} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: isMobile ? "8px 10px" : "10px 12px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "linear-gradient(140deg, rgba(255,255,255,0.04), rgba(0,0,0,0.18))",
            boxShadow: "0 12px 44px rgba(0,0,0,0.28)",
          }}
        >
          <FlowRail flow={flow} activeIndex={flowIndex} onSelect={(i) => setMode(flow[i])} />
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.30)",
              minHeight: isMobile ? 380 : 440,
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.55))", zIndex: 1 }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.48, ease: EASE }}
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  minHeight: isMobile ? 380 : 440,
                  padding: isMobile ? 16 : 22,
                  paddingBottom: isMobile ? 20 : 24,
                  display: "grid",
                  gap: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 999, background: active.accentSolid, boxShadow: `0 0 14px ${active.accent}` }} />
                    <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.2, color: "rgba(255,255,255,0.80)" }}>{active.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 850, color: "rgba(255,255,255,0.62)" }}>Simulated cart view</span>
                </div>

                {mode === "ask" ? <AskScreen onNext={goNext} step={scriptStep} reduced={reduced} /> : null}
                {mode === "map" ? <MapScreen onNext={goNext} step={scriptStep} reduced={reduced} /> : null}
                {mode === "promo" ? <PromoScreen onNext={goNext} step={scriptStep} reduced={reduced} /> : null}
                {mode === "checkout" ? <CheckoutScreen step={scriptStep} reduced={reduced} /> : null}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </Card>
  )
}

function FlowRail({ flow, activeIndex, onSelect }: { flow: readonly Mode[]; activeIndex: number; onSelect: (i: number) => void }) {
  const pct = ((activeIndex + 1) / flow.length) * 100
  const labels: Record<Mode, string> = { ask: "Ask", map: "Map", promo: "Promo", checkout: "Checkout" }
  const accents: Record<Mode, string> = {
    ask: "rgba(0,255,208,0.95)",
    map: "rgba(56,189,248,0.95)",
    promo: "rgba(255,170,80,0.95)",
    checkout: "rgba(160,120,255,0.95)",
  }
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
        {flow.map((step, i) => {
          const isActive = i === activeIndex
          const isDone = i < activeIndex
          const accent = accents[step]
          return (
            <button
              key={step}
              type="button"
              onClick={() => onSelect(i)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                borderRadius: 999,
                border: isActive ? `1.5px solid ${accent}` : "1px solid rgba(255,255,255,0.14)",
                background: isActive
                  ? `linear-gradient(120deg, ${accent.replace("0.95", "0.14")}, ${accent.replace("0.95", "0.06")})`
                  : isDone
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.20)",
                color: isActive ? accent : isDone ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.50)",
                fontSize: 13.5,
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: isActive ? `0 0 20px ${accent.replace("0.95", "0.20")}` : "none",
                transition: "all 0.3s ease",
                letterSpacing: 0.3,
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  border: isDone ? `1.5px solid rgba(0,255,208,0.50)` : isActive ? `1.5px solid ${accent}` : "1.5px solid rgba(255,255,255,0.20)",
                  background: isDone ? "rgba(0,255,224,0.18)" : isActive ? accent.replace("0.95", "0.15") : "transparent",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isActive ? `0 0 8px ${accent.replace("0.95", "0.30")}` : "none",
                }}
              >
                {isDone ? <Check size={11} style={{ color: "rgba(0,255,208,0.90)" }} /> : null}
                {isActive && !isDone ? <span style={{ width: 7, height: 7, borderRadius: 999, background: accent }} /> : null}
              </span>
              <span>{labels[step]}</span>
            </button>
          )
        })}
      </div>
      <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))", borderRadius: 999, transition: "width 0.6s ease", boxShadow: "0 0 12px rgba(0,255,224,0.3)" }} />
      </div>
    </div>
  )
}

/* ─── ASK SCREEN ─── */
function AskScreen({ onNext, step, reduced }: { onNext: () => void; step: number; reduced: boolean }) {
  const isTyping = step < 3
  const mIn = reduced ? false : { opacity: 0, y: 8 }
  const mAn = { opacity: 1, y: 0 }
  const mTr = reduced ? { duration: 0.01 } : { duration: 0.35, ease: EASE }
  return (
    <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
      {/* User asks */}
      <motion.div initial={mIn} animate={mAn} transition={mTr}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Bubble tone="rgba(255,255,255,0.10)" border="rgba(255,255,255,0.18)" align="right">
            I need running shoes for under $80.
          </Bubble>
        </div>
      </motion.div>

      {/* AI response with location */}
      {step >= 1 ? (
        <motion.div initial={mIn} animate={mAn} transition={mTr}>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Bubble tone="rgba(0,255,208,0.10)" border="rgba(0,255,208,0.28)">
              {reduced ? (
                "Found 3 options in Aisle 7. The Nike Pegasus 41 is on flash sale for $69.99, down from $120."
              ) : (
                <Typewriter text="Found 3 options in Aisle 7. The Nike Pegasus 41 is on flash sale for $69.99, down from $120." />
              )}
            </Bubble>
          </div>
        </motion.div>
      ) : null}

      {/* User follow-up */}
      {step >= 2 ? (
        <motion.div initial={mIn} animate={mAn} transition={mTr}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Bubble tone="rgba(0,0,0,0.18)" border="rgba(255,255,255,0.20)" align="right">
              That sounds great. Do they have my size?
            </Bubble>
          </div>

          {/* Product card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ marginTop: 12, display: "flex", justifyContent: "flex-start" }}
          >
            <div style={{ background: "rgba(20,24,34,0.95)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 16, padding: 14, display: "flex", gap: 14, maxWidth: 360 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "linear-gradient(135deg, rgba(0,255,208,0.15), rgba(88,130,255,0.15))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Zap size={22} color="rgba(0,255,208,0.9)" />
              </div>
              <div style={{ display: "grid", gap: 3, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "white" }}>Nike Pegasus 41</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>Aisle 7 • Size 10 in stock • Cushioned</div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 2 }}>
                  <div style={{ fontSize: 15, fontWeight: 980, color: "white" }}>$69.99</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.40)", textDecoration: "line-through" }}>$120.00</div>
                  <div style={{ display: "flex", gap: 1 }}>
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill={i <= 5 ? "#00FFD0" : "transparent"} color="#00FFD0" />)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}

      {/* AI cross-sell */}
      {step >= 3 ? (
        <motion.div initial={mIn} animate={mAn} transition={mTr}>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Bubble tone="rgba(0,255,208,0.10)" border="rgba(0,255,208,0.26)">
              {reduced ? (
                "Size 10 is in stock. Also, buy these and get performance socks for $4 instead of $12. Want both?"
              ) : (
                <Typewriter text="Size 10 is in stock. Also, buy these and get performance socks for $4 instead of $12. Want both?" />
              )}
            </Bubble>
          </div>
        </motion.div>
      ) : null}

      {/* User accepts */}
      {step >= 4 ? (
        <motion.div initial={mIn} animate={mAn} transition={mTr}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Bubble tone="rgba(0,0,0,0.18)" border="rgba(255,255,255,0.20)" align="right">
              Yes, add both. Take me there.
            </Bubble>
          </div>
        </motion.div>
      ) : null}

      {isTyping ? <TypingBubble label="Vexa is thinking" reduced={reduced} /> : null}

      {/* Route preview */}
      {step >= 2 ? (
        <div style={{ display: "grid", gap: 8, marginTop: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.70)", letterSpacing: 0.2 }}>Route preview</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8 }}>
            <RouteStep label="You are" detail="Aisle 2" active />
            <RouteStep label="Next" detail="Aisle 7" active accent />
            <RouteStep label="Then" detail="Checkout" />
          </div>
        </div>
      ) : null}

      {/* Confirmation cards */}
      {step >= 4 ? (
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
          <div style={{ borderRadius: 14, border: "1px solid rgba(0,255,208,0.24)", background: "rgba(0,255,208,0.08)", padding: 10, display: "grid", gap: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(0,255,208,0.85)" }}>Bundle saved</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.88)" }}>Pegasus 41 + Socks added to cart</div>
          </div>
          <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(0,0,0,0.20)", padding: 10, display: "grid", gap: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>You saved</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.88)" }}>$58.01 off retail price</div>
          </div>
        </div>
      ) : null}

      <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ width: "100%", maxWidth: 240 }}>
          <ActionButton icon={<ArrowRight size={14} />} label="See store navigation" highlight onClick={onNext} disabled={step < 4} />
        </div>
      </div>
    </div>
  )
}

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let index = 0
    // Initial delay before typing starts to separate from bubble appearance
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, index + 1))
        index++
        if (index >= text.length) clearInterval(interval)
      }, 35) // Speed of typing in ms
      return () => clearInterval(interval)
    }, 150)

    return () => clearTimeout(startTimeout)
  }, [text])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            background: "currentColor",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            opacity: showCursor ? 1 : 0,
          }}
        />
      )}
    </span>
  )
}

/* ─── MAP SCREEN ─── */
function MapScreen({ onNext, step, reduced }: { onNext: () => void; step: number; reduced: boolean }) {
  const isTyping = step < 2

  /* Full store layout with categories */
  const aisles: { id: number; x: number; y: number; w: number; h: number; label: string; category?: string }[] = [
    { id: 1, x: 24, y: 22, w: 52, h: 80, label: "1", category: "Grocery" },
    { id: 2, x: 84, y: 22, w: 52, h: 80, label: "2", category: "Electronics" },
    { id: 3, x: 144, y: 22, w: 52, h: 80, label: "3", category: "Home" },
    { id: 4, x: 204, y: 22, w: 52, h: 80, label: "4", category: "Beauty" },
    { id: 5, x: 84, y: 122, w: 52, h: 80, label: "5", category: "Clothing" },
    { id: 6, x: 144, y: 122, w: 52, h: 80, label: "6", category: "Fitness" },
    { id: 7, x: 204, y: 122, w: 52, h: 80, label: "7", category: "Sports" },
    { id: 8, x: 264, y: 22, w: 52, h: 80, label: "8", category: "Toys" },
    { id: 9, x: 324, y: 22, w: 52, h: 80, label: "9", category: "Garden" },
    { id: 10, x: 264, y: 122, w: 52, h: 80, label: "10", category: "Shoes" },
    { id: 11, x: 324, y: 122, w: 52, h: 80, label: "11", category: "Outdoor" },
  ]

  /* Multi-segment route from Aisle 2 to Aisle 7 via aisles */
  const routePath = "M110,108 L110,116 L140,116 L185,116 L230,116 L230,132"
  const startPos = { x: 110, y: 98 }
  const endPos = { x: 230, y: 142 }

  return (
    <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
      {/* Map header bar */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
          padding: "10px 14px", borderRadius: 16,
          background: "linear-gradient(135deg, rgba(56,189,248,0.10), rgba(0,255,224,0.05))",
          border: "1px solid rgba(56,189,248,0.18)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 12,
            background: "linear-gradient(135deg, rgba(56,189,248,0.20), rgba(0,255,224,0.12))",
            border: "1px solid rgba(56,189,248,0.30)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(56,189,248,0.15)",
          }}>
            <Navigation size={16} color="rgba(56,189,248,0.95)" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "white", letterSpacing: 0.2 }}>Navigating to Aisle 7</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.50)" }}>
              Nike Pegasus 41 · Shelf 3
            </div>
          </div>
        </div>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 999,
              background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.30)",
              fontSize: 12, fontWeight: 900, color: "rgba(56,189,248,0.95)",
              boxShadow: "0 0 12px rgba(56,189,248,0.15)",
            }}
          >
            <Clock size={12} />
            <span>{step >= 3 ? "Arrived" : "~45s"}</span>
          </motion.div>
        )}
      </motion.div>

      {/* SVG Store Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        style={{
          borderRadius: 20,
          border: "1px solid rgba(56,189,248,0.22)",
          background: "radial-gradient(ellipse at 40% 40%, rgba(56,189,248,0.08) 0%, rgba(0,0,0,0.40) 70%)",
          padding: 2,
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {reduced ? (
          /* ─── SIMPLIFIED STATIC MAP FOR MOBILE ─── */
          <svg viewBox="0 0 400 180" style={{ width: "100%", height: "auto", display: "block" }}>
            <rect width="400" height="180" fill="rgba(8,10,18,0.80)" rx="14" />
            {/* Simplified aisles – only show key ones */}
            {[[84, 22, "2", true, false], [204, 22, "7", false, true], [144, 22, "3", false, false], [84, 100, "5", false, false], [144, 100, "6", false, false], [204, 100, "7", false, false]].map(([x, y, label, isStart, isDest], i) => (
              <g key={i}>
                <rect x={x as number} y={y as number} width={48} height={65} rx="6"
                  fill={isStart ? "rgba(0,255,224,0.07)" : isDest ? "rgba(56,189,248,0.08)" : "rgba(255,255,255,0.025)"}
                  stroke={isStart ? "rgba(0,255,224,0.30)" : isDest ? "rgba(56,189,248,0.35)" : "rgba(255,255,255,0.06)"}
                  strokeWidth={isStart || isDest ? "1.2" : "0.7"}
                />
                <text x={(x as number) + 24} y={(y as number) + 36} textAnchor="middle"
                  fill={isStart ? "rgba(0,255,224,0.80)" : isDest ? "rgba(56,189,248,0.85)" : "rgba(255,255,255,0.22)"}
                  fontSize="10" fontWeight="900">{label as string}</text>
              </g>
            ))}
            {/* Static route line */}
            {step >= 1 && (
              <path d={routePath} fill="none" stroke="rgba(56,189,248,0.60)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" />
            )}
            {/* YOU marker */}
            <circle cx={startPos.x} cy={startPos.y - 10} r="6" fill="rgba(0,255,224,0.90)" />
            <circle cx={startPos.x} cy={startPos.y - 10} r="2.5" fill="white" />
            <rect x={startPos.x - 14} y={startPos.y - 30} width="28" height="12" rx="4" fill="rgba(0,0,0,0.75)" stroke="rgba(0,255,224,0.35)" strokeWidth="0.8" />
            <text x={startPos.x} y={startPos.y - 21} textAnchor="middle" fill="rgba(0,255,224,0.95)" fontSize="6" fontWeight="900">YOU</text>
            {/* Destination marker */}
            {step >= 2 && (
              <g>
                <circle cx={endPos.x} cy={endPos.y + 10} r="7" fill="rgba(56,189,248,0.90)" />
                <circle cx={endPos.x} cy={endPos.y + 10} r="2.5" fill="white" />
                <rect x={endPos.x + 14} y={endPos.y - 2} width="90" height="28" rx="8" fill="rgba(8,10,18,0.88)" stroke="rgba(56,189,248,0.40)" strokeWidth="1" />
                <text x={endPos.x + 22} y={endPos.y + 11} fill="white" fontSize="7" fontWeight="900">Nike Pegasus 41</text>
                <text x={endPos.x + 22} y={endPos.y + 20} fill="rgba(56,189,248,0.85)" fontSize="6" fontWeight="800">$69.99</text>
              </g>
            )}
          </svg>
        ) : (
          /* ─── FULL ANIMATED MAP FOR DESKTOP ─── */
          <svg viewBox="0 0 400 230" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <pattern id="mapGridPremium" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.4" />
              </pattern>
              <filter id="routeGlowPremium" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,255,224,0.15)" />
                <stop offset="60%" stopColor="rgba(0,255,224,0.05)" />
                <stop offset="100%" stopColor="rgba(0,255,224,0)" />
              </radialGradient>
              <radialGradient id="destGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(56,189,248,0.25)" />
                <stop offset="60%" stopColor="rgba(56,189,248,0.08)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0)" />
              </radialGradient>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0,255,224,0.90)" />
                <stop offset="50%" stopColor="rgba(56,189,248,0.95)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0.90)" />
              </linearGradient>
            </defs>
            <rect width="400" height="230" fill="rgba(8,10,18,0.80)" rx="18" />
            <rect width="400" height="230" fill="url(#mapGridPremium)" rx="18" />
            {[80, 160, 240, 320].map((cx) => (
              <g key={cx}>
                <rect x={cx - 16} y={212} width={32} height={10} rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <text x={cx} y={219} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="5" fontWeight="700">REG</text>
              </g>
            ))}
            <text x="200" y="228" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="6" fontWeight="800" letterSpacing="3">ENTRANCE</text>
            <line x1="155" y1="224" x2="165" y2="224" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
            <line x1="235" y1="224" x2="245" y2="224" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
            {aisles.map((a) => {
              const isStart = a.id === 2
              const isDest = a.id === 7
              const isOnRoute = [2, 5, 6, 7].includes(a.id)
              return (
                <g key={a.id}>
                  {(isStart || isDest) && (
                    <rect x={a.x - 3} y={a.y - 3} width={a.w + 6} height={a.h + 6} rx="10" fill="none"
                      stroke={isStart ? "rgba(0,255,224,0.15)" : "rgba(56,189,248,0.18)"} strokeWidth="1">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
                    </rect>
                  )}
                  <rect x={a.x} y={a.y} width={a.w} height={a.h} rx="7"
                    fill={isStart ? "rgba(0,255,224,0.07)" : isDest ? "rgba(56,189,248,0.08)" : "rgba(255,255,255,0.025)"}
                    stroke={isStart ? "rgba(0,255,224,0.30)" : isDest ? "rgba(56,189,248,0.35)" : isOnRoute ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)"}
                    strokeWidth={isStart || isDest ? "1.2" : "0.7"}
                  />
                  <text x={a.x + a.w / 2} y={a.y + a.h / 2 - 2} textAnchor="middle"
                    fill={isStart ? "rgba(0,255,224,0.80)" : isDest ? "rgba(56,189,248,0.85)" : "rgba(255,255,255,0.22)"}
                    fontSize="10" fontWeight="900">{a.label}</text>
                  {a.category && (
                    <text x={a.x + a.w / 2} y={a.y + a.h / 2 + 10} textAnchor="middle"
                      fill={isStart ? "rgba(0,255,224,0.45)" : isDest ? "rgba(56,189,248,0.50)" : "rgba(255,255,255,0.13)"}
                      fontSize="5.5" fontWeight="700" letterSpacing="0.5">{a.category.toUpperCase()}</text>
                  )}
                </g>
              )
            })}
            <circle cx={startPos.x} cy={startPos.y} r="30" fill="url(#radarPulse)">
              <animate attributeName="r" values="16;40;16" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
            </circle>
            {step >= 1 && (
              <>
                <motion.path d={routePath} fill="none" stroke="rgba(56,189,248,0.18)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" filter="url(#routeGlowPremium)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: "easeInOut" }} />
                <motion.path d={routePath} fill="none" stroke="url(#routeGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: "easeInOut" }} />
                <path d={routePath} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 10">
                  <animate attributeName="stroke-dashoffset" values="0;-32" dur="1.5s" repeatCount="indefinite" />
                </path>
                <circle r="4" fill="rgba(56,189,248,0.95)"><animateMotion dur="3s" repeatCount="indefinite" path={routePath} /></circle>
                <circle r="7" fill="rgba(56,189,248,0.20)"><animateMotion dur="3s" repeatCount="indefinite" path={routePath} /></circle>
              </>
            )}
            <circle cx={startPos.x} cy={startPos.y} r="7" fill="rgba(0,255,224,0.90)">
              <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx={startPos.x} cy={startPos.y} r="3" fill="white" />
            <g>
              <rect x={startPos.x - 18} y={startPos.y - 24} width="36" height="15" rx="5" fill="rgba(0,0,0,0.75)" stroke="rgba(0,255,224,0.35)" strokeWidth="0.8" />
              <text x={startPos.x} y={startPos.y - 14} textAnchor="middle" fill="rgba(0,255,224,0.95)" fontSize="7" fontWeight="900">YOU</text>
            </g>
            {step >= 2 && (
              <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE }}>
                <circle cx={endPos.x} cy={endPos.y} r="22" fill="url(#destGlow)">
                  <animate attributeName="r" values="18;28;18" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={endPos.x} cy={endPos.y} r="8" fill="rgba(56,189,248,0.90)" />
                <circle cx={endPos.x} cy={endPos.y} r="3" fill="white" />
                <polygon points={`${endPos.x - 4},${endPos.y + 7} ${endPos.x + 4},${endPos.y + 7} ${endPos.x},${endPos.y + 14}`} fill="rgba(56,189,248,0.70)" />
                <g>
                  <rect x={endPos.x + 16} y={endPos.y - 20} width="108" height="38" rx="10" fill="rgba(8,10,18,0.88)" stroke="rgba(56,189,248,0.40)" strokeWidth="1" />
                  <rect x={endPos.x + 17} y={endPos.y - 19} width="3" height="36" rx="1.5" fill="rgba(56,189,248,0.50)" />
                  <text x={endPos.x + 28} y={endPos.y - 6} fill="white" fontSize="8" fontWeight="900">Nike Pegasus 41</text>
                  <text x={endPos.x + 28} y={endPos.y + 4} fill="rgba(56,189,248,0.85)" fontSize="7" fontWeight="800">$69.99</text>
                  <text x={endPos.x + 66} y={endPos.y + 4} fill="rgba(255,255,255,0.35)" fontSize="6" fontWeight="700" textDecoration="line-through">$120</text>
                  <text x={endPos.x + 28} y={endPos.y + 13} fill="rgba(255,255,255,0.35)" fontSize="5.5" fontWeight="700">Shelf 3 · Size 10 in stock</text>
                </g>
              </motion.g>
            )}
          </svg>
        )}
      </motion.div>

      {/* Turn-by-turn + stats row */}
      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ display: "grid", gap: 6 }}
        >
          <div style={{ fontSize: 11, fontWeight: 950, color: "rgba(255,255,255,0.50)", letterSpacing: 0.8, textTransform: "uppercase" as const }}>
            Directions
          </div>
          <div style={{ display: "grid", gap: 5 }}>
            <DirectionStep number={1} icon={<Footprints size={12} />} text="Head down from Aisle 2" active done={step >= 3} />
            <DirectionStep number={2} icon={<ArrowRight size={12} />} text="Turn right past Aisle 5" active={step >= 2} done={step >= 3} />
            <DirectionStep number={3} icon={<MapPin size={12} />} text="Aisle 7, Shelf 3 on your left" active={step >= 3} done={step >= 4} />
          </div>
        </motion.div>
      )}

      {/* Arrival cards */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}
        >
          <div style={{
            padding: 12, borderRadius: 16,
            border: "1px solid rgba(0,255,224,0.25)",
            background: "linear-gradient(145deg, rgba(0,255,224,0.08), rgba(0,255,224,0.02))",
            display: "grid", gap: 3,
            boxShadow: "0 4px 20px rgba(0,255,224,0.08)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Check size={13} color="rgba(0,255,224,0.9)" />
              <span style={{ fontSize: 11, fontWeight: 900, color: "rgba(0,255,224,0.90)" }}>Arrived</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.90)" }}>Pegasus 41 is right here</div>
          </div>
          <div style={{
            padding: 12, borderRadius: 16,
            border: "1px solid rgba(56,189,248,0.22)",
            background: "linear-gradient(145deg, rgba(56,189,248,0.08), rgba(56,189,248,0.02))",
            display: "grid", gap: 3,
            boxShadow: "0 4px 20px rgba(56,189,248,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Footprints size={13} color="rgba(56,189,248,0.85)" />
              <span style={{ fontSize: 11, fontWeight: 900, color: "rgba(56,189,248,0.90)" }}>Trip</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.90)" }}>~120 ft · 42 seconds</div>
          </div>
        </motion.div>
      )}

      {isTyping ? <TypingBubble label="Plotting route" tone="rgba(56,189,248,0.9)" reduced={reduced} /> : null}

      <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ width: "100%", maxWidth: 240 }}>
          <ActionButton icon={<ArrowRight size={14} />} label="See smart promos" highlight onClick={onNext} disabled={step < 3} />
        </div>
      </div>
    </div>
  )
}

function DirectionStep({ number, text, icon, active, done }: { number: number; text: string; icon: React.ReactNode; active?: boolean; done?: boolean }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 12px",
      borderRadius: 14,
      border: done ? "1px solid rgba(0,255,224,0.18)" : active ? "1px solid rgba(56,189,248,0.22)" : "1px solid rgba(255,255,255,0.06)",
      background: done ? "rgba(0,255,224,0.04)" : active ? "rgba(56,189,248,0.04)" : "rgba(0,0,0,0.12)",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        width: 24,
        height: 24,
        borderRadius: 8,
        background: done ? "rgba(0,255,224,0.12)" : active ? "rgba(56,189,248,0.10)" : "rgba(255,255,255,0.04)",
        border: done ? "1px solid rgba(0,255,224,0.30)" : active ? "1px solid rgba(56,189,248,0.20)" : "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: done ? "rgba(0,255,224,0.9)" : active ? "rgba(56,189,248,0.85)" : "rgba(255,255,255,0.30)",
      }}>
        {done ? <Check size={12} /> : icon}
      </div>
      <span style={{ fontSize: 12, fontWeight: 800, color: done ? "rgba(255,255,255,0.55)" : active ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.30)", textDecoration: done ? "line-through" : "none" }}>{text}</span>
    </div>
  )
}

/* ─── PROMO SCREEN ─── */
function PromoScreen({ onNext, step, reduced }: { onNext: () => void; step: number; reduced: boolean }) {
  const isTyping = step < 1

  return (
    <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
      {/* Promo hero card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          borderRadius: 20,
          border: "1px solid rgba(255,170,80,0.30)",
          background: "linear-gradient(150deg, rgba(255,170,80,0.20), rgba(255,100,50,0.08), rgba(0,0,0,0.24))",
          padding: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated shimmer */}
        {!reduced && <motion.div
          aria-hidden
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,170,80,0.08), transparent)",
            pointerEvents: "none",
          }}
        />}

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,170,80,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Gift size={16} color="rgba(255,170,80,0.95)" />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 950, letterSpacing: 0.4, color: "rgba(255,170,80,0.95)" }}>PERSONALIZED OFFER</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.45)" }}>AI-matched to your cart</div>
              </div>
            </div>
            <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(255,170,80,0.15)", border: "1px solid rgba(255,170,80,0.30)", fontSize: 11, fontWeight: 900, color: "rgba(255,170,80,0.95)" }}>
              Limited time
            </div>
          </div>

          <div style={{ fontSize: 22, fontWeight: 980, color: "rgba(255,255,255,0.96)", letterSpacing: -0.3, lineHeight: 1.2 }}>
            Buy earbuds, get a case for <span style={{ color: "rgba(255,170,80,0.95)" }}>50% off</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.50)", lineHeight: 1.5 }}>
            Based on your cart items and shopping patterns: This deal saves you $12.
          </div>

          {/* Savings breakdown */}
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            <div style={{ padding: "10px 8px", borderRadius: 12, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 850, color: "rgba(255,255,255,0.50)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>You save</div>
              <div style={{ fontSize: 18, fontWeight: 980, color: "rgba(255,170,80,0.95)", marginTop: 2 }}>$12.00</div>
            </div>
            <div style={{ padding: "10px 8px", borderRadius: 12, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 850, color: "rgba(255,255,255,0.50)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Bundle price</div>
              <div style={{ fontSize: 18, fontWeight: 980, color: "rgba(255,255,255,0.92)", marginTop: 2 }}>$45.99</div>
            </div>
            <div style={{ padding: "10px 8px", borderRadius: 12, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 850, color: "rgba(255,255,255,0.50)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Match score</div>
              <div style={{ fontSize: 18, fontWeight: 980, color: "rgba(0,255,208,0.90)", marginTop: 2 }}>97%</div>
            </div>
          </div>
        </div>
      </motion.div>

      {isTyping ? <TypingBubble label="Finding best promos" tone="rgba(255,170,80,0.9)" reduced={reduced} /> : null}

      {/* Additional nearby deals */}
      {step >= 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div style={{ fontSize: 12, fontWeight: 950, color: "rgba(255,255,255,0.65)", letterSpacing: 0.3, marginBottom: 8, textTransform: "uppercase" as const }}>More deals near you</div>
          <div style={{ display: "grid", gap: 8 }}>
            <PromoRow icon={<Percent size={14} />} title="Screen Protector" saving="20% off" reason="Pairs with your phone case" />
            <PromoRow icon={<TrendingUp size={14} />} title="Loyalty 2x Points" saving="+86 pts" reason="Active on all electronics today" />
          </div>
        </motion.div>
      ) : null}

      {/* Cart impact */}
      {step >= 2 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}
        >
          <div style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(255,170,80,0.20)", background: "rgba(255,170,80,0.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,170,80,0.85)" }}>Total savings this trip</div>
            <div style={{ fontSize: 22, fontWeight: 980, color: "rgba(255,255,255,0.95)", marginTop: 4 }}>$18.50</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>3 promos applied</div>
          </div>
          <div style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(0,255,208,0.18)", background: "rgba(0,255,208,0.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(0,255,208,0.85)" }}>All offers accepted</div>
            <div style={{ fontSize: 22, fontWeight: 980, color: "rgba(255,255,255,0.95)", marginTop: 4 }}>3 / 3</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Smart auto-apply</div>
          </div>
        </motion.div>
      ) : null}

      {step >= 3 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 14, border: "1px solid rgba(0,255,208,0.22)", background: "rgba(0,255,208,0.06)" }}
        >
          <Check size={16} color="rgba(0,255,208,0.9)" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.90)" }}>All promos applied automatically</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.50)" }}>Savings reflected at checkout</div>
          </div>
        </motion.div>
      ) : null}

      <div style={{ marginTop: "auto" }}>
        <div style={{ width: "100%", maxWidth: 240, marginLeft: "auto" }}>
          <ActionButton icon={<ArrowRight size={14} />} label="Go to checkout" highlight onClick={onNext} disabled={step < 3} />
        </div>
      </div>
    </div>
  )
}

function PromoRow({ icon, title, saving, reason }: { icon: React.ReactNode; title: string; saving: string; reason: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.18)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,170,80,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,170,80,0.85)", flexShrink: 0 }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.88)" }}>{title}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)" }}>{reason}</div>
        </div>
      </div>
      <div style={{ padding: "5px 10px", borderRadius: 10, background: "rgba(255,170,80,0.12)", border: "1px solid rgba(255,170,80,0.22)", fontSize: 12, fontWeight: 950, color: "rgba(255,170,80,0.95)", whiteSpace: "nowrap" as const }}>
        {saving}
      </div>
    </div>
  )
}

/* ─── CHECKOUT SCREEN ─── */
function CheckoutScreen({ step, reduced }: { step: number; reduced: boolean }) {
  const isTyping = step < 3
  const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, ease: EASE } }
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Header badges */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "inline-flex", gap: 6, alignItems: "center", padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(160,120,255,0.35)", background: "rgba(160,120,255,0.12)", fontSize: 12, fontWeight: 900, color: "rgba(160,120,255,0.95)" }}>
            <ScanLine size={12} />
            <span>Self-Checkout</span>
          </div>
          <div style={{ display: "inline-flex", gap: 6, alignItems: "center", padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(0,255,208,0.22)", background: "rgba(0,255,208,0.06)", fontSize: 12, fontWeight: 900, color: "rgba(0,255,208,0.90)" }}>
            <Shield size={12} />
            <span>Secure</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <InlinePill icon={<Sparkles size={12} />} text="Promo -$18.50" />
          <InlinePill icon={<Check size={12} />} text="4 items scanned" />
        </div>
      </div>

      {/* Zero-lane explainer */}
      <div style={{ padding: "10px 14px", borderRadius: 14, border: "1px solid rgba(160,120,255,0.18)", background: "linear-gradient(135deg, rgba(160,120,255,0.08), rgba(0,0,0,0.15))", display: "flex", alignItems: "center", gap: 10 }}>
        <Zap size={16} color="rgba(160,120,255,0.90)" />
        <div>
          <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.88)" }}>No checkout lanes needed</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.46)" }}>Pay right on the cart screen. Tap and walk out</div>
        </div>
      </div>

      {/* Receipt */}
      <div style={{ display: "grid", gap: 8, padding: "12px 14px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.18)" }}>
        {step >= 0 ? <motion.div {...fade}><ReceiptLine label="Wireless Earbuds" note="SoundCore Pro" value="$39.99" /></motion.div> : null}
        {step >= 1 ? <motion.div {...fade}><ReceiptLine label="Carrying Case" note="Bundle deal" value="$11.99" /></motion.div> : null}
        {step >= 2 ? <motion.div {...fade}><ReceiptLine label="Screen Protector" note="1x $8.99" value="$8.99" /></motion.div> : null}
        {step >= 2 ? <motion.div {...fade}><ReceiptLine label="Phone Case" note="1x $14.99" value="$14.99" /></motion.div> : null}
        {step >= 2 ? <div style={{ height: 1, background: "rgba(255,255,255,0.10)", margin: "4px 0" }} /> : null}
        {step >= 2 ? <motion.div {...fade}><ReceiptLine label="Promos applied" note="3 deals auto-applied" value="- $18.50" dim /></motion.div> : null}
        {step >= 2 ? <motion.div {...fade}><ReceiptLine label="Total" note="Tax included" value="$57.46" strong /></motion.div> : null}
      </div>

      {/* Payment success */}
      {step >= 4 ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: 20, background: "linear-gradient(135deg, rgba(0,255,208,0.10), rgba(88,130,255,0.08))", borderRadius: 20, border: "1px solid rgba(0,255,208,0.22)" }}>
          <div style={{ width: 44, height: 44, background: "rgba(0,255,208,0.9)", borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", boxShadow: "0 0 30px rgba(0,255,208,0.3)" }}>
            <Check size={22} className="text-black" />
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: "white" }}>Payment Successful</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>You earned <span style={{ color: "#00FFD0", fontWeight: 700 }}>86 Vexa Points</span> · Walk out anytime</div>
        </motion.div>
      ) : null}

      {isTyping ? <motion.div {...fade}><TypingBubble label="Preparing self-checkout" tone="rgba(160,120,255,0.9)" reduced={reduced} /></motion.div> : null}

      <motion.div {...fade} style={{ marginTop: "auto", display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        <ActionButton icon={<CreditCard size={14} />} label="Tap to pay" highlight disabled={step < 3} />
        <ActionButton icon={<ShoppingBag size={14} />} label="Add bagging" disabled={step < 3} />
        <ActionButton icon={<ArrowRight size={14} />} label="Walk out" disabled={step < 3} />
      </motion.div>
    </div>
  )
}

/* ─── SHARED COMPONENTS ─── */

function Bubble({
  children,
  tone,
  border,
  align = "left",
}: {
  children: React.ReactNode
  tone: string
  border: string
  align?: "left" | "right"
}) {
  return (
    <div
      style={{
        maxWidth: "100%",
        width: "fit-content",
        padding: "11px 14px",
        borderRadius: align === "right" ? "16px 16px 6px 16px" : "16px 16px 16px 6px",
        background: tone,
        border: `1px solid ${border}`,
        color: "rgba(255,255,255,0.85)",
        fontSize: 13,
        fontWeight: 850,
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  )
}

function TypingBubble({ label, tone = "rgba(255,255,255,0.75)", reduced = false }: { label: string; tone?: string; reduced?: boolean }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(0,0,0,0.20)",
        color: tone,
        fontSize: 12,
        fontWeight: 900,
      }}
    >
      <span style={{ display: "inline-flex", gap: 4 }}>
        {reduced ? (
          <>{[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: 999, background: tone, opacity: 0.7 }} />)}</>
        ) : (
          <>
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} style={{ width: 6, height: 6, borderRadius: 999, background: tone }} />
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: 999, background: tone }} />
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} style={{ width: 6, height: 6, borderRadius: 999, background: tone }} />
          </>
        )}
      </span>
      <span>{label}</span>
    </div>
  )
}

function RouteStep({ label, detail, active, accent }: { label: string; detail: string; active?: boolean; accent?: boolean }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 14,
        border: active ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(255,255,255,0.10)",
        background: active ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.20)",
        display: "grid",
        gap: 4,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: accent ? "rgba(0,255,208,0.95)" : "rgba(255,255,255,0.65)" }} />
        <span style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>{label}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.92)" }}>{detail}</div>
    </div>
  )
}

function ActionButton({
  icon,
  label,
  highlight,
  onClick,
  disabled,
}: {
  icon: React.ReactNode
  label: string
  highlight?: boolean
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 20px",
        borderRadius: 999,
        border: highlight ? "none" : "1px solid rgba(255,255,255,0.14)",
        background: highlight ? "linear-gradient(to right, #00FFD0, #5882FF)" : "rgba(0,0,0,0.22)",
        color: highlight ? "#000" : (disabled ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.90)"),
        fontSize: 13,
        fontWeight: 800,
        cursor: disabled ? "not-allowed" : "pointer",
        width: "100%",
        opacity: disabled ? 0.7 : 1,
        boxShadow: highlight ? "0 4px 14px rgba(0,255,208,0.3)" : "none",
      }}
    >
      <span>{label}</span>
      {icon ? <span style={{ display: "inline-flex", opacity: highlight ? 0.8 : 0.9 }}>{icon}</span> : null}
    </button>
  )
}

function ReceiptLine({ label, note, value, dim, strong }: { label: string; note: string; value: string; dim?: boolean; strong?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "center" }}>
      <div>
        <div style={{ fontWeight: strong ? 980 : 900, color: "rgba(255,255,255,0.92)" }}>{label}</div>
        <div style={{ fontSize: 12, fontWeight: 850, color: dim ? "rgba(255,255,255,0.52)" : "rgba(255,255,255,0.64)" }}>{note}</div>
      </div>
      <div style={{ fontWeight: strong ? 980 : 900, color: dim ? "rgba(0,255,208,0.85)" : "rgba(255,255,255,0.92)" }}>{value}</div>
    </div>
  )
}

function MiniChip({ text, tone }: { text: string; tone: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.16)",
        background: "rgba(0,0,0,0.18)",
        fontSize: 12,
        fontWeight: 900,
        color: "rgba(255,255,255,0.82)",
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: 999, background: tone, boxShadow: `0 0 10px ${tone}` }} />
      <span>{text}</span>
    </span>
  )
}

function InlinePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.16)",
        background: "rgba(0,0,0,0.22)",
        fontSize: 11,
        fontWeight: 850,
        color: "rgba(255,255,255,0.80)",
      }}
    >
      <span style={{ display: "inline-flex", opacity: 0.8 }}>{icon}</span>
      <span>{text}</span>
    </div>
  )
}
