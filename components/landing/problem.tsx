"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Mic,
  Route,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import { Card, SectionTitle, usePrefersReducedMotion } from "./ui"

const IMG_LINE = "https://images.pexels.com/photos/25811661/pexels-photo-25811661.jpeg?cs=srgb&dl=pexels-greece-china-news-81838757-25811661.jpg&fm=jpg"
const IMG_HELP = "https://images.pexels.com/photos/8476597/pexels-photo-8476597.jpeg?cs=srgb&dl=pexels-kampus-8476597.jpg&fm=jpg"
const IMG_AISLE = "https://images.pexels.com/photos/4124939/pexels-photo-4124939.jpeg?cs=srgb&dl=pexels-lifeofnacchi-4124939.jpg&fm=jpg"

export function ProblemStorySection() {
  const reduced = usePrefersReducedMotion()

  const problems = useMemo(
    () => [
      {
        title: "Checkout bottlenecks",
        note: "Every trip ends in a line instead of an exit.",
        img: IMG_LINE,
        icon: <Users size={18} />,
        tags: ["Lost minutes", "Queue friction"],
      },
      {
        title: "Findability gaps",
        note: "Aisles shift and shoppers lose items they came to buy.",
        img: IMG_AISLE,
        icon: <MapPin size={18} />,
        tags: ["Missed items", "Extra laps"],
      },
      {
        title: "Help is not available",
        note: "Staff is stretched, so questions become delays.",
        img: IMG_HELP,
        icon: <AlertTriangle size={18} />,
        tags: ["Labor drain", "Interrupted flow"],
      },
    ],
    []
  )

  const impacts = useMemo(
    () => [
      {
        title: "Time per trip",
        note: "Minutes disappear to lines and hunting.",
        icon: <Clock3 size={18} />,
      },
      {
        title: "Basket completion",
        note: "Missed items when aisles are unclear.",
        icon: <MapPin size={18} />,
      },
      {
        title: "Staff load",
        note: "More questions, fewer hands on shelves.",
        icon: <Users size={18} />,
      },
    ],
    []
  )

  const systemBlocks = useMemo(
    () => [
      {
        title: "Signals in aisle",
        body: "Live context that keeps the cart aware.",
        icon: <Mic size={18} />,
        chips: [
          { text: "Voice + tap", icon: <Mic size={14} /> },
          { text: "Location", icon: <MapPin size={14} /> },
          { text: "Basket context", icon: <ScanLine size={14} /> },
          { text: "Preferences", icon: <Users size={14} /> },
        ],
      },
      {
        title: "Decision engine",
        body: "Short answers that move the trip forward.",
        icon: <Sparkles size={18} />,
        chips: [
          { text: "Aisle routing", icon: <Route size={14} /> },
          { text: "Smart swaps", icon: <ArrowRight size={14} /> },
          { text: "Context promos", icon: <Sparkles size={14} /> },
          { text: "Clear totals", icon: <CreditCard size={14} /> },
        ],
      },
      {
        title: "Checkout + control",
        body: "Fast exit with clear guardrails.",
        icon: <ShieldCheck size={18} />,
        chips: [
          { text: "Scan as you shop", icon: <ScanLine size={14} /> },
          { text: "Tap to pay", icon: <CreditCard size={14} /> },
          { text: "Exception checks", icon: <ShieldCheck size={14} /> },
          { text: "Receipt ready", icon: <CheckCircle2 size={14} /> },
        ],
      },
    ],
    []
  )

  const solutionSteps = useMemo(
    () => [
      {
        k: "Step 01",
        title: "Ask and get the exact shelf",
        body: "Voice or tap. The cart responds with the location and a clear next action.",
        points: ["Aisle + shelf precision", "One-tap follow-ups", "Basket stays in context"],
        icon: <Mic size={18} />,
        bg: IMG_AISLE,
        tint: "rgba(0,255,208,0.14)",
      },
      {
        k: "Step 02",
        title: "Route and swap with confidence",
        body: "Guided paths through the store plus substitutes when stock or needs change.",
        points: ["Fast route to shelf", "Comparable substitutes", "Price and size clarity"],
        icon: <Route size={18} />,
        bg: IMG_HELP,
        tint: "rgba(160,120,255,0.14)",
      },
      {
        k: "Step 03",
        title: "Promos that are actually relevant",
        body: "Offers show up only when they match the aisle and your basket.",
        points: ["Aisle-triggered", "Basket-aware", "No extra noise"],
        icon: <Sparkles size={18} />,
        bg: IMG_CASHIER,
        tint: "rgba(255,170,80,0.14)",
      },
      {
        k: "Step 04",
        title: "Scan, verify, and pay",
        body: "Scan as you shop, finish on the cart, and leave without a lane.",
        points: ["Real-time total", "Exception checks", "Receipt ready"],
        icon: <CreditCard size={18} />,
        bg: IMG_SELF,
        tint: "rgba(160,120,255,0.14)",
      },
    ],
    []
  )

  const outcomes = useMemo(
    () => [
      {
        title: "Faster trips",
        note: "Less waiting and fewer detours in aisle.",
        icon: <Clock3 size={18} />,
      },
      {
        title: "More complete baskets",
        note: "Shoppers find what they came for.",
        icon: <CheckCircle2 size={18} />,
      },
      {
        title: "Controlled checkout",
        note: "Clear exceptions and calm exits.",
        icon: <ShieldCheck size={18} />,
      },
    ],
    []
  )

  return (
    <section style={{ paddingTop: 90, paddingBottom: 90 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle
          eyebrow="The problem"
          title="Trips break in three places"
          subtitle="Queues, findability gaps, and unanswered questions slow every basket."
        />

        <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {problems.map((p) => (
            <ImageCard key={p.title} title={p.title} note={p.note} img={p.img} icon={p.icon} tags={p.tags} />
          ))}
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {impacts.map((impact) => (
            <ImpactCard key={impact.title} title={impact.title} note={impact.note} icon={impact.icon} />
          ))}
        </div>

        <div style={{ marginTop: 26, display: "flex", justifyContent: "center" }}>
          <motion.div
            animate={reduced ? { opacity: 0.9 } : { opacity: [0.45, 0.9, 0.45], y: [0, 8, 0] }}
            transition={reduced ? { duration: 1 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "linear-gradient(90deg, rgba(0,255,208,0.12), rgba(160,120,255,0.12), rgba(255,170,80,0.12))",
              color: "rgba(255,255,255,0.74)",
              fontSize: 13,
              fontWeight: 950,
            }}
          >
            <span>Now the solution</span>
            <ArrowRight size={16} style={{ opacity: 0.9 }} />
          </motion.div>
        </div>

        <div style={{ marginTop: 26 }}>
          <SectionTitle
            eyebrow="The solution"
            title="An assistant embedded in every cart"
            subtitle="It guides the aisle, keeps choices clear, and ends the trip without a line."
          />
        </div>

        <div style={{ marginTop: 24 }}>
          <Card style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 16, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Cart intelligence stack</div>
              <MiniTag icon={<Sparkles size={12} />} text="Real-time context" />
            </div>

            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              {systemBlocks.map((block) => (
                <SystemBlock key={block.title} title={block.title} body={block.body} icon={block.icon} chips={block.chips} />
              ))}
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
          {solutionSteps.map((s) => (
            <StoryStep
              key={s.k}
              step={s.k}
              title={s.title}
              body={s.body}
              points={s.points}
              icon={s.icon}
              bg={s.bg}
              tint={s.tint}
            />
          ))}
        </div>

        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {outcomes.map((outcome) => (
            <OutcomeCard key={outcome.title} title={outcome.title} note={outcome.note} icon={outcome.icon} />
          ))}
        </div>

        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
          <TinyTag icon={<Mic size={14} />} text="Ask" />
          <TinyTag icon={<Route size={14} />} text="Route" />
          <TinyTag icon={<Sparkles size={14} />} text="Promos" />
          <TinyTag icon={<CreditCard size={14} />} text="Pay" />
        </div>
      </div>
    </section>
  )
}

function ImageCard({
  title,
  note,
  img,
  icon,
  tags,
}: {
  title: string
  note: string
  img: string
  icon: React.ReactNode
  tags?: string[]
}) {
  return (
    <Card style={{ padding: 14 }}>
      <div
        style={{
          height: 170,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.12)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={img}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.65))" }} />
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 12,
            width: 44,
            height: 44,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(0,0,0,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.90)",
          }}
        >
          {icon}
        </div>
      </div>

      <div style={{ marginTop: 12, fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{title}</div>
      <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.6, fontWeight: 850, color: "rgba(255,255,255,0.70)" }}>
        {note}
      </div>
      {tags?.length ? (
        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tags.map((tag) => (
            <MiniTag key={tag} text={tag} />
          ))}
        </div>
      ) : null}
    </Card>
  )
}

