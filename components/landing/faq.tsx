"use client"

import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ShieldCheck, Sparkles, MapPin, CreditCard, Wifi } from "lucide-react"
import { Card, SectionTitle } from "./ui"

export function FaqSection() {
  const items = useMemo(
    () => [
      {
        q: "Does this replace self checkout lanes?",
        a: "The cart handles most trips on-board. Lanes stay for edge cases: large returns, cash, age-gated items, or manual reviews.",
        tone: "rgba(0,255,208,0.85)",
        icon: <CreditCard size={16} />,
      },
      {
        q: "How do promos stay relevant and not spammy?",
        a: "Offers trigger by aisle, basket, and intent. If the basket changes, promos re-rank—no noisy banners, just one timely suggestion.",
        tone: "rgba(255,170,80,0.9)",
        icon: <Sparkles size={16} />,
      },
      {
        q: "Is data and payment secure on the cart?",
        a: "All sessions are encrypted, tokens rotate on device, and payments run through the same PCI stack as your lanes.",
        tone: "rgba(88,130,255,0.9)",
        icon: <ShieldCheck size={16} />,
      },
      {
        q: "What if Wi‑Fi drops in aisle?",
        a: "The cart works offline-first with store Wi‑Fi or LTE failover. Guidance and promos cache, then sync when signal returns.",
        tone: "rgba(160,120,255,0.9)",
        icon: <Wifi size={16} />,
      },
      {
        q: "How do checks and verifications run?",
        a: "Lightweight checks trigger only when signals disagree. The UI stays neutral, and escalations route quietly to nearby staff.",
        tone: "rgba(255,120,120,0.9)",
        icon: <MapPin size={16} />,
      },
      {
        q: "How fast can we launch a pilot?",
        a: "Most stores pilot in weeks: drop-in mounts, SIM/Wi‑Fi setup, SKU sync, and a guided staff playbook for launch.",
        tone: "rgba(255,255,255,0.85)",
        icon: <Sparkles size={16} />,
      },
    ],
    []
  )

  return (
    <section style={{ paddingTop: 90, paddingBottom: 90 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle eyebrow="FAQ" title="Got Questions?" subtitle="What shoppers see, how stores run it, and how we keep it secure." />

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gap: 14,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            maxWidth: 980,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {items.map((it, idx) => (
            <FaqItem key={idx} q={it.q} a={it.a} tone={it.tone} icon={it.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ q, a, tone, icon }: { q: string; a: string; tone: string; icon: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Card
      style={{
        padding: 16,
        border: `1px solid ${tone}`,
        background: "linear-gradient(140deg, rgba(255,255,255,0.04), rgba(0,0,0,0.30))",
        boxShadow: "0 18px 60px rgba(0,0,0,0.30)",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ width: "100%", background: "transparent", border: "none", color: "white", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: 10,
                border: `1px solid ${tone}`,
                background: "rgba(0,0,0,0.25)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: tone,
              }}
            >
              {icon}
            </span>
            <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.94)" }}>{q}</div>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.24 }}>
            <ChevronDown size={18} style={{ opacity: 0.8 }} />
          </motion.div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.32 }}
        style={{ overflow: "hidden" }}
      >
        <div style={{ marginTop: 10, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, fontSize: 14, fontWeight: 760 }}>
          {a}
        </div>
      </motion.div>
    </Card>
  )
}
