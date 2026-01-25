"use client"

import React, { useState } from "react"
import { Activity, BarChart3, Clock3, MessageSquare, ShieldCheck, Sparkles, TrendingUp } from "lucide-react"
import { Card, SectionTitle, useBreakpoint } from "./ui"

export function ProofSection() {
  const isMobile = useBreakpoint(720)
  const insights = [
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
      title: "Merchandising",
      query: "What's a good low-sodium sauce?",
      insight: "High ask rate near pasta bundle",
      action: "Feature sauce next to gluten-free pasta",
      tone: "rgba(0,255,208,0.9)",
    },
  ]

  const bars = [0.48, 0.72, 0.62, 0.84, 0.58, 0.9, 0.76, 0.66]
  const events = [
    { time: "10:42", text: "Need an allergy-friendly snack", zone: "Zone 4", tone: "rgba(0,255,208,0.85)" },
    { time: "10:41", text: "Where's the oat milk?", zone: "Zone 3", tone: "rgba(255,170,80,0.85)" },
    { time: "10:39", text: "Help needed at checkout", zone: "Front", tone: "rgba(255,120,120,0.9)" },
  ]

  return (
    <section id="proof" style={{ paddingTop: isMobile ? 70 : 80, paddingBottom: isMobile ? 60 : 70 }}>
      <div style={{ width: isMobile ? "calc(100% - 24px)" : "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle
          eyebrow="Retailer insight"
          title="We listen, so you can optimize"
          subtitle="Cart conversations surface trends, restocks, and merchandising moves that keep shelves moving."
        />

        <div style={{ marginTop: isMobile ? 16 : 20, display: "grid", gridTemplateColumns: "1fr", gap: isMobile ? 14 : 18 }}>
          <SignalPane insights={insights} />
          <OpsPane bars={bars} events={events} />
        </div>
      </div>
    </section>
  )
}

function SignalPane({ insights }: { insights: typeof defaultInsights }) {
  const isMobile = useBreakpoint(720)
  return (
    <Card style={{ padding: isMobile ? 16 : 24, display: "grid", gap: isMobile ? 12 : 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "grid", gap: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.68)" }}>Signal stream</div>
          <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 980, color: "rgba(255,255,255,0.94)" }}>
            Cart asks {"->"} store actions
          </div>
          <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 850, color: "rgba(255,255,255,0.70)" }}>
            Live intent turns into ops moves.
          </div>
        </div>
        <span
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.28)",
            fontSize: 11,
            fontWeight: 900,
            color: "rgba(255,255,255,0.70)",
          }}
        >
          Live feed
        </span>
      </div>

      <div style={{ display: "grid", gap: isMobile ? 10 : 14 }}>
        {insights.map((insight) => (
          <InsightCard key={insight.title} {...insight} />
        ))}
      </div>
    </Card>
  )
}

