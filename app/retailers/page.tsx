"use client"

import React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, BarChart3, Boxes, CreditCard, Gauge, Link2, MapPin, Megaphone, Mic, ShieldCheck, ShoppingCart, Sparkles, TrendingUp, Users } from "lucide-react"
import { Manrope, Space_Grotesk } from "next/font/google"
import { AnimatedBackdrop, Button, Card, CtaSection, HowItWorksSection, Pill, SectionTitle, TryCartHeroCard, clamp, usePrefersReducedMotion } from "@/components/landing"
import { RetailBenefitsShowcase } from "@/components/retailers/benefits-showcase"
import { RetailersFaqSection } from "@/components/retailers/faq"
import { RetailersDemoModal } from "@/components/retailers/demo-modal"
import { RetailersFooter } from "@/components/retailers/footer"

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })
const space = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] })

export default function RetailersPage() {
  const reduced = usePrefersReducedMotion()
  const shouldAnimate = !reduced
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const [mx, setMx] = React.useState(0.5)
  const [my, setMy] = React.useState(0.5)
  const [showDemo, setShowDemo] = React.useState(false)

  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 220, damping: 30 })
  const heroShift = useTransform(scrollYProgress, [0, 0.22], [0, 22])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.68])

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const mxSpring = useSpring(mouseX, { stiffness: 180, damping: 26 })
  const mySpring = useSpring(mouseY, { stiffness: 180, damping: 26 })

  React.useEffect(() => {
    const unsubX = mxSpring.on("change", (v) => setMx(clamp(v, 0, 1)))
    const unsubY = mySpring.on("change", (v) => setMy(clamp(v, 0, 1)))
    return () => {
      unsubX()
      unsubY()
    }
  }, [mxSpring, mySpring])

  const onMove = (e: React.MouseEvent) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width)
    mouseY.set((e.clientY - r.top) / r.height)
  }

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
    fontWeight: 800,
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
    fontWeight: 800,
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
    fontWeight: 720,
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

  const benefits = React.useMemo(
    () => [
      {
        title: "Increased shopper satisfaction & loyalty",
        desc: "Concierge-style help on-cart: answers, swaps, confidence at the shelf.",
        icon: <Users size={18} />,
        tone: "rgba(0,255,208,0.9)",
        image: "/AI_Screen.png",
        bullets: ["Reduce decision friction in aisle", "Improve repeat trips and loyalty", "Delight without adding labor"],
      },
      {
        title: "Bigger shopping baskets",
        desc: "Location‑aware promos show up at the right shelf, not in a noisy banner.",
        icon: <TrendingUp size={18} />,
        tone: "rgba(255,170,80,0.92)",
        image: "/Promo.png",
        bullets: ["Personalized aisle + shelf offers", "Higher attach and basket completion", "Less promo noise, more uplift"],
      },
      {
        title: "New business models (media + data)",
        desc: "Cart media with closed-loop measurement for brands and your team.",
        icon: <Megaphone size={18} />,
        tone: "rgba(255,120,120,0.9)",
        image: "/1st_Image.png",
        bullets: ["Sponsored placements that feel helpful", "Measure impact on real baskets", "Omnichannel insights from the aisle"],
      },
      {
        title: "Mitigated shrinkage",
        desc: "Verification and exception routing that keep trips fast while protecting margin.",
        icon: <ShieldCheck size={18} />,
        tone: "rgba(88,130,255,0.75)",
        image: "/Security.png",
        bullets: ["Checks only when signals disagree", "Quiet staff workflows for exceptions", "Protect margin while staying fast"],
      },
    ],
    []
  )

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
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 12, border: "1px solid var(--line)", background: "var(--panel)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShoppingCart size={18} style={{ opacity: 0.92 }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                    <div style={{ fontWeight: 800, letterSpacing: 0.2, fontFamily: space.style.fontFamily }}>Vela</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 650 }}>For retailers</div>
                  </div>
                </Link>

                <div style={{ flex: 1 }} />

                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <Link
                    href="/"
                    style={{
                      ...navButton,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      textDecoration: "none",
                      background: "linear-gradient(120deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
                      border: "1px solid rgba(255,255,255,0.30)",
                      color: "rgba(255,255,255,0.94)",
                      boxShadow: "0 12px 32px rgba(88,130,255,0.20)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    For shoppers
                  </Link>
                  <Button
                    onClick={() => setShowDemo(true)}
                    style={{
                      background: "linear-gradient(120deg, rgba(66,214,255,0.95), rgba(160,120,255,0.95))",
                      boxShadow: "0 14px 40px rgba(66,214,255,0.32)",
                      padding: "12px 18px",
                      fontWeight: 850,
                    }}
                  >
                    <span>Get my demo</span>
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <motion.section id="top" style={{ paddingTop: 20, paddingBottom: 44, opacity: heroOpacity, y: heroShift }}>
            <div style={wrap}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "center" }}>
                <motion.div
                  initial={shouldAnimate ? { opacity: 0, y: 16 } : false}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={kicker}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 18px rgba(0,255,208,0.45)" }} />
                    <span>Built for modern retailers</span>
                  </div>

                  <h1 style={heroTitle}>
                    <span>AI Shopping Cart</span>
                    <span style={heroAccent}>for Retail</span>
                  </h1>

                  <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: "var(--muted)", maxWidth: 640, fontWeight: 650 }}>
                    Turn every trip into guided shopping + on-cart checkout—while improving store efficiency, unlocking new revenue, and keeping loss prevention tight.
                  </p>

                  <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Button
                      onClick={() => setShowDemo(true)}
                      style={{
                        background: "linear-gradient(120deg, var(--accent), var(--accent-2))",
                        boxShadow: "0 16px 46px rgba(0,255,208,0.26)",
                        padding: "14px 20px",
                        fontSize: 15,
                        fontWeight: 850,
                      }}
                    >
                      <span>Get my demo</span>
                      <ArrowRight size={16} />
                    </Button>
                    <Button onClick={() => goTo("benefits")} variant="ghost" style={{ padding: "14px 18px", fontWeight: 850 }}>
                      <span>Explore benefits</span>
                    </Button>
                  </div>

                  <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                    <RetailerMetric label="Trip satisfaction" value="Delight" icon={<Users size={18} />} tone="var(--accent)" />
                    <RetailerMetric label="Basket growth" value="Lift" icon={<TrendingUp size={18} />} tone="var(--accent-3)" />
                    <RetailerMetric label="Ops efficiency" value="Flow" icon={<Gauge size={18} />} tone="var(--accent-2)" />
                  </div>
                </motion.div>

                <motion.div
                  initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "absolute", inset: 12, background: "radial-gradient(420px 240px at 60% 40%, rgba(0,255,208,0.18), rgba(0,0,0,0))", filter: "blur(26px)" }} />
                  <TryCartHeroCard />
                </motion.div>
              </div>
            </div>
          </motion.section>

          <section style={{ paddingTop: 20, paddingBottom: 40 }}>
            <div style={wrap}>
              <RetailExperienceSection />
            </div>
          </section>

          <section id="how" style={{ paddingTop: 40, paddingBottom: 10 }}>
            <div style={wrap}>
              <HowItWorksSection />
            </div>
          </section>

          <section id="benefits" style={{ paddingTop: 70, paddingBottom: 86 }}>
            <div style={wrap}>
              <SectionTitle
                eyebrow="Outcomes"
                title="Retailer-grade benefits, end to end"
                subtitle="Designed to improve the in-store experience while keeping the store easier to run and more profitable—without changing your brand voice."
              />

              <div style={{ marginTop: 26 }}>
                <RetailBenefitsShowcase items={benefits} />
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <Pill icon={<Boxes size={14} />} text="Inventory-friendly signals" />
                <Pill icon={<BarChart3 size={14} />} text="Closed-loop measurement" />
                <Pill icon={<ShieldCheck size={14} />} text="Shrink-aware flows" />
              </div>
            </div>
          </section>

          <section id="insights" style={{ paddingTop: 10, paddingBottom: 86 }}>
            <div style={wrap}>
              <RetailInsightsSection />
            </div>
          </section>

          <section style={{ paddingTop: 20, paddingBottom: 40 }}>
            <div style={wrap}>
              <Card style={{ padding: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, alignItems: "center" }}>
                  <div style={{ display: "grid", gap: 10 }}>
                    <div style={{ fontSize: "clamp(24px, 2.8vw, 32px)", fontWeight: 980, color: "rgba(255,255,255,0.95)" }}>
                      See the shopper experience in aisle.
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", fontWeight: 720 }}>
                      Live cart footage with aisle-aware answers, context promos, and on-cart checkout. Perfect for sharing with stakeholders or looping in a store lab.
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <Pill icon={<Mic size={14} />} text="In-aisle voice" />
                      <Pill icon={<Sparkles size={14} />} text="Context promos" />
                      <Pill icon={<CreditCard size={14} />} text="Cart checkout" />
                    </div>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      borderRadius: 22,
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.10)",
                      background: "rgba(0,0,0,0.32)",
                      boxShadow: "0 32px 120px rgba(0,0,0,0.55)",
                      minHeight: 260,
                    }}
                  >
                    <video
                      src="/Shopping_Assistant.mp4"
                      style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                    />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="operations" style={{ paddingTop: 70, paddingBottom: 86 }}>
            <div style={wrap}>
              <SectionTitle
                eyebrow="Operations"
                title="Run a faster store with fewer bottlenecks"
                subtitle="Shift checkout load onto the cart, reduce fixed station needs, and give teams better tools to resolve exceptions quickly."
              />

              <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
                {[0, 1].map((idx) => (
                  <motion.div key={idx} whileHover={{ y: -8, scale: 1.01 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
                    <Card style={{ padding: 18, position: "relative", overflow: "hidden" }}>
                      <motion.div
                        aria-hidden
                        animate={{ rotate: [0, 4, -4, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          position: "absolute",
                          inset: -80,
                          background: "radial-gradient(320px 200px at 20% 20%, rgba(0,255,208,0.16), transparent), radial-gradient(320px 200px at 80% 80%, rgba(88,130,255,0.16), transparent)",
                          opacity: 0.6,
                          pointerEvents: "none",
                        }}
                      />
                      {idx === 0 ? (
                        <>
                          <OpsLine title="Fewer checkout stations" desc="More trips finish on-cart—keep lanes for edge cases, not every basket." />
                          <OpsLine title="Higher throughput" desc="Less queue time + smoother exits increases peak-hour capacity." />
                          <OpsLine title="Clear exception routing" desc="Neutral UX for shoppers; quiet staff alerts for edge cases." />
                        </>
                      ) : (
                        <>
                          <OpsLine title="Inventory-friendly signals" desc="Real-time intent + basket signals support replenishment and merchandising decisions." />
                          <OpsLine title="Better substitution & finding" desc="Fewer missed items when guidance is in-aisle, not at a kiosk." />
                          <OpsLine title="Store dashboard visibility" desc="Fleet health, trip status, and exceptions in one view." />
                        </>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
                <Card glow={false} style={{ padding: 16, maxWidth: 980, width: "100%", background: "rgba(0,0,0,0.26)" }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "grid", gap: 6 }}>
                      <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Designed to fit your store economics</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.70)", fontWeight: 760, lineHeight: 1.6 }}>
                        Reduce friction in the trip, improve labor efficiency, and unlock measurable uplift—without changing how shoppers see your brand.
                      </div>
                    </div>
                    <Button onClick={() => setShowDemo(true)} style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-2))", padding: "12px 16px", fontWeight: 850 }}>
                      <span>Get my demo</span>
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <section id="shrink" style={{ paddingTop: 70, paddingBottom: 86 }}>
            <div style={wrap}>
              <SectionTitle
                eyebrow="Loss Prevention"
                title="Fast trips with shrink-aware controls"
                subtitle="Verification triggers only when signals disagree. Exceptions route to staff with context, keeping trips fast while protecting margin."
              />

              <div style={{ marginTop: 22, display: "flex", justifyContent: "center" }}>
                <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
                  <Card style={{ padding: 12, position: "relative", overflow: "hidden", maxWidth: 520, width: "100%" }}>
                    <motion.div
                      aria-hidden
                      animate={{ opacity: [0.2, 0.55, 0.2] }}
                      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(360px 220px at 30% 20%, rgba(0,190,120,0.18), transparent), radial-gradient(360px 220px at 80% 80%, rgba(88,130,255,0.18), transparent)",
                        pointerEvents: "none",
                      }}
                    />
                    <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.28)" }}>
                      <img
                        src="/Security.png"
                        alt="Security check on smart cart"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "16 / 10" }}
                        loading="lazy"
                      />
                    </div>
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, position: "relative", justifyContent: "center" }}>
                      <div style={{ width: 34, height: 34, borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(0,190,120,0.9)" }}>
                        <ShieldCheck size={16} />
                      </div>
                      <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Security check in action</div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
                {[
                  { icon: <ShieldCheck size={16} />, title: "Verification flow", desc: "Lightweight checks when needed, with neutral UX and quick resolution paths." },
                  { icon: <Users size={16} />, title: "Staff assist routing", desc: "Escalations route to nearby staff with context, reducing aisle wandering and friction." },
                  { icon: <Gauge size={16} />, title: "Operational visibility", desc: "Trip status and exceptions surfaced in a dashboard for better coverage decisions." },
                ].map((item, idx) => (
                  <motion.div key={item.title} whileHover={{ y: -8, scale: 1.01 }} transition={{ type: "spring", stiffness: 220, damping: 20, delay: idx * 0.02 }}>
                    <Card style={{ padding: 18, position: "relative", overflow: "hidden" }}>
                      <motion.div
                        aria-hidden
                        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.04, 1] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          position: "absolute",
                          inset: -60,
                          background: "radial-gradient(280px 220px at 30% 20%, rgba(0,255,208,0.12), transparent), radial-gradient(280px 220px at 80% 80%, rgba(88,130,255,0.12), transparent)",
                          pointerEvents: "none",
                        }}
                      />
                      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
                        <div style={{ width: 38, height: 38, borderRadius: 14, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.9)" }}>
                          {item.icon}
                        </div>
                        <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{item.title}</div>
                      </div>
                      <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", fontWeight: 740, position: "relative" }}>{item.desc}</div>
                    </Card>
                  </motion.div>
                ))}

              </div>
            </div>
          </section>

          <RetailersFaqSection />
          <CtaSection reduced={reduced} onRequestDemo={() => setShowDemo(true)} />
          <RetailersFooter />
        </div>
      </div>

      <AnimatePresence>{showDemo ? <RetailersDemoModal onClose={() => setShowDemo(false)} /> : null}</AnimatePresence>
    </div>
  )
}

