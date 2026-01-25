"use client"

import React from "react"
import { BarChart3, CheckCircle2, Clock3, Lock, Plug, ShieldCheck, Sparkles, Users } from "lucide-react"
import { Card, SectionTitle } from "./ui"

export function ProofSection() {
  return (
    <section id="proof" style={{ paddingTop: 90, paddingBottom: 90 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle
          eyebrow="Retailer impact"
          title="Built for store performance"
          subtitle="Faster trips, larger baskets, lower labor friction, and cleaner exceptions."
        />

        <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
          <Metric title="Basket size" value="Higher AOV" icon={<Sparkles size={18} />} note="Personalized promos and swaps" />
          <Metric title="Trip time" value="Shorter trips" icon={<Clock3 size={18} />} note="Less hunting, fewer lines" />
          <Metric title="Labor load" value="Fewer calls" icon={<Users size={18} />} note="More focus on shelves" />
          <Metric title="Exception control" value="Cleaner audits" icon={<ShieldCheck size={18} />} note="Clear checks and outcomes" />
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 12, alignItems: "stretch" }}>
          <Card style={{ padding: 18 }}>
            <div style={{ fontSize: 18, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Retailer outcomes</div>
            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, fontSize: 14, fontWeight: 850 }}>
              The cart keeps shoppers moving, protects margin with smart promos, and reduces staff interruptions. Ops gets clear visibility into usage, exceptions, and revenue impact.
            </div>

            <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
              <LineItem icon={<CheckCircle2 size={18} />} title="Basket lift" note="Relevant offers and smart swaps" />
              <LineItem icon={<CheckCircle2 size={18} />} title="Labor efficiency" note="Fewer questions per trip" />
              <LineItem icon={<CheckCircle2 size={18} />} title="Checkout flow" note="More exits per hour" />
              <LineItem icon={<CheckCircle2 size={18} />} title="Exception clarity" note="Lower verification friction" />
            </div>
          </Card>

          <Card style={{ padding: 18 }}>
            <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Store performance view</div>
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 850, color: "rgba(255,255,255,0.72)", lineHeight: 1.55 }}>
              A single screen that shows basket lift, labor savings, and exception rates by aisle and time.
            </div>
            <div style={{ marginTop: 14 }}>
              <RetailerVisual />
            </div>

            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
              <SmallTrust icon={<Plug size={16} />} title="POS + loyalty" note="Live pricing" />
              <SmallTrust icon={<BarChart3 size={16} />} title="Analytics" note="Aisle trends" />
              <SmallTrust icon={<Lock size={16} />} title="Security" note="Encrypted data" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Metric({
  title,
  value,
  icon,
  note,
}: {
  title: string
  value: string
  icon: React.ReactNode
  note: string
}) {
  return (
    <Card style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <div style={{ fontSize: 14, fontWeight: 980, color: "rgba(255,255,255,0.86)" }}>{value}</div>
      </div>

      <div style={{ marginTop: 10, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{title}</div>
      <div style={{ marginTop: 6, fontSize: 13, fontWeight: 850, color: "rgba(255,255,255,0.68)", lineHeight: 1.55 }}>
        {note}
      </div>
    </Card>
  )
}

function RetailerVisual() {
  const bars = [0.65, 0.82, 0.58, 0.76, 0.9]
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.03)",
        padding: 12,
        display: "grid",
        gap: 12,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.20)", padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.66)" }}>Basket lift</div>
          <div style={{ marginTop: 6, fontSize: 16, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>+12%</div>
        </div>
        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.20)", padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.66)" }}>Labor calls</div>
          <div style={{ marginTop: 6, fontSize: 16, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>-18%</div>
        </div>
        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.20)", padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.66)" }}>Exit time</div>
          <div style={{ marginTop: 6, fontSize: 16, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>-9 min</div>
        </div>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>Trips per hour</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
          {bars.map((b, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                height: `${b * 100}%`,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "linear-gradient(180deg, rgba(0,255,208,0.18), rgba(255,255,255,0.04))",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function LineItem({ icon, title, note }: { icon: React.ReactNode; title: string; note: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 12, alignItems: "start" }}>
      <div style={{ width: 44, height: 44, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{title}</div>
        <div style={{ marginTop: 6, fontSize: 13, fontWeight: 850, color: "rgba(255,255,255,0.68)", lineHeight: 1.55 }}>{note}</div>
      </div>
    </div>
  )
}

function SmallTrust({ icon, title, note }: { icon: React.ReactNode; title: string; note: string }) {
  return (
    <div style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{title}</div>
          <div style={{ marginTop: 4, fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.66)" }}>{note}</div>
        </div>
      </div>
    </div>
  )
}
