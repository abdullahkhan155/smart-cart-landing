"use client"

import React, { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Boxes, ChevronDown, CreditCard, Megaphone, ShieldCheck, Sparkles } from "lucide-react"
import { Card, SectionTitle } from "@/components/landing"

export function RetailersFaqSection() {
  const items = useMemo(
    () => [
      {
        q: "Does this replace all checkout lanes?",
        a: "The cart handles most trips on-board. Traditional lanes stay for edge cases (cash, large returns, age-gated items, audits).",
        icon: <CreditCard size={16} />,
        tone: "rgba(0,255,208,0.85)",
      },
      {
        q: "How does this support inventory and merchandising?",
        a: "In-aisle intent and basket signals help identify out-of-stocks, substitution patterns, and aisle-level demand—useful for replenishment and merchandising decisions.",
        icon: <Boxes size={16} />,
        tone: "rgba(255,170,80,0.9)",
      },
      {
        q: "Can we run retail media without hurting the experience?",
        a: "Yes—placements are context-aware, limited in volume, and tuned to feel helpful (bundles, swaps, aisle guidance), not banner spam.",
        icon: <Megaphone size={16} />,
        tone: "rgba(88,130,255,0.9)",
      },
      {
        q: "What about shrink and audits?",
        a: "Verification triggers only when signals disagree. Exceptions route to staff with context, keeping trips fast while protecting margin.",
        icon: <ShieldCheck size={16} />,
        tone: "rgba(160,120,255,0.9)",
      },
      {
        q: "How fast can we pilot?",
        a: "Most pilots are measured in weeks: hardware setup, SKU/promo sync, staff training, and a guided launch playbook.",
        icon: <Sparkles size={16} />,
        tone: "rgba(255,255,255,0.85)",
      },
    ],
    []
  )

  return (
    <section id="faq" style={{ paddingTop: 70, paddingBottom: 86 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle eyebrow="FAQ" title="Questions retailers ask" subtitle="How stores run it, how it measures, and how it stays operationally sane." />
        <div style={{ marginTop: 24, display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", maxWidth: 980, marginLeft: "auto", marginRight: "auto" }}>
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
    <Card style={{ padding: 16, border: `1px solid ${tone}`, background: "linear-gradient(140deg, rgba(255,255,255,0.04), rgba(0,0,0,0.30))", boxShadow: "0 18px 60px rgba(0,0,0,0.30)" }}>
      <button onClick={() => setOpen((v) => !v)} style={{ width: "100%", background: "transparent", border: "none", color: "white", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 14, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: tone }}>
              {icon}
            </div>
            <div style={{ fontSize: 14, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{q}</div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: 14, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.72)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 180ms ease" }}>
            <ChevronDown size={16} />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", fontWeight: 740 }}>{a}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Card>
  )
}

