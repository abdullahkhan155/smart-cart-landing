"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, BarChart3, CreditCard, MapPin, Mic, ShoppingCart, Sparkles } from "lucide-react"
import { Manrope, Space_Grotesk } from "next/font/google"
import {
  AnimatedBackdrop,
  Button,
  HeroShowcase,
  Pill,
  ProblemStorySection,
  HowItWorksSection,
  ProofSection,
  FaqSection,
  CtaSection,
  Footer,
  clamp,
  usePrefersReducedMotion,
} from "@/components/landing"

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })
const space = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] })

export default function Page() {
  const reduced = usePrefersReducedMotion()
  const shouldAnimate = !reduced
  const rootRef = useRef<HTMLDivElement | null>(null)

  const [mx, setMx] = useState(0.5)
  const [my, setMy] = useState(0.5)

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

                <nav style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }} aria-label="Primary">
                  <button style={navButton} type="button" onClick={() => goTo("story")}>Story</button>
                  <button style={navButton} type="button" onClick={() => goTo("how")}>How</button>
                  <button style={navButton} type="button" onClick={() => goTo("proof")}>Proof</button>
                  <button style={navButton} type="button" onClick={() => goTo("cta")}>Demo</button>
                </nav>

                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <Button variant="ghost" onClick={() => goTo("how")}>
                    <Mic size={16} />
                    <span>See assistant</span>
                  </Button>
                  <Button onClick={() => goTo("cta")}>
                    <span>Request demo</span>
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <motion.section id="story" style={{ paddingTop: 78, paddingBottom: 56, opacity: heroOpacity, y: heroShift }}>
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
                    <span>AI cart.</span>
                    <span style={heroAccent}>Guided checkout.</span>
                  </motion.h1>

                  <motion.p variants={introItem} style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: "var(--muted)", maxWidth: 620, fontWeight: 600 }}>
                    Answers. Promos. Pay.
                  </motion.p>

                  <motion.div variants={introItem} style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Button onClick={() => goTo("how")}>
                      <span>See how it works</span>
                      <ArrowRight size={16} />
                    </Button>
                    <Button variant="ghost" onClick={() => goTo("cta")}>
                      <span>Get a demo</span>
                      <ArrowRight size={16} style={{ opacity: 0.9 }} />
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
                  <HeroShowcase />
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
          <CtaSection reduced={reduced} />
          <Footer />
        </div>
      </div>
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
  const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1]
  const floatAnimation = reduced ? {} : { y: [0, -10, 0] }
  const floatTransition = reduced ? { duration: 0.01 } : { duration: 7, repeat: Infinity, ease: easeInOut }

  return (
    <section style={{ paddingTop: 12, paddingBottom: 58 }}>
      <div style={wrap}>
        <motion.div animate={floatAnimation} transition={floatTransition} style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: -18, background: "radial-gradient(520px 260px at 12% 10%, rgba(0,255,208,0.16), rgba(0,0,0,0))", filter: "blur(28px)" }} />
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "30px 30px 46px 30px",
              clipPath: "inset(0 round 30px 30px 46px 30px)",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "linear-gradient(120deg, rgba(0,0,0,0.72), rgba(20,24,40,0.65))",
              boxShadow: "0 28px 110px rgba(0,0,0,0.55)",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 320px at 18% 0%, rgba(0,255,208,0.14), rgba(0,0,0,0))" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(520px 260px at 84% 0%, rgba(160,120,255,0.12), rgba(0,0,0,0))" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0))" }} />

            <video
              src="/Shopping_Assistant.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                maxHeight: 420,
                objectFit: "cover",
                display: "block",
                opacity: 0.94,
              }}
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
                gap: 6,
                maxWidth: 300,
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
          </div>
          <div style={{ marginTop: 16, display: "grid", gap: 10, maxWidth: 720 }}>
            <div style={{ fontSize: "clamp(20px, 2.3vw, 30px)", fontWeight: 800, color: "var(--ink)", lineHeight: 1.08 }}>
              See Vela guide, suggest, and checkout on the cart screen.
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", fontWeight: 600 }}>
              AI answers, aisle promos, and self checkout on-cart.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Pill icon={<Mic size={14} />} text="In-aisle voice" />
              <Pill icon={<Sparkles size={14} />} text="Context promos" />
              <Pill icon={<CreditCard size={14} />} text="Cart checkout" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HeroImageFeature({ reduced, wrap }: { reduced: boolean; wrap: React.CSSProperties }) {
  const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1]
  const floatAnimation = reduced ? {} : { y: [0, -8, 0] }
  const floatTransition = reduced ? { duration: 0.01 } : { duration: 6, repeat: Infinity, ease: easeInOut }

  return (
    <section style={{ paddingTop: 6, paddingBottom: 78 }}>
      <div style={wrap}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 26, alignItems: "center" }}>
          <motion.div animate={floatAnimation} transition={floatTransition} style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -12, background: "radial-gradient(380px 240px at 30% 20%, rgba(0,255,208,0.18), rgba(0,0,0,0))", filter: "blur(24px)" }} />
            <div
              style={{
                position: "relative",
                borderRadius: 26,
                overflow: "hidden",
                border: "1px solid var(--line)",
                background: "var(--panel)",
                boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
              }}
            >
              <img
                src="/1st_Image.png"
                alt="Smart cart experience in aisle"
                style={{ width: "100%", height: "100%", maxHeight: 360, objectFit: "cover", display: "block" }}
                loading="lazy"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.62))" }} />

              <div style={{ position: "absolute", left: 14, top: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Pill icon={<Mic size={14} />} text="Ask in aisle" />
                <Pill icon={<Sparkles size={14} />} text="Smart promos" />
              </div>

              <div
                style={{
                  position: "absolute",
                  left: 14,
                  bottom: 14,
                  right: 14,
                  padding: "10px 12px",
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Cart screen, real time</div>
                <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>
                  Live location, answers, and promos while you shop.
                </div>
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
