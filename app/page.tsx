"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, BarChart3, CreditCard, MapPin, Mic, ShoppingCart, Sparkles } from "lucide-react"
import { Manrope, Space_Grotesk } from "next/font/google"
import {
  AnimatedBackdrop,
  Button,
  Pill,
  ProblemStorySection,
  HowItWorksSection,
  ProofSection,
  FaqSection,
  CtaSection,
  Footer,
  clamp,
  usePrefersReducedMotion,
  TryCartHeroCard,
} from "@/components/landing"

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })
const space = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] })

export default function Page() {
  const reduced = usePrefersReducedMotion()
  const shouldAnimate = !reduced
  const rootRef = useRef<HTMLDivElement | null>(null)

  const [mx, setMx] = useState(0.5)
  const [my, setMy] = useState(0.5)
  const [showDemo, setShowDemo] = useState(false)

  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 220, damping: 30 })

  const heroShift = useTransform(scrollYProgress, [0, 0.22], [0, 24])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.62])

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const mxSpring = useSpring(mouseX, { stiffness: 180, damping: 26 })
  const mySpring = useSpring(mouseY, { stiffness: 180, damping: 26 })

  useEffect(() => {
    const unsubX = mxSpring.on("change", (v) => setMx(clamp(v, 0, 1)))
    const unsubY = mySpring.on("change", (v) => setMy(clamp(v, 0, 1)))
    return () => {
      unsubX()
      unsubY()
    }
  }, [mxSpring, mySpring])

  const wrap: React.CSSProperties = {
    width: "min(1160px, calc(100% - 32px))",
    margin: "0 auto",
  }

  const theme = {
    "--ink": "rgba(255,255,255,0.94)",
    "--muted": "rgba(255,255,255,0.66)",
    "--panel": "rgba(255,255,255,0.05)",
    "--panel-strong": "rgba(255,255,255,0.10)",
    "--line": "rgba(255,255,255,0.14)",
    "--accent": "rgba(0,255,208,0.90)",
    "--accent-2": "rgba(88,130,255,0.86)",
    "--accent-3": "rgba(255,170,80,0.86)",
  } as React.CSSProperties

  const navButton: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: space.style.fontFamily,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "var(--muted)",
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid var(--line)",
    background: "var(--panel)",
    cursor: "pointer",
  }

  const kicker: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: space.style.fontFamily,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "var(--muted)",
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid var(--line)",
    background: "rgba(0,0,0,0.35)",
  }

  const heroTitle: React.CSSProperties = {
    marginTop: 18,
    fontSize: "clamp(38px, 4.3vw, 64px)",
    lineHeight: 1.04,
    letterSpacing: -1.2,
    fontWeight: 700,
    fontFamily: space.style.fontFamily,
    color: "var(--ink)",
    textShadow: "0 20px 60px rgba(0,0,0,0.45)",
  }

  const heroAccent: React.CSSProperties = {
    display: "block",
    backgroundImage: "linear-gradient(120deg, var(--accent), var(--accent-2), var(--accent-3))",
    WebkitBackgroundClip: "text",
    color: "transparent",
  }

  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

  const introContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  }

  const introItem = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  }

  const onMove = (e: React.MouseEvent) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width)
    mouseY.set((e.clientY - r.top) / r.height)
  }

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div
      ref={rootRef}
      onMouseMove={onMove}
      style={{
        minHeight: "100vh",
        color: "var(--ink)",
        fontFamily: manrope.style.fontFamily,
        ...theme,
      }}
    >
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: 3,
          width: "100%",
          transformOrigin: "0% 50%",
          scaleX: progressScale,
          background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
          zIndex: 60,
          boxShadow: "0 0 30px rgba(0,255,208,0.16)",
        }}
      />

      <div style={{ position: "relative" }}>
        <AnimatedBackdrop mx={mx} my={my} reduced={reduced} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ position: "sticky", top: 0, zIndex: 30, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ background: "rgba(0,0,0,0.34)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}>
              <div style={{ ...wrap, padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 12, border: "1px solid var(--line)", background: "var(--panel)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShoppingCart size={18} style={{ opacity: 0.92 }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                    <div style={{ fontWeight: 700, letterSpacing: 0.2, fontFamily: space.style.fontFamily }}>Vela</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>AI smart cart</div>
                  </div>
                </div>

                <div style={{ flex: 1 }} />

                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <Button
                    onClick={() => setShowDemo(true)}
                    style={{
                      background: "linear-gradient(120deg, var(--accent), var(--accent-2))",
                      boxShadow: "0 12px 38px rgba(0,255,208,0.25)",
                      padding: "12px 18px",
                      fontWeight: 800,
                    }}
                  >
                    <span>Request demo</span>
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <motion.section id="story" style={{ paddingTop: 20, paddingBottom: 44, opacity: heroOpacity, y: heroShift }}>
            <div style={wrap}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "center" }}>
                <motion.div
                  variants={introContainer}
                  initial={shouldAnimate ? "hidden" : false}
                  animate={shouldAnimate ? "show" : undefined}
                >
                  <motion.div variants={introItem} style={kicker}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 18px rgba(0,255,208,0.45)" }} />
                    <span>Cart intelligence in aisle</span>
                  </motion.div>

                  <motion.div variants={introItem} style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Pill icon={<Mic size={14} />} text="Assistant" />
                    <Pill icon={<MapPin size={14} />} text="Aisle guidance" />
                    <Pill icon={<Sparkles size={14} />} text="Smart promos" />
                    <Pill icon={<CreditCard size={14} />} text="Self checkout" />
                  </motion.div>

                  <motion.h1 variants={introItem} style={heroTitle}>
                    <span>AI Shopping Cart</span>
                    <span style={heroAccent}>Assistant.</span>
                  </motion.h1>

                  <motion.p variants={introItem} style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: "var(--muted)", maxWidth: 620, fontWeight: 600 }}>
                    Answers. Promos. Pay.
                  </motion.p>

                  <motion.div variants={introItem} style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Button
                      onClick={() => setShowDemo(true)}
                      style={{
                        background: "linear-gradient(120deg, var(--accent), var(--accent-2))",
                        boxShadow: "0 16px 46px rgba(0,255,208,0.26)",
                        padding: "14px 20px",
                        fontSize: 15,
                        fontWeight: 800,
                      }}
                    >
                      <span>Get a demo</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>

                  <motion.div variants={introItem} style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                    <HeroMetric label="Answers in aisle" value="Ask" icon={<Mic size={18} />} tone="var(--accent)" />
                    <HeroMetric label="Promos that help" value="Save" icon={<Sparkles size={18} />} tone="var(--accent-2)" />
                    <HeroMetric label="Self Checkout" value="Pay" icon={<CreditCard size={18} />} tone="var(--accent-3)" />
                  </motion.div>

                  <motion.div variants={introItem} style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: 13, fontWeight: 650 }}>
                      <BarChart3 size={16} style={{ opacity: 0.9 }} />
                      <span>Store dashboards</span>
                    </div>
                    <div style={{ width: 1, height: 14, background: "var(--line)" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: 13, fontWeight: 650 }}>
                      <Sparkles size={16} style={{ opacity: 0.9 }} />
                      <span>Assistant driven journey</span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  transition={shouldAnimate ? { duration: 0.8, ease: easeOut, delay: 0.2 } : undefined}
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "absolute", inset: 12, background: "radial-gradient(420px 240px at 60% 40%, rgba(0,255,208,0.18), rgba(0,0,0,0))", filter: "blur(26px)" }} />
                  <TryCartHeroCard />
                </motion.div>
              </div>
            </div>
          </motion.section>

          <HeroImageFeature reduced={reduced} wrap={wrap} />
          <VideoFeature reduced={reduced} wrap={wrap} />
          <ProblemStorySection />
          <HowItWorksSection />
          <ProofSection />
          <FaqSection />
          <CtaSection reduced={reduced} onRequestDemo={() => setShowDemo(true)} />
          <Footer />
        </div>
      </div>
      <AnimatePresence>
        {showDemo ? <DemoModal key="demo-modal" onClose={() => setShowDemo(false)} /> : null}
      </AnimatePresence>
    </div>
  )
}

