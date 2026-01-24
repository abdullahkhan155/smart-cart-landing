"use client"

import React from "react"
import { BarChart3, CheckCircle2, Clock3, Lock, Plug, ShieldCheck, Sparkles, Users } from "lucide-react"
import { Card, SectionTitle } from "./ui"

const IMG_PROOF = "https://images.pexels.com/photos/20157487/pexels-photo-20157487.jpeg?cs=srgb&dl=pexels-sebastian-maitre-975371377-20157487.jpg&fm=jpg"

export function ProofSection() {
  return (
    <section id="proof" style={{ paddingTop: 90, paddingBottom: 90 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle
          eyebrow="Proof"
          title="What stores actually measure"
          subtitle="A pilot is judged by a small set of metrics. This section is built around those."
        />

        <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
          <Metric title="Trip time" value="Minutes saved" icon={<Clock3 size={18} />} note="Compare assisted carts vs baseline" />
          <Metric title="Help requests" value="Fewer stops" icon={<Users size={18} />} note="Calls to staff per trip" />
          <Metric title="Throughput" value="More flow" icon={<BarChart3 size={18} />} note="Trips per hour per cart" />
          <Metric title="Exceptions" value="Cleaner audits" icon={<ShieldCheck size={18} />} note="Verification rate and outcomes" />
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 12, alignItems: "stretch" }}>
          <Card style={{ padding: 18 }}>
            <div style={{ fontSize: 18, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>A pilot that feels real</div>
            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, fontSize: 14, fontWeight: 850 }}>
              Week 1 installs a small set of carts and trains staff on exceptions.
              Week 2 focuses on shopper flow and assistant accuracy.
              Week 3 measures throughput, help requests, and verification impact.
            </div>

            <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
              <LineItem icon={<CheckCircle2 size={18} />} title="Assistant adoption" note="How many trips use questions, routes, and swaps" />
              <LineItem icon={<CheckCircle2 size={18} />} title="Promo usefulness" note="Clicks and conversions, not noise" />
              <LineItem icon={<CheckCircle2 size={18} />} title="Checkout finish" note="Pay completion rate and average time" />
            </div>
          </Card>

          <Card style={{ padding: 18, overflow: "hidden" }}>
            <div style={{ height: 240, borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", overflow: "hidden", position: "relative" }}>
              <img src={IMG_PROOF} alt="Checkout counter" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.72))" }} />
              <div style={{ position: "absolute", left: 12, bottom: 12, right: 12, padding: 12, borderRadius: 18, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.22)" }}>
                <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Designed for retail ops</div>
                <div style={{ marginTop: 6, fontSize: 13, fontWeight: 850, color: "rgba(255,255,255,0.72)", lineHeight: 1.55 }}>
                  Clear exceptions. Clear dashboards. Clear outcomes.
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
              <SmallTrust icon={<Plug size={16} />} title="Integrations" note="POS and loyalty" />
              <SmallTrust icon={<Lock size={16} />} title="Security" note="Encrypted flows" />
              <SmallTrust icon={<Sparkles size={16} />} title="Assistant" note="Short answers" />
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
