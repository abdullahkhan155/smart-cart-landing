"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { ArrowRight, Check, CreditCard, MapPin, Mic, Sparkles, Wand2 } from "lucide-react"
import { Card, Pill, useBreakpoint, usePrefersReducedMotion } from "./ui"

type Mode = "ask" | "promo" | "checkout"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const FLOW: Mode[] = ["ask", "promo", "checkout"]
const PROMO_SLOWDOWN = 2.45
const SCRIPT_DELAYS: Record<Mode, readonly number[]> = {
  ask: [1100, 1400, 1500, 1400, 1400],
  promo: [1300 * PROMO_SLOWDOWN, 1500 * PROMO_SLOWDOWN],
  checkout: [1100, 1400, 1500],
}

export function TryCartSection() {
  const demo = useTryCartDemo()
  const { panelRef, ...cardProps } = demo

  return (
    <section id="try" style={{ paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ width: "min(1180px, calc(100% - 32px))", margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 16, justifyItems: "center", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.86)", fontSize: 12, fontWeight: 900, letterSpacing: 0.5, textTransform: "uppercase" }}>
            <Wand2 size={14} style={{ opacity: 0.9 }} />
            <span>Live cart demo</span>
          </div>

          <div style={{ fontSize: cardProps.isMobile ? "clamp(30px, 7vw, 38px)" : "clamp(34px, 4vw, 42px)", fontWeight: 980, letterSpacing: -0.6, color: "rgba(255,255,255,0.95)", lineHeight: 1.08 }}>
            Chat, promos, and checkout on-cart, live
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", fontWeight: 750, maxWidth: 720 }}>
            Watch the assistant answer, surface aisle-aware promos, and finish checkout in one flow. Replay or jump to any state.
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <Pill icon={<Mic size={14} />} text="Voice assistant" />
            <Pill icon={<Sparkles size={14} />} text="Context promos" />
            <Pill icon={<CreditCard size={14} />} text="Tap to pay" />
            <Pill icon={<MapPin size={14} />} text="Live aisle" />
          </div>
        </div>

        <div ref={panelRef} style={{ marginTop: 20 }}>
          <TryCartCard {...cardProps} />
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
          id: "promo" as const,
          label: "Smart promo",
          accent: "rgba(255,170,80,0.28)",
          accentSolid: "rgba(255,170,80,0.95)",
          desc: "In-aisle offers with intent.",
        },
        {
          id: "checkout" as const,
          label: "On-cart pay",
          accent: "rgba(160,120,255,0.28)",
          accentSolid: "rgba(160,120,255,0.95)",
          desc: "Scan, total, and tap to exit.",
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
      mode === "promo" ? (reduced ? 3600 : 4600) : reduced ? 2600 : 3200
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
    <Card style={{ padding: isMobile ? 14 : 18, position: "relative", overflow: "hidden" }}>
      <motion.div
        aria-hidden
        animate={reduced ? { opacity: 0.35 } : { opacity: [0.25, 0.6, 0.25] }}
        transition={reduced ? { duration: 0.01 } : { duration: 6, repeat: Infinity, ease: EASE }}
        style={{
          position: "absolute",
          inset: -40,
          background: `radial-gradient(520px 260px at 14% 12%, ${active.accent}, rgba(0,0,0,0)), radial-gradient(520px 260px at 86% 6%, rgba(160,120,255,0.20), rgba(0,0,0,0))`,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

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
            <MiniChip text="In aisle" tone="rgba(255,255,255,0.75)" />
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
              minHeight: isMobile ? 520 : 600,
              maxHeight: isMobile ? 560 : 680,
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
                  minHeight: isMobile ? 520 : 600,
                  maxHeight: isMobile ? 560 : 680,
                  padding: isMobile ? 16 : 20,
                  paddingRight: isMobile ? 14 : 18,
                  paddingBottom: isMobile ? 24 : 28,
                  display: "grid",
                  gap: 18,
                  overflowY: "auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 999, background: active.accentSolid, boxShadow: `0 0 14px ${active.accent}` }} />
                    <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.2, color: "rgba(255,255,255,0.80)" }}>{active.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 850, color: "rgba(255,255,255,0.62)" }}>Simulated cart view</span>
                </div>

                {mode === "ask" ? <AskScreen onNext={goNext} step={scriptStep} /> : null}
                {mode === "promo" ? <PromoScreen onNext={goNext} step={scriptStep} /> : null}
                {mode === "checkout" ? <CheckoutScreen step={scriptStep} /> : null}
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
  return (
    <div style={{ display: "grid", gap: 6, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {flow.map((step, i) => {
          const isActive = i === activeIndex
          const isDone = i < activeIndex
          return (
            <button
              key={step}
              type="button"
              onClick={() => onSelect(i)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 12px",
                borderRadius: 999,
                border: isActive ? "1px solid rgba(0,255,208,0.50)" : "1px solid rgba(255,255,255,0.16)",
                background: isActive
                  ? "linear-gradient(120deg, rgba(0,255,208,0.18), rgba(160,120,255,0.16))"
                  : isDone
                  ? "rgba(0,0,0,0.20)"
                  : "rgba(0,0,0,0.16)",
                color: isActive ? "rgba(0,255,208,0.95)" : "rgba(255,255,255,0.82)",
                fontSize: 12.5,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.28)",
                  background: isDone ? "rgba(0,255,208,0.22)" : isActive ? "rgba(0,255,208,0.12)" : "transparent",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isDone ? <Check size={10} style={{ opacity: 0.9, color: "rgba(0,255,208,0.90)" }} /> : null}
                {isActive && !isDone ? <span style={{ width: 6, height: 6, borderRadius: 999, background: "rgba(0,255,208,0.90)" }} /> : null}
              </span>
              <span style={{ textTransform: "capitalize" }}>{step}</span>
            </button>
          )
        })}
      </div>
      <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, rgba(0,255,208,0.85), rgba(160,120,255,0.78), rgba(255,170,80,0.78))", borderRadius: 999 }} />
      </div>
    </div>
  )
}

function AskScreen({ onNext, step }: { onNext: () => void; step: number }) {
  const isTyping = step < 3
  return (
    <div style={{ display: "grid", gap: 10, height: "100%" }}>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
        <Bubble tone="rgba(255,255,255,0.10)" border="rgba(255,255,255,0.18)" align="right">
          Where is gluten-free pasta?
        </Bubble>
      </motion.div>
      {step >= 1 ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
          <Bubble tone="rgba(0,255,208,0.10)" border="rgba(0,255,208,0.28)">
            Aisle 7, mid-shelf. Want a low-sodium sauce to pair?
          </Bubble>
        </motion.div>
      ) : null}
      {step >= 2 ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
          <Bubble tone="rgba(0,0,0,0.18)" border="rgba(255,255,255,0.20)" align="right">
            Show me low-sodium options.
          </Bubble>
        </motion.div>
      ) : null}
      {step >= 3 ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
          <Bubble tone="rgba(0,255,208,0.10)" border="rgba(0,255,208,0.26)">
            I can save you $4 with an olive oil + pasta bundle nearby. Want it?
          </Bubble>
        </motion.div>
      ) : null}
      {step >= 4 ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
          <Bubble tone="rgba(0,0,0,0.18)" border="rgba(255,255,255,0.20)" align="right">
            Yes, add it and guide me.
          </Bubble>
        </motion.div>
      ) : null}
      {isTyping ? <TypingBubble label="Assistant is typing" /> : null}

      {step >= 2 ? (
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.75)", letterSpacing: 0.2 }}>Route preview</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
            <RouteStep label="Start" detail="Produce" active />
            <RouteStep label="Now" detail="Aisle 5" active accent />
            <RouteStep label="Next" detail="Aisle 7" active />
          </div>
        </div>
      ) : null}

      {step >= 4 ? (
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
          <div style={{ borderRadius: 14, border: "1px solid rgba(0,255,208,0.24)", background: "rgba(0,255,208,0.08)", padding: 10, display: "grid", gap: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(0,255,208,0.85)" }}>Bundle ready</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.88)" }}>Olive oil + pasta saved to cart</div>
          </div>
          <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(0,0,0,0.20)", padding: 10, display: "grid", gap: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>Next step</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.88)" }}>Guiding to Aisle 7 shelf 3</div>
          </div>
        </div>
      ) : null}

      <div style={{ marginTop: "auto", display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <ActionButton icon={<MapPin size={14} />} label="Show route" />
        <ActionButton icon={<Sparkles size={14} />} label="Swap option" />
        <ActionButton icon={<ArrowRight size={14} />} label="Jump to promo view" highlight onClick={onNext} disabled={step < 4} />
      </div>
    </div>
  )
}