function OpsPane({ bars, events }: { bars: number[]; events: { time: string; text: string; zone: string; tone: string }[] }) {
  const isMobile = useBreakpoint(720)
  const [range, setRange] = useState<"live" | "day" | "week">("live")
  const [activeEvent, setActiveEvent] = useState(0)
  const [activeDemand, setActiveDemand] = useState(0)
  const [activeBar, setActiveBar] = useState<number | null>(null)
  const barLabels = ["9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p"]
  const barSets = {
    live: bars,
    day: [0.32, 0.56, 0.48, 0.72, 0.42, 0.6, 0.7, 0.52],
    week: [0.44, 0.5, 0.63, 0.58, 0.74, 0.66, 0.82, 0.6],
  }
  const demand = [
    { label: "Gluten-free pasta", value: "42 queries", tone: "rgba(0,255,208,0.9)", width: "82%" },
    { label: "Oat milk", value: "28 queries", tone: "rgba(255,170,80,0.9)", width: "64%" },
    { label: "Low-sodium sauce", value: "19 queries", tone: "rgba(88,130,255,0.9)", width: "48%" },
  ]

  const focusEvent = events[activeEvent]
  const focusDemand = demand[activeDemand]

  return (
    <Card style={{ padding: isMobile ? 16 : 20, display: "grid", gap: isMobile ? 10 : 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 980, color: "rgba(255,255,255,0.94)" }}>Ops pulse</div>
        <span style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.64)" }}>Status: live</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(auto-fit, minmax(140px, 1fr))" : "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
        <MiniStat label="Active carts" value="142" icon={<Activity size={14} />} tone="rgba(0,255,208,0.85)" />
        <MiniStat label="Resolved asks" value="1,893" icon={<Sparkles size={14} />} tone="rgba(88,130,255,0.85)" />
        <MiniStat label="Conversion risk" value="14%" icon={<BarChart3 size={14} />} tone="rgba(255,170,80,0.90)" />
      </div>

      <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.18)", padding: 12, display: "grid", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.68)" }}>Interaction volume</div>
          <div style={{ display: "flex", gap: 6 }}>
            <RangeButton label="Live" active={range === "live"} onClick={() => setRange("live")} />
            <RangeButton label="24h" active={range === "day"} onClick={() => setRange("day")} />
            <RangeButton label="7d" active={range === "week"} onClick={() => setRange("week")} />
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.60)" }}>
          {activeBar === null ? "Tap a bar for detail" : `Active window: ${barLabels[activeBar]}`}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: isMobile ? 80 : 100 }}>
          {barSets[range].map((b, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveBar(i)}
              onMouseLeave={() => setActiveBar((prev) => (prev === i ? null : prev))}
              onClick={() => setActiveBar(i)}
              style={{
                flex: 1,
                height: `${b * 100}%`,
                borderRadius: 10,
                border: activeBar === i ? "1px solid rgba(255,255,255,0.30)" : "1px solid rgba(255,255,255,0.10)",
                background: activeBar === i
                  ? "linear-gradient(180deg, rgba(88,130,255,0.40), rgba(0,0,0,0.10))"
                  : "linear-gradient(180deg, rgba(88,130,255,0.22), rgba(0,0,0,0.05))",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 10, gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr" }}>
        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.18)", padding: 12, display: "grid", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.68)" }}>Live interaction stream</div>
          {events.map((event, index) => {
            const isActive = index === activeEvent
            return (
              <button
                key={event.text}
                type="button"
                onClick={() => setActiveEvent(index)}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "52px 1fr" : "56px 1fr 56px",
                  gap: 6,
                  alignItems: "center",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: isActive ? `1px solid ${event.tone}` : "1px solid rgba(255,255,255,0.08)",
                  background: isActive ? "rgba(0,0,0,0.32)" : "rgba(0,0,0,0.16)",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.62)" }}>{event.time}</span>
                {isMobile ? (
                  <span style={{ display: "grid", gap: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: event.tone }}>{event.text}</span>
                    <span style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.62)" }}>{event.zone}</span>
                  </span>
                ) : (
                  <>
                    <span style={{ fontSize: 13, fontWeight: 900, color: event.tone }}>{event.text}</span>
                    <span style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.62)", textAlign: "right" }}>{event.zone}</span>
                  </>
                )}
              </button>
            )
          })}
        </div>

        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.18)", padding: 12, display: "grid", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.68)" }}>Unmet demand (new)</div>
          {demand.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveDemand(index)}
              style={{
                border: "none",
                padding: 0,
                background: "transparent",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <DemandLine
                label={item.label}
                value={item.value}
                tone={item.tone}
                width={item.width}
                active={index === activeDemand}
              />
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(0,0,0,0.20)",
          padding: 12,
          display: "grid",
          gap: 6,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.62)" }}>Focus now</div>
        <div style={{ fontSize: 14, fontWeight: 980, color: focusEvent.tone }}>{focusEvent.text}</div>
        <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>
          Demand spike: <span style={{ color: focusDemand.tone }}>{focusDemand.label}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <InlinePill icon={<ShieldCheck size={14} />} text="Encrypted sessions" />
        <InlinePill icon={<TrendingUp size={14} />} text="Export insights" />
        <InlinePill icon={<Clock3 size={14} />} text="Live SLA guardrails" />
        <InlinePill icon={<MessageSquare size={14} />} text="Convo transcript" />
      </div>
    </Card>
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
  const isMobile = useBreakpoint(720)
  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${tone}`,
        background: "linear-gradient(150deg, rgba(0,0,0,0.28), rgba(0,0,0,0.18))",
        padding: isMobile ? 12 : 16,
        display: "grid",
        gap: isMobile ? 6 : 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: tone, fontSize: 11, fontWeight: 900, letterSpacing: 0.3, textTransform: "uppercase" }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: tone }} />
        <span>{title}</span>
      </div>
      <div style={{ display: "grid", gap: 4, color: "rgba(255,255,255,0.85)" }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.68)" }}>Shopper query</div>
        <div style={{ fontSize: 15, fontWeight: 980 }}>"{query}"</div>
        <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.68)" }}>System insight</div>
        <div style={{ fontSize: 14, fontWeight: 980 }}>{insight}</div>
        <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.70)" }}>
          Action: <span style={{ color: tone }}>{action}</span>
        </div>
      </div>
    </div>
  )
}

function MiniStat({ label, value, icon, tone }: { label: string; value: string; icon: React.ReactNode; tone: string }) {
  return (
    <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.20)", padding: 10, display: "flex", gap: 10, alignItems: "center" }}>
      <div style={{ width: 34, height: 34, borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: tone }}>
        {icon}
      </div>
      <div style={{ display: "grid", gap: 2 }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.65)" }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 980, color: "rgba(255,255,255,0.94)" }}>{value}</div>
      </div>
    </div>
  )
}

function DemandLine({
  label,
  value,
  tone,
  width,
  active,
}: {
  label: string
  value: string
  tone: string
  width: string
  active: boolean
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 4,
        padding: "6px 0",
        borderRadius: 10,
        border: active ? `1px solid ${tone}` : "1px solid transparent",
        background: active ? "rgba(0,0,0,0.22)" : "transparent",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.82)" }}>
        <span>{label}</span>
        <span style={{ color: "rgba(255,255,255,0.66)" }}>{value}</span>
      </div>
      <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div style={{ width, height: "100%", background: tone, borderRadius: 999, opacity: 0.8 }} />
      </div>
    </div>
  )
}

function RangeButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "4px 8px",
        borderRadius: 999,
        border: active ? "1px solid rgba(255,255,255,0.24)" : "1px solid rgba(255,255,255,0.10)",
        background: active ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.25)",
        color: active ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.60)",
        fontSize: 11,
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  )
}

function InlinePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.22)",
        fontSize: 12,
        fontWeight: 900,
        color: "rgba(255,255,255,0.82)",
      }}
    >
      <span style={{ display: "inline-flex", color: "rgba(255,255,255,0.82)" }}>{icon}</span>
      <span>{text}</span>
    </span>
  )
}

const defaultInsights: Array<{
  title: string
  query: string
  insight: string
  action: string
  tone: string
}> = []
