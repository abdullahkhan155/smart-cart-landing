"use client"

import React, { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, CreditCard, MapPin, Mic, ScanLine, ShieldCheck, Sparkles } from "lucide-react"
import { Card, Pill, SectionTitle, usePrefersReducedMotion } from "./ui"

type Scene = "assist" | "promo" | "scan" | "pay" | "verify" | "insights"

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

export function HowItWorksSection() {
  const reduced = usePrefersReducedMotion()
  const narrow = useIsNarrow(980)
  const [active, setActive] = useState(0)

  const steps = useMemo(
    () =>
      [
        { k: "Step 01", title: "Ask the cart", body: "The assistant answers with one clear next action.", scene: "assist" as const },
        { k: "Step 02", title: "Show a nearby promo", body: "Aisle based promos appear when they help.", scene: "promo" as const },
        { k: "Step 03", title: "Scan as you shop", body: "Fast confirmation and a clear total.", scene: "scan" as const },
        { k: "Step 04", title: "Pay on cart", body: "Tap, pay, and exit without a lane.", scene: "pay" as const },
        { k: "Step 05", title: "Verify when needed", body: "Calm checks only for exceptions.", scene: "verify" as const },
        { k: "Step 06", title: "Measure and improve", body: "Dashboards for throughput and exceptions.", scene: "insights" as const },
      ] as const,
    []
  )

  return (
    <section id="how" style={{ paddingTop: 90, paddingBottom: 90 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle
          eyebrow="How it works"
          title="Get Assistance. Find Deals. Checkout Faster."
          subtitle="Everything starts with help in aisle. Checkout becomes the finish."
        />

        <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: narrow ? "1fr" : "420px minmax(0, 1fr)", gap: 18, alignItems: "start" }}>
          <div style={narrow ? {} : { position: "sticky", top: 96 }}>
            <Card style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Live scene</div>
                  <div style={{ marginTop: 4, fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.62)" }}>
                    Click a step to preview it
                  </div>
                </div>
                <Pill icon={<Sparkles size={14} />} text={steps[active].k} />
              </div>

              <div style={{ marginTop: 12 }}>
                <SceneVisual scene={steps[active].scene} reduced={reduced} />
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Pill icon={<Mic size={14} />} text="Assistant" />
                <Pill icon={<Sparkles size={14} />} text="Promos" />
                <Pill icon={<CreditCard size={14} />} text="Checkout" />
              </div>
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
                  active={i === active}
                  onClick={() => setActive(i)}
                  onEnter={() => setActive(i)}
                />
              ))}
            </div>
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
  active,
  onClick,
  onEnter,
}: {
  step: string
  title: string
  body: string
  active: boolean
  onClick: () => void
  onEnter: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      onViewportEnter={onEnter}
      viewport={{ amount: 0.6, margin: "-20% 0px -35% 0px" }}
      animate={{ opacity: active ? 1 : 0.58, y: active ? 0 : 10 }}
      transition={{ duration: 0.28 }}
      style={{
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        padding: 18,
        borderRadius: 22,
        border: active ? "1px solid rgba(255,255,255,0.24)" : "1px solid rgba(255,255,255,0.10)",
        background: active ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        color: "white",
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.16)", color: "rgba(255,255,255,0.78)", fontSize: 12, fontWeight: 950 }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: "rgba(255,255,255,0.75)" }} />
        <span>{step}</span>
      </div>

      <div style={{ marginTop: 10, fontSize: 18, fontWeight: 980, color: "rgba(255,255,255,0.93)" }}>{title}</div>
      <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.72)", fontWeight: 850 }}>{body}</div>
    </motion.button>
  )
}

function SceneShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", height: 250, borderRadius: 18, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.10)",
          background:
            "radial-gradient(560px 260px at 14% 10%, rgba(0,255,208,0.12), rgba(0,0,0,0)), radial-gradient(560px 260px at 84% 8%, rgba(160,120,255,0.12), rgba(0,0,0,0)), radial-gradient(560px 260px at 50% 110%, rgba(255,170,80,0.10), rgba(0,0,0,0)), rgba(0,0,0,0.18)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.28))" }} />
      <div style={{ position: "relative", height: "100%" }}>{children}</div>
    </div>
  )
}

