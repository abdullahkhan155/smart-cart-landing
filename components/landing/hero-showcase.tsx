"use client"

import React, { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, MapPin, Mic, ScanLine, Sparkles } from "lucide-react"
import { Card, Pill, usePrefersReducedMotion } from "./ui"

type HeroStage = "assist" | "promo" | "checkout"

const IMG_AISLE = "https://images.pexels.com/photos/4124939/pexels-photo-4124939.jpeg?cs=srgb&dl=pexels-lifeofnacchi-4124939.jpg&fm=jpg"
const IMG_SELF = "https://images.pexels.com/photos/28846963/pexels-photo-28846963.jpeg?cs=srgb&dl=pexels-planka-28846963.jpg&fm=jpg"

export function HeroShowcase() {
  const reduced = usePrefersReducedMotion()
  const [stage, setStage] = useState<HeroStage>("assist")

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setStage((s) => (s === "assist" ? "promo" : s === "promo" ? "checkout" : "assist"))
    }, 5200)
    return () => window.clearInterval(id)
  }, [reduced])

  const status = useMemo(() => {
    if (stage === "assist") return { title: "Assistant answers", note: "Aisle help in seconds" }
    if (stage === "promo") return { title: "Promo moment", note: "Only when it helps" }
    return { title: "Checkout on cart", note: "Scan, total, pay" }
  }, [stage])

  return (
    <Card style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{status.title}</div>
          <div style={{ marginTop: 4, fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.62)" }}>{status.note}</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Pill icon={<Mic size={14} />} text="Assistant" />
          <Pill icon={<Sparkles size={14} />} text="Promos" />
          <Pill icon={<CreditCard size={14} />} text="Checkout" />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div
          style={{
            position: "relative",
            height: 520,
            borderRadius: 22,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.22)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${IMG_AISLE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(14px) saturate(1.1)",
              transform: "scale(1.05)",
              opacity: 0.45,
            }}
          />

          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.65))" }} />

          <div style={{ position: "absolute", left: 14, right: 14, top: 14, borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <div style={{ fontWeight: 950, color: "rgba(255,255,255,0.92)" }}>Cart assistant</div>
              <span style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.62)" }}>Aisle 6</span>
            </div>

            <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Bubble kind="user" text="Where is pasta sauce?" />
              </div>

              <motion.div
                animate={stage === "assist" ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 6 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex" }}
              >
                <Bubble kind="ai" text="Aisle 6, top shelf. Want low sodium?" />
              </motion.div>

              <motion.div
                animate={stage === "promo" ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 6 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex" }}
              >
                <Bubble kind="promo" text="Near you: 15% off olive oil in Aisle 7." />
              </motion.div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Chip icon={<MapPin size={14} />} text="Show route" />
                <Chip icon={<Sparkles size={14} />} text="Swap option" />
                <Chip icon={<ScanLine size={14} />} text="Scan next" />
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", left: 14, right: 14, bottom: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", padding: 12 }}>
              <div style={{ fontWeight: 950, color: "rgba(255,255,255,0.90)" }}>Personalized promos</div>
              <div style={{ marginTop: 8, display: "grid", gap: 10 }}>
                <PromoRow title="Olive oil" note="Aisle 7, 15% off" active={stage === "promo"} />
                <PromoRow title="Pasta" note="Bundle deal" active={stage === "promo"} />
              </div>
            </div>

            <div
              style={{
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                padding: 12,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${IMG_SELF})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.20,
                  filter: "blur(2px) saturate(1.1)",
                }}
              />
              <div style={{ position: "relative" }}>
                <div style={{ fontWeight: 950, color: "rgba(255,255,255,0.90)" }}>Self checkout</div>
                <div style={{ marginTop: 10, height: 88, borderRadius: 16, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.22)", overflow: "hidden", position: "relative" }}>
                  <motion.div
                    animate={stage === "checkout" && !reduced ? { y: [10, 72, 10], opacity: [0, 0.9, 0] } : { opacity: 0 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      left: 12,
                      right: 12,
                      height: 4,
                      borderRadius: 999,
                      background: "linear-gradient(90deg, rgba(0,255,208,0), rgba(0,255,208,0.85), rgba(0,255,208,0))",
                      boxShadow: "0 0 24px rgba(0,255,208,0.20)",
                      top: 0,
                    }}
                  />

                  <div style={{ position: "absolute", left: 12, top: 12, right: 12, display: "grid", gap: 8 }}>
                    <RowLine w={0.78} />
                    <RowLine w={0.62} />
                  </div>

                  <motion.div
                    animate={stage === "checkout" ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 6 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "absolute",
                      right: 12,
                      bottom: 12,
                      width: 160,
                      height: 40,
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.14)",
                      background: "rgba(160,120,255,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      color: "rgba(255,255,255,0.84)",
                      fontSize: 12,
                      fontWeight: 980,
                    }}
                  >
                    <CreditCard size={16} style={{ opacity: 0.9 }} />
                    <span>Pay now</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
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
        maxWidth: 360,
        padding: "10px 12px",
        borderRadius: 16,
        color: "rgba(255,255,255,0.78)",
        fontSize: 13,
        lineHeight: 1.55,
        fontWeight: 850,
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
        fontWeight: 950,
        color: "rgba(255,255,255,0.72)",
      }}
    >
      <span style={{ display: "inline-flex", opacity: 0.9 }}>{icon}</span>
      <span>{text}</span>
    </span>
  )
}

function PromoRow({ title, note, active }: { title: string; note: string; active: boolean }) {
  return (
    <motion.div
      animate={active ? { opacity: 1 } : { opacity: 0.7 }}
      transition={{ duration: 0.25 }}
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.18)",
        padding: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 950, color: "rgba(255,255,255,0.92)" }}>{title}</div>
        <span style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.62)" }}>Suggested</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 13, fontWeight: 850, color: "rgba(255,255,255,0.70)", lineHeight: 1.55 }}>
        {note}
      </div>
    </motion.div>
  )
}

function RowLine({ w }: { w: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
      <div style={{ height: 10, width: `${w * 100}%`, borderRadius: 999, background: "rgba(255,255,255,0.10)" }} />
      <div style={{ height: 10, width: 36, borderRadius: 999, background: "rgba(255,255,255,0.08)" }} />
    </div>
  )
}
