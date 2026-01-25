"use client"

import React, { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, ArrowRight, Clock3, MapPin, Users } from "lucide-react"
import { Card, SectionTitle, usePrefersReducedMotion } from "./ui"

type ProblemKind = "checkout" | "find" | "help"

export function ProblemStorySection() {
  const reduced = usePrefersReducedMotion()

  const problems = useMemo(
    () => [
      {
        title: "Checkout take too long",
        note: "Lines turn the last minutes into idle time.",
        icon: <Users size={18} />,
        tags: ["Queue time", "Exit delay"],
        kind: "checkout" as const,
      },
      {
        title: "Decision Overload",
        note: "Too many items, promotions, and prices to track.",
        icon: <MapPin size={18} />,
        tags: ["Lost minutes", "Missed items"],
        kind: "find" as const,
      },
      {
        title: "Limited Staff Help",
        note: "Lack of staff coverage pauses the trip.",
        icon: <AlertTriangle size={18} />,
        tags: ["Staff strain", "Interrupted flow"],
        kind: "help" as const,
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

  const [activeSolution, setActiveSolution] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const solutionShowcase = useMemo(
    () => [
      {
        id: "assistant",
        label: "AI assistant",
        title: "AI Shopping Assistant",
        description: "Live answers and guidance, right on the cart screen.",
        image: "/AI_Screen.png",
        accent: "rgba(0,255,208,0.24)",
        accentStrong: "rgba(0,255,208,0.9)",
      },
      {
        id: "promos",
        label: "Personalized promos",
        title: "Personalized Promotions",
        description: "Relevant offers that match basket and aisle context.",
        image: "/Promo.png",
        accent: "rgba(255,170,80,0.24)",
        accentStrong: "rgba(255,170,80,0.9)",
      },
      {
        id: "checkout",
        label: "Self checkout",
        title: "Self Checkout",
        description: "Scan, pay, and exit with a clean, verified flow.",
        image: "/Self_Checkout.png",
        accent: "rgba(160,120,255,0.24)",
        accentStrong: "rgba(160,120,255,0.9)",
      },
    ],
    []
  )

  const activeView = solutionShowcase[activeSolution]

  useEffect(() => {
    if (reduced || isPaused) return
    const id = window.setInterval(() => {
      setActiveSolution((value) => (value + 1) % solutionShowcase.length)
    }, 5200)
    return () => window.clearInterval(id)
  }, [reduced, isPaused, solutionShowcase.length])

  return (
    <section style={{ paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <SectionTitle
          eyebrow="The problem"
          title="Shopping Trips are Frustrating"
          subtitle="Queues, findability gaps, and unanswered questions slow every basket."
        />

        <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {problems.map((p) => (
            <ProblemCard key={p.title} title={p.title} note={p.note} icon={p.icon} tags={p.tags} kind={p.kind} />
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

        <div style={{ marginTop: 22 }}>
          <Card style={{ padding: 22 }}>
            <div style={{ display: "grid", gap: 14, justifyItems: "center", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(255,255,255,0.62)" }}>
                Solution views
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                {solutionShowcase.map((view, index) => {
                  const isActive = index === activeSolution
                  return (
                    <motion.button
                      key={view.id}
                      type="button"
                      onClick={() => setActiveSolution(index)}
                      aria-pressed={isActive}
                      whileHover={reduced ? undefined : { y: -1 }}
                      whileTap={reduced ? undefined : { scale: 0.98 }}
                      style={{
                        padding: "9px 14px",
                        borderRadius: 999,
                        border: isActive ? "1px solid rgba(255,255,255,0.30)" : "1px solid rgba(255,255,255,0.12)",
                        background: isActive ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.22)",
                        color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.62)",
                        fontSize: 12,
                        fontWeight: 900,
                        cursor: "pointer",
                        transition: "border 180ms ease, background 180ms ease, color 180ms ease, transform 180ms ease",
                      }}
                    >
                      {view.label}
                    </motion.button>
                  )
                })}
              </div>

              <motion.div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocusCapture={() => setIsPaused(true)}
                onBlurCapture={() => setIsPaused(false)}
                animate={reduced ? { opacity: 1 } : { y: [0, -6, 0] }}
                transition={reduced ? { duration: 0.01 } : { duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "min(920px, 100%)", marginTop: 6 }}
              >
                <div
                  style={{
                    padding: 6,
                    borderRadius: 28,
                    background: "linear-gradient(140deg, rgba(0,255,208,0.18), rgba(160,120,255,0.14), rgba(255,170,80,0.16))",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 38px 120px rgba(0,0,0,0.45)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 22,
                      overflow: "hidden",
                      background: "rgba(0,0,0,0.35)",
                      aspectRatio: "16 / 9",
                      minHeight: 340,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeView.id}
                        src={activeView.image}
                        alt={activeView.title}
                        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.99 }}
                        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                        exit={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.01 }}
                        transition={reduced ? { duration: 0.01 } : { duration: 0.45, ease: "easeOut" }}
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          display: "block",
                          zIndex: 1,
                        }}
                        loading="lazy"
                      />
                    </AnimatePresence>

                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.70))", zIndex: 2 }} />

                    <div
                      style={{
                        position: "absolute",
                        left: 14,
                        right: 14,
                        bottom: 14,
                        padding: "12px 14px",
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.16)",
                        background: "rgba(0,0,0,0.50)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        zIndex: 3,
                        textAlign: "left",
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 900, color: "rgba(255,255,255,0.95)" }}>{activeView.title}</div>
                      <div style={{ marginTop: 4, fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.72)" }}>{activeView.description}</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 8 }}>
                  {solutionShowcase.map((view, index) => (
                    <span
                      key={view.id}
                      style={{
                        width: index === activeSolution ? 48 : 24,
                        height: 4,
                        borderRadius: 999,
                        background: index === activeSolution ? view.accentStrong : "rgba(255,255,255,0.16)",
                        transition: "width 200ms ease, background 200ms ease",
                      }}
                    />
                  ))}
                </div>

                <div style={{ marginTop: 6, fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.56)", textAlign: "center" }}>
                  Auto-rotating preview. Hover to pause.
                </div>
              </motion.div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

function ProblemCard({
  title,
  note,
  icon,
  tags,
  kind,
}: {
  title: string
  note: string
  icon: React.ReactNode
  tags?: string[]
  kind: ProblemKind
}) {
  return (
    <Card style={{ padding: 14 }}>
      <ProblemVisual kind={kind} icon={icon} />

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

function ProblemVisual({ kind, icon }: { kind: ProblemKind; icon: React.ReactNode }) {
  const accent =
    kind === "checkout"
      ? "rgba(255,170,80,0.20)"
      : kind === "find"
      ? "rgba(0,255,208,0.18)"
      : "rgba(160,120,255,0.20)"

  return (
    <div
      style={{
        height: 120,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.12)",
        background: `radial-gradient(260px 120px at 12% 0%, ${accent}, rgba(0,0,0,0)), rgba(0,0,0,0.18)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.55))" }} />
      <div
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          width: 38,
          height: 38,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.24)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.90)",
        }}
      >
        {icon}
      </div>

      {kind === "checkout" ? (
        <div style={{ position: "absolute", left: 14, right: 14, top: 54, display: "grid", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: i > 3 ? "rgba(255,170,80,0.55)" : "rgba(255,255,255,0.16)",
                }}
              />
            ))}
            <span style={{ width: 40, height: 10, borderRadius: 999, background: "rgba(255,170,80,0.18)", border: "1px solid rgba(255,170,80,0.35)" }} />
          </div>
          <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{ width: "72%", height: "100%", borderRadius: 999, background: "linear-gradient(90deg, rgba(255,170,80,0.12), rgba(255,170,80,0.45))" }} />
          </div>
        </div>
      ) : kind === "find" ? (
        <div style={{ position: "absolute", left: 14, right: 14, top: 48, display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(30px, 1fr))", gap: 6 }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <span
                key={i}
                style={{
                  height: 12,
                  borderRadius: 6,
                  background: i === 6 || i === 11 ? "rgba(0,255,208,0.40)" : "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              />
            ))}
          </div>
          <div style={{ height: 6, borderRadius: 999, background: "rgba(0,255,208,0.12)" }}>
            <div style={{ width: "54%", height: "100%", borderRadius: 999, background: "linear-gradient(90deg, rgba(0,255,208,0.10), rgba(0,255,208,0.45))" }} />
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", left: 14, right: 14, top: 52, display: "grid", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  background: i === 0 ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              />
            ))}
            <span style={{ marginLeft: "auto", padding: "2px 8px", borderRadius: 999, border: "1px solid rgba(160,120,255,0.40)", background: "rgba(160,120,255,0.16)", fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.80)" }}>
              Help unavailable
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)" }}>
            <div style={{ width: "38%", height: "100%", borderRadius: 999, background: "linear-gradient(90deg, rgba(160,120,255,0.12), rgba(160,120,255,0.45))" }} />
          </div>
        </div>
      )}
    </div>
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
