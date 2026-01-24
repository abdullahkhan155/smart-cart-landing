"use client"

import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Card, SectionTitle } from "./ui"

export function FaqSection() {
  const items = useMemo(
    () => [
      { q: "Does this replace self checkout?", a: "It moves the flow onto the cart. Stores can keep lanes for edge cases while most trips finish on cart." },
      { q: "How do promotions stay helpful?", a: "Promos are tied to aisle location and cart context, then shown as assistant suggestions at the right moment." },
      { q: "How does verification work?", a: "Checks are triggered only when needed and the tone stays calm. The goal is protection without tension." },
      { q: "Can the assistant stay simple?", a: "Yes. It answers quickly, offers one tap actions, and fades away when it is not needed." },
    ],
    []
  )

  return (
    <section style={{ paddingTop: 90, paddingBottom: 90 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle eyebrow="FAQ" title="Short answers, calm experience" subtitle="Everything stays simple for shoppers and useful for stores." />

        <div style={{ marginTop: 26, display: "grid", gap: 12, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
          {items.map((it, idx) => (
            <FaqItem key={idx} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Card style={{ padding: 16 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ width: "100%", background: "transparent", border: "none", color: "white", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{q}</div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} style={{ opacity: 0.8 }} />
          </motion.div>
        </div>
      </button>

      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <div style={{ marginTop: 10, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, fontSize: 14, fontWeight: 750 }}>{a}</div>
      </motion.div>
    </Card>
  )
}
