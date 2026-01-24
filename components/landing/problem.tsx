"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, CreditCard, MapPin, Mic, Route, ScanLine, Sparkles, Users } from "lucide-react"
import { Card, SectionTitle, usePrefersReducedMotion } from "./ui"

const IMG_LINE = "https://images.pexels.com/photos/25811661/pexels-photo-25811661.jpeg?cs=srgb&dl=pexels-greece-china-news-81838757-25811661.jpg&fm=jpg"
const IMG_HELP = "https://images.pexels.com/photos/8476597/pexels-photo-8476597.jpeg?cs=srgb&dl=pexels-kampus-8476597.jpg&fm=jpg"
const IMG_AISLE = "https://images.pexels.com/photos/4124939/pexels-photo-4124939.jpeg?cs=srgb&dl=pexels-lifeofnacchi-4124939.jpg&fm=jpg"
const IMG_CASHIER = "https://images.pexels.com/photos/20157487/pexels-photo-20157487.jpeg?cs=srgb&dl=pexels-sebastian-maitre-975371377-20157487.jpg&fm=jpg"
const IMG_SELF = "https://images.pexels.com/photos/28846963/pexels-photo-28846963.jpeg?cs=srgb&dl=pexels-planka-28846963.jpg&fm=jpg"

export function ProblemStorySection() {
  const reduced = usePrefersReducedMotion()

  const problems = useMemo(
    () => [
      {
        title: "Long checkout lines",
        note: "The last ten minutes become waiting.",
        img: IMG_LINE,
        icon: <Users size={18} />,
      },
      {
        title: "Can’t find what you need",
        note: "Aisles feel slower than they should.",
        img: IMG_AISLE,
        icon: <MapPin size={18} />,
      },
      {
        title: "No one to ask",
        note: "Staff is busy, and answers are missing.",
        img: IMG_HELP,
        icon: <AlertTriangle size={18} />,
      },
    ],
    []
  )

  const solutionSteps = useMemo(
    () => [
      {
        k: "Step 01",
        title: "Ask the cart",
        body: "Voice or tap. The assistant answers in aisle with one clear next action.",
        icon: <Mic size={18} />,
        bg: IMG_AISLE,
        tint: "rgba(0,255,208,0.14)",
      },
      {
        k: "Step 02",
        title: "Get a route and a swap",
        body: "It guides you to the shelf and suggests a better option when it matters.",
        icon: <Route size={18} />,
        bg: IMG_HELP,
        tint: "rgba(160,120,255,0.14)",
      },
      {
        k: "Step 03",
        title: "See promos near you",
        body: "Promotions appear as assistant suggestions tied to aisle location and cart context.",
        icon: <Sparkles size={18} />,
        bg: IMG_CASHIER,
        tint: "rgba(255,170,80,0.14)",
      },
      {
        k: "Step 04",
        title: "Scan and pay on cart",
        body: "Checkout becomes the easy finish, not the bottleneck.",
        icon: <CreditCard size={18} />,
        bg: IMG_SELF,
        tint: "rgba(160,120,255,0.14)",
      },
    ],
    []
  )

  return (
    <section style={{ paddingTop: 90, paddingBottom: 90 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle
          eyebrow="The problem"
          title="Shopping breaks in three places"
          subtitle="Lines, missing answers, and wasted aisle time. That is what the cart fixes."
        />

        <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          {problems.map((p) => (
            <ImageCard key={p.title} title={p.title} note={p.note} img={p.img} icon={p.icon} />
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
              background: "rgba(0,0,0,0.18)",
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
            title="An assistant that lives on the cart"
            subtitle="It keeps the trip moving, then it makes checkout disappear."
          />
        </div>

        <div style={{ marginTop: 34, display: "grid", gap: 12 }}>
          {solutionSteps.map((s) => (
            <StoryStep
              key={s.k}
              step={s.k}
              title={s.title}
              body={s.body}
              icon={s.icon}
              bg={s.bg}
              tint={s.tint}
            />
          ))}
        </div>

        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10 }}>
          <TinyTag icon={<Mic size={14} />} text="Ask" />
          <TinyTag icon={<MapPin size={14} />} text="Find" />
          <TinyTag icon={<ScanLine size={14} />} text="Scan" />
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
}: {
  title: string
  note: string
  img: string
  icon: React.ReactNode
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
    </Card>
  )
}

function StoryStep({
  step,
  title,
  body,
  icon,
  bg,
  tint,
}: {
  step: string
  title: string
  body: string
  icon: React.ReactNode
  bg: string
  tint: string
}) {
  return (
    <Card style={{ padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 14, alignItems: "center" }}>
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
        </div>
      </div>
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
