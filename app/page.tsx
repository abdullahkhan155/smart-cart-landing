"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, BarChart3, CreditCard, MapPin, Mic, ShoppingCart, Sparkles } from "lucide-react"
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

export default function Page() {
  const reduced = usePrefersReducedMotion()
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
    width: "min(1120px, calc(100% - 40px))",
    margin: "0 auto",
  }

  const navLink: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 980,
    color: "rgba(255,255,255,0.70)",
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.02)",
    cursor: "pointer",
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
        color: "white",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
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
          background: "linear-gradient(90deg, rgba(0,255,208,0.70), rgba(160,120,255,0.65), rgba(255,170,80,0.60))",
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
                  <div style={{ width: 34, height: 34, borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShoppingCart size={18} style={{ opacity: 0.92 }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                    <div style={{ fontWeight: 980, letterSpacing: 0.2 }}>CartNova</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.62)", fontWeight: 900 }}>AI smart cart</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={navLink} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Story</span>
                  <span style={navLink} onClick={() => goTo("how")}>How</span>
                  <span style={navLink} onClick={() => goTo("proof")}>Proof</span>
                  <span style={navLink} onClick={() => goTo("cta")}>Demo</span>
                </div>

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

          <motion.section style={{ paddingTop: 78, paddingBottom: 56, opacity: heroOpacity, y: heroShift }}>
            <div style={wrap}>
              <div style={{ display: "grid", gridTemplateColumns: "1.02fr 0.98fr", gap: 24, alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Pill icon={<Mic size={14} />} text="Assistant" />
                    <Pill icon={<MapPin size={14} />} text="Aisle guidance" />
                    <Pill icon={<Sparkles size={14} />} text="Smart promos" />
                    <Pill icon={<CreditCard size={14} />} text="Self checkout" />
                  </div>

                  <h1 style={{ marginTop: 18, fontSize: 58, lineHeight: 1.02, letterSpacing: -1, fontWeight: 980, color: "rgba(255,255,255,0.96)", textShadow: "0 20px 60px rgba(0,0,0,0.45)" }}>
                    Ask the cart. Scan. Pay. Go.
                  </h1>

                  <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", maxWidth: 620, fontWeight: 850 }}>
                    Quick answers in aisle, personalized promos at the right moment, and checkout on the cart so the trip stays smooth.
                  </p>

                  <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Button onClick={() => goTo("how")}>
                      <span>See how it works</span>
                      <ArrowRight size={16} />
                    </Button>
                    <Button variant="ghost" onClick={() => goTo("cta")}>
                      <span>Get a demo</span>
                      <ArrowRight size={16} style={{ opacity: 0.9 }} />
                    </Button>
                  </div>

                  <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                    <HeroMetric label="Answers in aisle" value="Ask" icon={<Mic size={18} />} />
                    <HeroMetric label="Promos that help" value="Save" icon={<Sparkles size={18} />} />
                    <HeroMetric label="Checkout finish" value="Pay" icon={<CreditCard size={18} />} />
                  </div>

                  <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.70)", fontSize: 13, fontWeight: 950 }}>
                      <BarChart3 size={16} style={{ opacity: 0.9 }} />
                      <span>Store dashboards</span>
                    </div>
                    <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.14)" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.70)", fontSize: 13, fontWeight: 950 }}>
                      <Sparkles size={16} style={{ opacity: 0.9 }} />
                      <span>Assistant driven journey</span>
                    </div>
                  </div>
                </div>

                <div>
                  <HeroShowcase />
                </div>
              </div>
            </div>
          </motion.section>

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

function HeroMetric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div style={{ padding: 16, borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ width: 44, height: 44, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <div style={{ fontSize: 28, fontWeight: 980, color: "rgba(255,255,255,0.94)", letterSpacing: -0.4 }}>{value}</div>
      </div>

      <div style={{ marginTop: 8, fontSize: 13, fontWeight: 950, color: "rgba(255,255,255,0.68)" }}>{label}</div>
    </div>
  )
}