function StoryStep({
  step,
  title,
  body,
  points,
  icon,
  bg,
  tint,
}: {
  step: string
  title: string
  body: string
  points?: string[]
  icon: React.ReactNode
  bg: string
  tint: string
}) {
  return (
    <Card style={{ padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, alignItems: "center" }}>
        <div
          style={{
            height: 120,
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            position: "relative",
          }}
        >
          <img
            src={bg}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            loading="lazy"
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.70))` }} />
          <div style={{ position: "absolute", inset: 0, background: tint, mixBlendMode: "screen", opacity: 0.8 }} />

          <div
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              width: 40,
              height: 40,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.90)",
            }}
          >
            {icon}
          </div>
        </div>

        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.16)",
              color: "rgba(255,255,255,0.76)",
              fontSize: 12,
              fontWeight: 950,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "rgba(255,255,255,0.75)" }} />
            <span>{step}</span>
          </div>

          <div style={{ marginTop: 10, fontSize: 18, fontWeight: 980, color: "rgba(255,255,255,0.93)" }}>{title}</div>
          <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.72)", fontWeight: 850 }}>
            {body}
          </div>
          {points?.length ? (
            <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
              {points.map((point) => (
                <div key={point} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.70)", fontSize: 13, fontWeight: 850 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.55)" }} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  )
}

function ImpactCard({
  title,
  note,
  icon,
}: {
  title: string
  note: string
  icon: React.ReactNode
}) {
  return (
    <Card style={{ padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {icon}
        </div>
        <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.90)" }}>{title}</div>
      </div>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55, fontWeight: 850, color: "rgba(255,255,255,0.66)" }}>{note}</div>
    </Card>
  )
}

function SystemBlock({
  title,
  body,
  icon,
  chips,
}: {
  title: string
  body: string
  icon: React.ReactNode
  chips: { text: string; icon: React.ReactNode }[]
}) {
  return (
    <div
      style={{
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.18)",
        padding: 14,
        display: "grid",
        gap: 10,
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{title}</div>
          <div style={{ marginTop: 4, fontSize: 12, fontWeight: 850, color: "rgba(255,255,255,0.64)" }}>{body}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {chips.map((chip) => (
          <MiniTag key={chip.text} icon={chip.icon} text={chip.text} />
        ))}
      </div>
    </div>
  )
}

function OutcomeCard({
  title,
  note,
  icon,
}: {
  title: string
  note: string
  icon: React.ReactNode
}) {
  return (
    <Card style={{ padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {icon}
        </div>
        <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{title}</div>
      </div>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55, fontWeight: 850, color: "rgba(255,255,255,0.66)" }}>{note}</div>
    </Card>
  )
}

function TinyTag({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.03)",
        padding: 12,
        display: "flex",
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
        color: "rgba(255,255,255,0.82)",
        fontWeight: 950,
        fontSize: 13,
      }}
    >
      <span style={{ display: "inline-flex", opacity: 0.9 }}>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

function MiniTag({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.20)",
        fontSize: 11,
        fontWeight: 900,
        color: "rgba(255,255,255,0.70)",
      }}
    >
      {icon ? <span style={{ display: "inline-flex", opacity: 0.85 }}>{icon}</span> : null}
      <span>{text}</span>
    </span>
  )
}
