"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, MapPin, Mic, Sparkles } from "lucide-react"
import { Card, useBreakpoint, usePrefersReducedMotion } from "./ui"

type HeroStage = "assist" | "promo" | "checkout"

const IMG_AISLE =
  "https://images.pexels.com/photos/4124939/pexels-photo-4124939.jpeg?cs=srgb&dl=pexels-lifeofnacchi-4124939.jpg&fm=jpg"

export function HeroShowcase() {
  const reduced = usePrefersReducedMotion()
  const isNarrow = useBreakpoint(720)
  const [stage, setStage] = useState<HeroStage>("assist")

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setStage((s) => (s === "assist" ? "promo" : s === "promo" ? "checkout" : "assist"))
    }, 5200)
    return () => window.clearInterval(id)
  }, [reduced])

  const stageTone =
    stage === "assist" ? "rgba(0,255,208,0.85)" : stage === "promo" ? "rgba(255,170,80,0.85)" : "rgba(160,120,255,0.85)"
  const stageToneSoft =
    stage === "assist" ? "rgba(0,255,208,0.18)" : stage === "promo" ? "rgba(255,170,80,0.18)" : "rgba(160,120,255,0.18)"

  const stageContent =
    stage === "assist" ? (
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 900, color: "rgba(255,255,255,0.92)" }}>AI assistant</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Bubble kind="user" text="Where is pasta sauce?" />
        </div>
        <Bubble kind="ai" text="Aisle 6, top shelf. Want low sodium?" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Chip icon={<MapPin size={14} />} text="Show route" />
          <Chip icon={<Mic size={14} />} text="Ask again" />
        </div>
      </div>
    ) : stage === "promo" ? (
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 900, color: "rgba(255,255,255,0.92)" }}>Personalized promos</div>
        <div
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.16)",
            background: "linear-gradient(135deg, rgba(255,170,80,0.18), rgba(0,0,0,0.35))",
            padding: 14,
            display: "grid",
            gap: 6,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: 0.8 }}>
            Snack and save
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "rgba(255,255,255,0.94)" }}>2 for $6</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Crackers + olive oil</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Chip icon={<Sparkles size={14} />} text="Matches basket" />
          <Chip icon={<MapPin size={14} />} text="Aisle 7" />
        </div>
      </div>
    ) : (
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 900, color: "rgba(255,255,255,0.92)" }}>Self checkout</div>
        <div style={{ height: 110, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.28)", position: "relative", overflow: "hidden" }}>
          <motion.div
            animate={stage === "checkout" && !reduced ? { y: [6, 86, 6], opacity: [0, 0.9, 0] } : { opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: 12,
              right: 12,
              height: 4,
              borderRadius: 999,
              background: "linear-gradient(90deg, rgba(0,255,208,0), rgba(0,255,208,0.85), rgba(0,255,208,0))",
              boxShadow: "0 0 24px rgba(0,255,208,0.2)",
              top: 0,
            }}
          />
          <div style={{ position: "absolute", left: 12, top: 12, right: 12, display: "grid", gap: 8 }}>
            <RowLine w={0.78} />
            <RowLine w={0.62} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.6)" }}>Total</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "rgba(255,255,255,0.95)" }}>$46.28</div>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(160,120,255,0.18)",
              color: "rgba(255,255,255,0.9)",
              fontSize: 12,
              fontWeight: 900,
            }}
          >
            <CreditCard size={16} style={{ opacity: 0.9 }} />
            <span>Pay now</span>
          </div>
        </div>
      </div>
    )

  return (
    <Card style={{ padding: isNarrow ? 14 : 16 }}>
      <div
        style={{
          position: "relative",
          minHeight: isNarrow ? 440 : 520,
          borderRadius: 22,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${IMG_AISLE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(14px) saturate(1.05)",
            transform: "scale(1.05)",
            opacity: 0.45,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.68))" }} />

        <motion.div
          aria-hidden
          animate={reduced ? { opacity: 0.2 } : { opacity: [0.12, 0.35, 0.12] }}
          transition={reduced ? { duration: 0.01 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: -60,
            background: `radial-gradient(420px 220px at 12% 6%, ${stageToneSoft}, rgba(0,0,0,0))`,
          }}
        />

        <div style={{ position: "relative", height: "100%", display: "grid", gridTemplateRows: "auto 1fr", gap: 16, padding: isNarrow ? 14 : 18 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <StageTab label="Assistant" icon={<Mic size={14} />} active={stage === "assist"} tone={stageTone} onClick={() => setStage("assist")} />
            <StageTab label="Promos" icon={<Sparkles size={14} />} active={stage === "promo"} tone={stageTone} onClick={() => setStage("promo")} />
            <StageTab label="Self checkout" icon={<CreditCard size={14} />} active={stage === "checkout"} tone={stageTone} onClick={() => setStage("checkout")} />
          </div>

          <div
            style={{
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(0,0,0,0.35)",
              padding: 16,
              minHeight: 320,
              display: "grid",
              alignContent: "center",
              boxShadow: `0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px ${stageToneSoft}`,
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
          >
            <motion.div
              key={stage}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: 460, width: "100%", margin: "0 auto" }}
            >
              {stageContent}
            </motion.div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function StageTab({
  label,
  icon,
  active,
  tone,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  active: boolean
  tone: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 999,
        border: active ? `1px solid ${tone}` : "1px solid rgba(255,255,255,0.12)",
        background: active ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.2)",
        color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
        fontSize: 12,
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      <span style={{ display: "inline-flex", opacity: 0.9 }}>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function Bubble({ text, kind }: { text: string; kind: "user" | "ai" | "promo" }) {
  const style: React.CSSProperties =
    kind === "user"
      ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }
      : kind === "promo"
        ? { background: "rgba(255,170,80,0.12)", border: "1px solid rgba(255,170,80,0.22)" }
        : { background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.16)" }

  return (
    <div
      style={{
        maxWidth: 340,
        padding: "10px 12px",
        borderRadius: 16,
        color: "rgba(255,255,255,0.78)",
        fontSize: 13,
        lineHeight: 1.55,
        fontWeight: 800,
        ...style,
      }}
    >
      {text}
    </div>
  )
}

function Chip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.04)",
        fontSize: 12,
        fontWeight: 800,
        color: "rgba(255,255,255,0.72)",
      }}
    >
      <span style={{ display: "inline-flex", opacity: 0.9 }}>{icon}</span>
      <span>{text}</span>
    </span>
  )
}

function RowLine({ w }: { w: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
      <div style={{ height: 10, width: `${w * 100}%`, borderRadius: 999, background: "rgba(255,255,255,0.1)" }} />
      <div style={{ height: 10, width: 36, borderRadius: 999, background: "rgba(255,255,255,0.08)" }} />
    </div>
  )
}