function RetailerMetric({ label, value, icon, tone }: { label: string; value: string; icon: React.ReactNode; tone?: string }) {
  const metricTone = tone ?? "var(--accent)"
  return (
    <div style={{ padding: 16, borderRadius: 20, border: "1px solid var(--line)", background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ width: 44, height: 44, borderRadius: 16, border: "1px solid var(--line)", background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: metricTone, boxShadow: "0 0 26px rgba(0,0,0,0.25)" }}>
          {icon}
        </div>
        <div style={{ fontSize: 26, fontWeight: 760, color: "var(--ink)", letterSpacing: -0.4, fontFamily: space.style.fontFamily }}>{value}</div>
      </div>
      <div style={{ marginTop: 8, fontSize: 13, fontWeight: 650, color: "var(--muted)" }}>{label}</div>
    </div>
  )
}

function OpsLine({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 18, height: 18, borderRadius: 999, background: "rgba(0,255,208,0.18)", border: "1px solid rgba(0,255,208,0.35)" }} />
        <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{title}</div>
      </div>
      <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.70)", fontWeight: 730 }}>{desc}</div>
    </div>
  )
}

function RetailInsightsSection() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <SectionTitle
        eyebrow="Retailer Insight"
        title="We listen, so you can optimize"
        subtitle="Cart conversations surface trends, restocks, and merchandising moves that keep shelves moving."
      />

      <Card style={{ padding: 22, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: -80, background: "radial-gradient(520px 260px at 15% 0%, rgba(0,255,208,0.14), transparent), radial-gradient(520px 260px at 90% 100%, rgba(88,130,255,0.12), transparent)", pointerEvents: "none" }} />

        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 12, letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 900, color: "rgba(255,255,255,0.66)" }}>Signal stream</div>
            <div style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 980, color: "rgba(255,255,255,0.96)" }}>Cart asks → store actions</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 740 }}>Live intent turns into ops moves.</div>
          </div>

          <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(0,0,0,0.24)", color: "rgba(255,255,255,0.82)", fontWeight: 900, fontSize: 12 }}>
            Live feed
          </span>
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
          <InsightCard
            tag="Seasonal lift"
            tone="rgba(255,170,80,0.9)"
            query="“Need grilling sauce ideas”"
            insight="BBQ condiments intent +140% today"
            action="Move grill kits to front, add pairing cards"
          />
          <InsightCard
            tag="Substitution risk"
            tone="rgba(0,255,208,0.9)"
            query="“What can I swap for oat milk?”"
            insight="Oat milk OOS risk in aisle 7"
            action="Stage almond + soy alternatives, push shelf signs"
          />
          <InsightCard
            tag="Trip friction"
            tone="rgba(88,130,255,0.9)"
            query="“Where are gluten-free snacks?”"
            insight="Aisle guidance requests up 63%"
            action="Add wayfinding tags + expand gluten-free endcap"
          />
        </div>
      </Card>
    </div>
  )
}