function SceneVisual({ scene, reduced }: { scene: Scene; reduced: boolean }) {
  if (scene === "assist") return <AssistScene reduced={reduced} />
  if (scene === "promo") return <PromoScene reduced={reduced} />
  if (scene === "scan") return <ScanScene reduced={reduced} />
  if (scene === "pay") return <PayScene reduced={reduced} />
  if (scene === "verify") return <VerifyScene reduced={reduced} />
  return <InsightsScene reduced={reduced} />
}

function AssistScene({ reduced }: { reduced: boolean }) {
  return (
    <SceneShell>
      <div style={{ position: "absolute", left: 16, top: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Pill icon={<Mic size={14} />} text="Ask" />
        <Pill icon={<MapPin size={14} />} text="Aisle 6" />
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, top: 62, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Bubble text="Where is pasta sauce?" kind="user" />
        </div>
        <motion.div
          animate={reduced ? { opacity: 1 } : { opacity: [0.65, 1, 0.65] }}
          transition={reduced ? { duration: 1 } : { duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "flex" }}
        >
          <Bubble text="Aisle 6, top shelf. Want low sodium?" kind="ai" />
        </motion.div>
      </div>

      <div style={{ position: "absolute", left: 16, bottom: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Chip text="Show route" />
        <Chip text="Swap option" />
      </div>
    </SceneShell>
  )
}

function PromoScene({ reduced }: { reduced: boolean }) {
  return (
    <SceneShell>
      <div style={{ position: "absolute", left: 16, top: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Pill icon={<Sparkles size={14} />} text="Promo" />
        <Pill icon={<MapPin size={14} />} text="Aisle 7" />
      </div>

      <motion.div
        animate={reduced ? { opacity: 1 } : { opacity: [0.6, 1, 0.6] }}
        transition={reduced ? { duration: 1 } : { duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          top: 68,
          borderRadius: 18,
          border: "1px solid rgba(255,170,80,0.26)",
          background: "rgba(255,170,80,0.10)",
          padding: 14,
        }}
      >
        <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Near you</div>
        <div style={{ marginTop: 8, fontSize: 14, fontWeight: 850, color: "rgba(255,255,255,0.74)", lineHeight: 1.6 }}>
          Olive oil 15% off in Aisle 7
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip text="Apply deal" />
          <Chip text="Route me" />
        </div>
      </motion.div>
    </SceneShell>
  )
}

function ScanScene({ reduced }: { reduced: boolean }) {
  return (
    <SceneShell>
      <motion.div
        animate={reduced ? { opacity: 0.7 } : { y: [22, 200, 22], opacity: [0, 0.9, 0] }}
        transition={reduced ? { duration: 1 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          height: 4,
          borderRadius: 999,
          background: "linear-gradient(90deg, rgba(0,255,208,0), rgba(0,255,208,0.85), rgba(0,255,208,0))",
          boxShadow: "0 0 26px rgba(0,255,208,0.20)",
          top: 0,
        }}
      />

      <div style={{ position: "absolute", left: 16, right: 16, top: 54, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", padding: 12 }}>
            <div style={{ height: 10, width: 100 + i * 6, borderRadius: 999, background: "rgba(255,255,255,0.10)" }} />
            <div style={{ marginTop: 10, height: 10, width: 120, borderRadius: 999, background: "rgba(255,255,255,0.08)" }} />
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: 16, bottom: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Pill icon={<ScanLine size={14} />} text="Scan" />
        <Pill icon={<Sparkles size={14} />} text="Clear total" />
      </div>
    </SceneShell>
  )
}

function PayScene({ reduced }: { reduced: boolean }) {
  return (
    <SceneShell>
      <div style={{ position: "absolute", left: 16, top: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Pill icon={<CreditCard size={14} />} text="Pay" />
        <Pill icon={<Sparkles size={14} />} text="No line" />
      </div>

      <motion.div
        animate={reduced ? { y: 0 } : { y: [16, 0, 16] }}
        transition={reduced ? { duration: 1 } : { duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: 18,
          top: 70,
          width: 240,
          height: 130,
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.04)",
          padding: 12,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.85)", fontWeight: 980, fontSize: 13 }}>
          <span>Total</span>
          <span>48.72</span>
        </div>
        <div style={{ marginTop: 10, height: 12, borderRadius: 999, background: "rgba(255,255,255,0.10)" }} />
        <div style={{ marginTop: 10, height: 44, borderRadius: 14, background: "rgba(160,120,255,0.14)", border: "1px solid rgba(160,120,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "rgba(255,255,255,0.82)", fontSize: 12, fontWeight: 980 }}>
          <CreditCard size={16} style={{ opacity: 0.9 }} />
          <span>Pay now</span>
        </div>
      </motion.div>
    </SceneShell>
  )
}

function VerifyScene({ reduced }: { reduced: boolean }) {
  return (
    <SceneShell>
      <div style={{ position: "absolute", left: 16, top: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Pill icon={<ShieldCheck size={14} />} text="Check" />
        <Pill icon={<Sparkles size={14} />} text="Calm" />
      </div>

      <div style={{ position: "absolute", left: 18, top: 78, display: "grid", gap: 10 }}>
        <div style={{ width: 280, height: 14, borderRadius: 999, background: "rgba(255,255,255,0.10)" }} />
        <div style={{ width: 240, height: 12, borderRadius: 999, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ width: 210, height: 12, borderRadius: 999, background: "rgba(255,255,255,0.08)" }} />
      </div>

      <motion.div
        animate={reduced ? { opacity: 0.6 } : { opacity: [0.25, 0.65, 0.25] }}
        transition={reduced ? { duration: 1 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: 22,
          top: 76,
          width: 100,
          height: 100,
          borderRadius: 999,
          border: "1px solid rgba(255,170,80,0.34)",
          boxShadow: "0 0 28px rgba(255,170,80,0.14)",
        }}
      />
    </SceneShell>
  )
}

function InsightsScene({ reduced }: { reduced: boolean }) {
  const bars = [0.55, 0.85, 0.62, 0.72, 0.46, 0.68]
  return (
    <SceneShell>
      <div style={{ position: "absolute", left: 16, top: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Pill icon={<BarChart3 size={14} />} text="Throughput" />
        <Pill icon={<ShieldCheck size={14} />} text="Exceptions" />
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, height: 150, borderRadius: 18, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", padding: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: "100%" }}>
          {bars.map((b, i) => (
            <motion.div
              key={i}
              animate={reduced ? { height: `${b * 100}%` } : { height: [`${b * 60}%`, `${b * 100}%`, `${b * 60}%`] }}
              transition={reduced ? { duration: 1 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
              style={{
                width: "100%",
                borderRadius: 14,
                background: "linear-gradient(180deg, rgba(0,255,208,0.16), rgba(255,255,255,0.06))",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            />
          ))}
        </div>
      </div>
    </SceneShell>
  )
}

function Bubble({ text, kind }: { text: string; kind: "user" | "ai" }) {
  const style: React.CSSProperties =
    kind === "user"
      ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }
      : { background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.16)" }

  return (
    <div style={{ maxWidth: 380, padding: "10px 12px", borderRadius: 16, color: "rgba(255,255,255,0.78)", fontSize: 13, lineHeight: 1.55, fontWeight: 850, ...style }}>
      {text}
    </div>
  )
}

function Chip({ text }: { text: string }) {
  return (
    <span style={{ padding: "7px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", fontSize: 12, fontWeight: 950, color: "rgba(255,255,255,0.70)" }}>
      {text}
    </span>
  )
}