function HeroMetric({ label, value, icon, tone }: { label: string; value: string; icon: React.ReactNode; tone?: string }) {
  const metricTone = tone ?? "var(--accent)"
  return (
    <div style={{ padding: 16, borderRadius: 20, border: "1px solid var(--line)", background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ width: 44, height: 44, borderRadius: 16, border: "1px solid var(--line)", background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: metricTone, boxShadow: "0 0 26px rgba(0,0,0,0.25)" }}>
          {icon}
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", letterSpacing: -0.4, fontFamily: space.style.fontFamily }}>{value}</div>
      </div>

      <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>{label}</div>
    </div>
  )
}

function VideoFeature({ reduced, wrap }: { reduced: boolean; wrap: React.CSSProperties }) {
  const floatAnimation = reduced ? {} : { y: [0, -10, 0] }
  const floatTransition = reduced ? { duration: 0.01 } : { duration: 7, repeat: Infinity, ease: "easeInOut" as const }
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(true)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section style={{ paddingTop: 12, paddingBottom: 32 }}>
      <div style={wrap}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "center" }}>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: "clamp(22px, 2.6vw, 32px)", fontWeight: 800, color: "var(--ink)", lineHeight: 1.08 }}>
              See Vela guide, suggest, and checkout on the cart screen.
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", fontWeight: 600 }}>
              Live cart footage paired with aisle-aware answers, smart promos, and on-cart checkout.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Pill icon={<Mic size={14} />} text="In-aisle voice" />
              <Pill icon={<Sparkles size={14} />} text="Context promos" />
              <Pill icon={<CreditCard size={14} />} text="Cart checkout" />
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 13, fontWeight: 700 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)" }} />
                Real-time cart UI, no kiosk detours.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 13, fontWeight: 700 }}>
                <Sparkles size={14} />
                Personalized offers as you roll.
              </div>
            </div>
          </div>

          <motion.div animate={floatAnimation} transition={floatTransition} style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -18, background: "linear-gradient(120deg, rgba(0,255,208,0.08), rgba(160,120,255,0.08))" }} />
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 28,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "linear-gradient(120deg, rgba(0,0,0,0.72), rgba(20,24,40,0.65))",
                boxShadow: "0 28px 110px rgba(0,0,0,0.55)",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))" }} />

              <video
                src="/Shopping_Assistant.mp4"
                autoPlay
                muted
                loop
                playsInline
                ref={videoRef}
                style={{
                  width: "100%",
                  display: "block",
                  aspectRatio: "4 / 3",
                  maxHeight: 520,
                  objectFit: "cover",
                  opacity: 0.96,
                }}
                onEnded={() => setPlaying(false)}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.78))",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: 18,
                  bottom: 18,
                  display: "grid",
                  gap: 8,
                  maxWidth: 320,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.16)",
                    background: "rgba(0,0,0,0.35)",
                    width: "fit-content",
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: 999, background: "rgba(0,255,208,0.9)", boxShadow: "0 0 18px rgba(0,255,208,0.45)" }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.82)", letterSpacing: 0.2 }}>Live cart footage</span>
                </div>

                <div style={{ fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,0.92)" }}>Vela in aisle</div>
                <div style={{ display: "none" }}>
                  AI answers, aisle-aware promos, and self checkout all running on-cart—no kiosks, no detours.
                </div>
              </div>

              <button
                type="button"
                onClick={togglePlay}
                style={{
                  position: "absolute",
                  right: 16,
                  bottom: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(0,0,0,0.32)",
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 900,
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {playing ? "Pause" : "Play"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DemoModal({ onClose }: { onClose: () => void }) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const doSubmit = async () => {
      setSubmitting(true)
      setError(null)
      try {
        const res = await fetch("/api/demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email }),
        })
        const text = await res.text()
        let data: any = null
        try {
          data = JSON.parse(text)
        } catch {
          data = { ok: false, message: `Request failed (HTTP ${res.status})` }
        }
        if (!res.ok || !data?.ok) {
          throw new Error(data?.message || `Request failed (HTTP ${res.status})`)
        }
        setSubmitted(true)
      } catch (err: any) {
        setError(err?.message || "Something went wrong")
      } finally {
        setSubmitting(false)
      }
    }
    doSubmit()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 200,
      }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "min(520px, 100%)",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "linear-gradient(140deg, rgba(0,255,208,0.12), rgba(88,130,255,0.10), rgba(0,0,0,0.72))",
          boxShadow: "0 40px 140px rgba(0,0,0,0.55)",
          overflow: "hidden",
          position: "relative",
        }}
      >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(420px 260px at 18% 0%, rgba(0,255,208,0.18), transparent)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(420px 260px at 82% 0%, rgba(160,120,255,0.16), transparent)" }} />

        <div style={{ position: "relative", padding: 22, display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(0,0,0,0.22)", color: "rgba(255,255,255,0.86)", fontSize: 12, fontWeight: 900, letterSpacing: 0.3 }}>
              <Sparkles size={14} />
              <span>Live cart demo</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              style={{
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(0,0,0,0.26)",
                color: "rgba(255,255,255,0.82)",
                borderRadius: 12,
                padding: "6px 10px",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Close
            </button>
          </div>

          <div style={{ fontSize: 24, fontWeight: 980, color: "rgba(255,255,255,0.95)", letterSpacing: -0.4 }}>
            See the cart in action
          </div>
          <div style={{ fontSize: 14, fontWeight: 760, color: "rgba(255,255,255,0.76)" }}>
            Share your details and we’ll send a live demo slot.
          </div>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              style={{
                display: "grid",
                gap: 12,
                padding: "16px 14px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "linear-gradient(140deg, rgba(0,255,208,0.16), rgba(88,130,255,0.12), rgba(0,0,0,0.55))",
              }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,0.86)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(0,255,208,0.9)", boxShadow: "0 0 16px rgba(0,255,208,0.45)" }} />
                <span>Request received</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 980, color: "rgba(255,255,255,0.95)" }}>Thanks - you're in.</div>
              <div style={{ fontSize: 14, fontWeight: 750, color: "rgba(255,255,255,0.74)" }}>
                You'll get a live demo slot shortly.
              </div>
              <Button
                onClick={onClose}
                style={{
                  justifyContent: "center",
                  background: "linear-gradient(120deg, var(--accent), var(--accent-2))",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 18px 60px rgba(0,255,208,0.24)",
                  padding: "12px 16px",
                  fontSize: 14,
                  fontWeight: 850,
                  width: "100%",
                }}
              >
                <span>Done</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
              <input
                type="text"
                required
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.28)",
                  color: "white",
                  fontWeight: 800,
                }}
              />
              <input
                type="email"
                required
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.28)",
                  color: "white",
                  fontWeight: 800,
                }}
              />
              <Button
                type="submit"
                style={{
                  justifyContent: "center",
                  background: "linear-gradient(120deg, var(--accent), var(--accent-2))",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 18px 60px rgba(0,255,208,0.24)",
                  padding: "13px 16px",
                  fontSize: 15,
                  fontWeight: 850,
                  width: "100%",
                  opacity: submitting ? 0.8 : 1,
                  cursor: submitting ? "wait" : "pointer",
                }}
                disabled={submitting}
              >
                <span>{submitting ? "Sending..." : "Get my demo"}</span>
                <ArrowRight size={16} />
              </Button>
              {error ? (
                <div style={{ color: "rgba(255,120,120,0.9)", fontWeight: 800, fontSize: 12 }}>{error}</div>
              ) : null}
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function HeroImageFeature({ reduced, wrap }: { reduced: boolean; wrap: React.CSSProperties }) {
  const floatAnimation = reduced ? {} : { y: [0, -8, 0] }
  const floatTransition = reduced ? { duration: 0.01 } : { duration: 6, repeat: Infinity, ease: "easeInOut" as const }

  return (
    <section style={{ paddingTop: 12, paddingBottom: 52 }}>
      <div style={wrap}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
            alignItems: "center",
          }}
        >
          <motion.div animate={floatAnimation} transition={floatTransition} style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -18, background: "radial-gradient(560px 360px at 32% 18%, rgba(0,255,208,0.22), rgba(0,0,0,0))", filter: "blur(30px)" }} />
            <div
              style={{
                position: "relative",
                borderRadius: 34,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "var(--panel)",
                boxShadow: "0 46px 160px rgba(0,0,0,0.58), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              <img
                src="/1st_Image.png"
                alt="Smart cart experience in aisle"
                style={{
                  width: "100%",
                  display: "block",
                  aspectRatio: "4 / 3",
                  maxHeight: 560,
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                  transform: "scale(1)",
                }}
                loading="lazy"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.22))" }} />
              <div style={{ position: "absolute", inset: 12, borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)", pointerEvents: "none" }} />

              <div style={{ position: "absolute", left: 14, top: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Pill icon={<Mic size={14} />} text="Ask in aisle" />
                <Pill icon={<Sparkles size={14} />} text="Smart promos" />
              </div>

            </div>

            <div
              style={{
                marginTop: 14,
                padding: "12px 14px",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.26)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                boxShadow: "0 12px 60px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 750, color: "var(--ink)" }}>Cart screen, real time</div>
              <div style={{ marginTop: 4, fontSize: 12, fontWeight: 650, color: "var(--muted)" }}>
                Live location, answers, and promos while you shop.
              </div>
            </div>
          </motion.div>

          <div style={{ display: "grid", gap: 12 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: space.style.fontFamily,
                letterSpacing: 1.1,
                textTransform: "uppercase",
                color: "var(--muted)",
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid var(--line)",
                background: "rgba(0,0,0,0.30)",
                width: "fit-content",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />
              <span>In-aisle experience</span>
            </div>

            <div style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 700, color: "var(--ink)", fontFamily: space.style.fontFamily, lineHeight: 1.08 }}>
              Attachable AI Powered Device
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)", fontWeight: 600, maxWidth: 520 }}>
              Turn any cart into a smart cart with a guided experience with precise answers, personalized offers, and self checkout built in.
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Pill icon={<MapPin size={14} />} text="Live location" />
              <Pill icon={<CreditCard size={14} />} text="Self checkout" />
              <Pill icon={<BarChart3 size={14} />} text="Retail metrics" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