function InsightCard({
  tag,
  tone,
  query,
  insight,
  action,
}: {
  tag: string
  tone: string
  query: string
  insight: string
  action: string
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: `1px solid ${tone}`,
        background: "rgba(0,0,0,0.28)",
        padding: 16,
        display: "grid",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: tone }} />
        <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.35, textTransform: "uppercase", color: tone }}>{tag}</span>
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 750 }}>Shopper query</div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.92)", fontWeight: 900 }}>{query}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", fontWeight: 750 }}>System insight</div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", fontWeight: 900 }}>{insight}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", fontWeight: 750 }}>Action</div>
      <div style={{ fontSize: 14, color: tone, fontWeight: 900 }}>{action}</div>
    </div>
  )
}

function RetailExperienceSection() {
  return (
    <Card style={{ padding: 24, display: "grid", gap: 18 }}>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: -14,
            background: "radial-gradient(420px 260px at 30% 20%, rgba(0,255,208,0.18), rgba(0,0,0,0)), radial-gradient(420px 260px at 80% 80%, rgba(88,130,255,0.12), rgba(0,0,0,0))",
            filter: "blur(12px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            borderRadius: 26,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "linear-gradient(120deg, rgba(0,0,0,0.65), rgba(10,16,26,0.58))",
            boxShadow: "0 28px 120px rgba(0,0,0,0.55)",
            maxWidth: "540px",
            margin: "0 auto",
          }}
        >
          <img
            src="/1st_Image.png"
            alt="Smart cart experience in aisle"
            style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "16 / 10", maxHeight: 360 }}
            loading="lazy"
          />
          <div style={{ position: "absolute", left: 14, top: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Pill icon={<Mic size={14} />} text="Live answers" />
            <Pill icon={<Sparkles size={14} />} text="Retail promos" />
          </div>
          <div
            style={{
              position: "absolute",
              right: 12,
              bottom: 12,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.32)", color: "rgba(255,255,255,0.9)", fontWeight: 850, fontSize: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)" }} />
              Live location
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.32)", color: "rgba(255,255,255,0.9)", fontWeight: 850, fontSize: 12 }}>
              <CreditCard size={14} />
              Cart checkout
            </span>
          </div>
        </div>
      </motion.div>

      <div style={{ display: "grid", gap: 14, justifyItems: "center", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.82)",
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 0.35,
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)" }} />
          In-aisle experience
        </div>

        <div style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 980, color: "rgba(255,255,255,0.95)", lineHeight: 1.08, maxWidth: 780 }}>
          Attach a smart cart screen and give every shopper a guided, revenue-ready trip.
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", fontWeight: 720, maxWidth: 720 }}>
          Position your store as the smart aisle: live answers, personalized offers, verification-ready checkout, and metrics that prove uplift.
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Pill icon={<MapPin size={14} />} text="Live location" />
          <Pill icon={<CreditCard size={14} />} text="Self checkout" />
          <Pill icon={<BarChart3 size={14} />} text="Retail metrics" />
        </div>
      </div>
    </Card>
  )
}
