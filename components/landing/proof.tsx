"use client"

import React, { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Activity, BarChart3, Clock3, MessageSquare, ShieldCheck, Sparkles, TrendingUp } from "lucide-react"
import { Card, SectionTitle, useBreakpoint } from "./ui"

type Insight = {
  title: string
  query: string
  insight: string
  action: string
  tone: string
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function ProofSection() {
  const isMobile = useBreakpoint(720)

  const insights: Insight[] = [
    {
      title: "Trend detection",
      query: "Where is gluten-free pasta?",
      insight: "Gluten-free interest +320% in Aisle 7",
      action: "Add endcap + recipe pairing",
      tone: "rgba(88,130,255,0.85)",
    },
    {
      title: "Stockout prevention",
      query: "Is the oat milk out?",
      insight: "Zone 3: Oat milk low (12 units)",
      action: "Alert staff: restock in 6 mins",
      tone: "rgba(255,170,80,0.9)",
    },
    {
      title: "Impulse wins",
      query: "Quick snack near checkout?",
      insight: "Checkout snack conversion +28% with bundles",
      action: "Pin promo chips + dip at lane entrance",
      tone: "rgba(0,255,208,0.9)",
    },
  ]

  return (
    <section id="proof" style={{ paddingTop: isMobile ? 50 : 80, paddingBottom: isMobile ? 50 : 80 }}>
      <div style={{ width: isMobile ? "calc(100% - 24px)" : "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle
          eyebrow="Retailer insight"
          title="We listen, so you can optimize"
          subtitle="Cart conversations surface trends and restocks in real-time."
        />

        <div style={{ marginTop: isMobile ? 24 : 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: isMobile ? 12 : 20 }}>
          {insights.map((insight) => (
            <InsightCard key={insight.title} {...insight} />
          ))}
        </div>
      </div>
    </section>
  )
}

function InsightCard({
  title,
  query,
  insight,
  action,
  tone,
}: {
  title: string
  query: string
  insight: string
  action: string
  tone: string
}) {
  return (
    <Card style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: tone, fontSize: 11, fontWeight: 900, letterSpacing: 0.3, textTransform: "uppercase" }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: tone }} />
        <span>{title}</span>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontSize: 18, fontWeight: 980, color: "rgba(255,255,255,0.94)", lineHeight: 1.4 }}>
          "{query}"
        </div>
        <div style={{ fontSize: 13, fontWeight: 850, color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
          Insight: <span style={{ color: "rgba(255,255,255,0.85)" }}>{insight}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 900, color: tone }}>
          Action: {action}
        </div>
      </div>
    </Card>
  )
}

const defaultInsights: Array<{
  title: string
  query: string
  insight: string
  action: string
  tone: string
}> = []