function PromoScreen({ onNext, step }: { onNext: () => void; step: number }) {
  const isTyping = step < 1
  const slowFade = { duration: 0.9, ease: EASE }
  const slowRise = { duration: 1.05, ease: EASE }
  const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: slowFade }
  const rise = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: slowRise }
  return (
    <div style={{ display: "grid", gap: 14, height: "100%" }}>
      <motion.div {...fade} style={{ borderRadius: 18, border: "1px solid rgba(255,170,80,0.28)", background: "linear-gradient(140deg, rgba(255,170,80,0.28), rgba(0,0,0,0.24))", padding: 16, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(255,170,80,0.95)", boxShadow: "0 0 12px rgba(255,170,80,0.65)" }} />
            <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.4, color: "rgba(255,255,255,0.78)" }}>In aisle</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>
            <span>Shelf 3</span>
            <span>Nearby</span>
            {step >= 2 ? <Tag text="Applied to cart" /> : <Tag text="Ready to apply" />}
          </div>
        </div>
        <div style={{ fontSize: 24, fontWeight: 980, color: "rgba(255,255,255,0.96)" }}>Olive oil + pasta</div>
        <div style={{ fontSize: 15, fontWeight: 850, color: "rgba(255,255,255,0.82)" }}>Save $4 when bundled</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag text="Matches your basket" />
          <Tag text="Bundle save" />
          <Tag text="High intent" />
        </div>
      </motion.div>

      {isTyping ? <motion.div {...fade}><TypingBubble label="Finding best promo" tone="rgba(255,170,80,0.9)" /></motion.div> : null}

      <motion.div {...fade} style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <SavingsRow label="Olive oil" value="$11.80" badge="Bundle match" />
        <SavingsRow label="Pasta (2x)" value="$9.00" badge="In basket" />
        <SavingsRow label="Bonus item" value="$4.20" badge="Suggested" />
        <SavingsRow label="Sauce pairing" value="$4.50" badge="High intent" />
      </motion.div>

      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <motion.div key={`before-${step >= 1}`} {...fade}>
          <StatBlock
            label="Before savings"
            value="$25.00"
            tone="rgba(255,255,255,0.90)"
            subtle={step < 1}
            desc="Cart total before promo"
          />
        </motion.div>
        <motion.div key={`bundle-${step >= 2}`} {...fade}>
          <StatBlock
            label="Bundle savings"
            value={step >= 2 ? "- $4.00" : "…"}
            tone="rgba(0,255,208,0.95)"
            subtle={step < 2}
            desc="Applied to basket"
          />
        </motion.div>
        <motion.div key={`newtotal-${step >= 2}`} {...fade}>
          <StatBlock
            label="New total"
            value={step >= 2 ? "$21.00" : "…"}
            tone="rgba(255,255,255,0.98)"
            subtle={step < 2}
            desc="Updated at checkout"
          />
        </motion.div>
      </div>

      <motion.div {...rise} style={{ marginTop: "auto", display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <ActionButton icon={<Sparkles size={14} />} label={step >= 2 ? "Promo applied" : "Apply promo"} highlight disabled={step < 1} />
        <ActionButton icon={<MapPin size={14} />} label="Show shelf" />
        <ActionButton icon={<ArrowRight size={14} />} label="Go to checkout" highlight onClick={onNext} disabled={step < 2} />
      </motion.div>
    </div>
  )
}

function CheckoutScreen({ step }: { step: number }) {
  const isTyping = step < 3
  const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, ease: EASE } }
  return (
    <div style={{ display: "grid", gap: 10, height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "inline-flex", gap: 8, alignItems: "center", padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(0,0,0,0.22)", fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.82)" }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: "rgba(0,255,208,0.9)" }} />
          <span>Secure checkout</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <InlinePill icon={<Sparkles size={12} />} text="Promo applied -$4" />
          <InlinePill icon={<Check size={12} />} text="3 items scanned" />
        </div>
      </div>

      <div style={{ display: "grid", gap: 8, padding: "10px 12px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.18)" }}>
        {step >= 0 ? <motion.div {...fade}><ReceiptLine label="Gluten-free pasta" note="2 x $4.50" value="$9.00" /></motion.div> : null}
        {step >= 1 ? <motion.div {...fade}><ReceiptLine label="Olive oil" note="1 x $11.80" value="$11.80" /></motion.div> : null}
        {step >= 2 ? <motion.div {...fade}><ReceiptLine label="Tomato sauce" note="1 x $4.20" value="$4.20" /></motion.div> : null}
        {step >= 2 ? <div style={{ height: 1, background: "rgba(255,255,255,0.10)", margin: "4px 0" }} /> : null}
        {step >= 2 ? <motion.div {...fade}><ReceiptLine label="Promo applied" note="Bundle save" value="- $4.00" dim /></motion.div> : null}
        {step >= 2 ? <motion.div {...fade}><ReceiptLine label="Total" note="Tax included" value="$21.00" strong /></motion.div> : null}
      </div>

      {isTyping ? <motion.div {...fade}><TypingBubble label="Preparing checkout" tone="rgba(0,255,208,0.9)" /></motion.div> : null}

      <motion.div {...fade} style={{ marginTop: "auto", display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <ActionButton icon={<CreditCard size={14} />} label="Tap to pay" highlight disabled={step < 3} />
        <ActionButton icon={<Sparkles size={14} />} label="Add bagging" disabled={step < 3} />
        <ActionButton icon={<ArrowRight size={14} />} label="Exit flow" disabled={step < 3} />
      </motion.div>
    </div>
  )
}

function Tag({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(0,0,0,0.24)",
        fontSize: 12,
        fontWeight: 900,
        color: "rgba(255,255,255,0.85)",
      }}
    >
      {text}
    </span>
  )
}

function StatBlock({
  label,
  value,
  tone,
  subtle,
  desc,
}: {
  label: string
  value: string
  tone: string
  subtle?: boolean
  desc: string
}) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.12)",
        background: subtle ? "rgba(0,0,0,0.14)" : "rgba(0,0,0,0.20)",
        display: "grid",
        gap: 6,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 980, color: subtle ? "rgba(255,255,255,0.60)" : tone }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.60)" }}>{desc}</div>
    </div>
  )
}

function SavingsRow({ label, value, badge }: { label: string; value: string; badge: string }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.20)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.88)" }}>{label}</span>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(0,0,0,0.26)",
            fontSize: 11,
            fontWeight: 850,
            color: "rgba(255,255,255,0.76)",
          }}
        >
          {badge}
        </span>
      </div>
      <span style={{ fontSize: 14, fontWeight: 950, color: "rgba(255,255,255,0.94)" }}>{value}</span>
    </div>
  )
}

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
        maxWidth: 420,
        padding: "11px 12px",
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

function TypingBubble({ label, tone = "rgba(255,255,255,0.75)" }: { label: string; tone?: string }) {
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
        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} style={{ width: 6, height: 6, borderRadius: 999, background: tone }} />
        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: 999, background: tone }} />
        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} style={{ width: 6, height: 6, borderRadius: 999, background: tone }} />
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
        padding: "10px 12px",
        borderRadius: 14,
        border: highlight ? "1px solid rgba(0,255,208,0.35)" : "1px solid rgba(255,255,255,0.14)",
        background: highlight ? "rgba(0,255,208,0.12)" : "rgba(0,0,0,0.22)",
        color: disabled ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.90)",
        fontSize: 12,
        fontWeight: 900,
        cursor: disabled ? "not-allowed" : "pointer",
        width: "100%",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <span style={{ display: "inline-flex", opacity: 0.9 }}>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div style={{ padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.22)", display: "grid", gap: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 980, color: tone }}>{value}</div>
    </div>
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
        color: tone,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: tone, boxShadow: `0 0 12px ${tone}` }} />
      <span>{text}</span>
    </span>
  )
}

function InlinePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(0,0,0,0.18)",
        color: "rgba(255,255,255,0.82)",
        fontSize: 11.5,
        fontWeight: 900,
      }}
    >
      <span style={{ display: "inline-flex", opacity: 0.9 }}>{icon}</span>
      <span>{text}</span>
    </span>
  )
}
