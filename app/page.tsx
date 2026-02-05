"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ShoppingCart, Store, Mic, Sparkles, CreditCard, BarChart3, MapPin } from "lucide-react"
import { Manrope, Space_Grotesk } from "next/font/google"
import Link from "next/link"
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
  HeroMetric,
  VideoFeature,
  HeroImageFeature,
  DemoModal,
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

  const onMove = (e: React.MouseEvent) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width)
    mouseY.set((e.clientY - r.top) / r.height)
  }

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
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <div
      ref={rootRef}
      onMouseMove={onMove}
      className={`min-h-screen text-[rgba(255,255,255,0.94)] ${manrope.className}`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 h-[3px] w-full z-50 origin-[0%_50%] bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] shadow-[0_0_30px_rgba(0,255,208,0.3)]"
        style={{ scaleX: progressScale }}
      />

      <div className="relative">
        <AnimatedBackdrop mx={mx} my={my} reduced={reduced} />

        <div className="relative z-10">
          {/* Header */}
          <div className="sticky top-0 z-40 border-b border-white/10">
            <div className="bg-black/30 backdrop-blur-xl">
              <div className="max-w-[1160px] mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shadow-lg">
                    <ShoppingCart size={18} className="text-white/90" />
                  </div>
                  <div className="flex flex-col leading-none gap-0.5">
                    <div className={`font-bold tracking-tight ${space.className}`}>Vela</div>
                    <div className="text-xs text-white/60 font-semibold">AI smart cart</div>
                  </div>
                </div>

                <div className="flex-1" />

                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href="/retailers"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-white/20 bg-gradient-to-br from-[#5882ff22] to-[#00ffd016] text-sm font-bold text-white/90 shadow-lg hover:border-white/30 transition-all no-underline"
                  >
                    <Store size={15} />
                    For retailers
                  </Link>
                  <Button
                    onClick={() => setShowDemo(true)}
                    className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] border-white/20 text-black font-extrabold shadow-[0_0_40px_rgba(0,255,208,0.25)] hover:shadow-[0_0_60px_rgba(0,255,208,0.4)]"
                  >
                    <span>Get my demo</span>
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <motion.section
            id="story"
            className="pt-16 pb-24 relative"
            style={{ opacity: heroOpacity, y: heroShift }}
          >
            <div className="max-w-[1160px] mx-auto px-4">

              {/* Part 1: Main Copy & Static Visual (Moved to Top) */}
              <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Text Content */}
                <motion.div
                  variants={introContainer}
                  initial={shouldAnimate ? "hidden" : false}
                  animate={shouldAnimate ? "show" : undefined}
                >
                  <motion.div variants={introItem}>
                    <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-full border border-white/15 bg-black/40 text-xs font-bold tracking-widest text-white/70 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]" />
                      <span>Ready to deploy</span>
                    </div>
                  </motion.div>

                  <motion.h1
                    variants={introItem}
                    className={`mt-8 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1] text-[var(--ink)] drop-shadow-2xl ${space.className}`}
                  >
                    <span className="md:whitespace-nowrap">AI Shopping Cart</span>
                    <span className="block bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] bg-clip-text text-transparent">
                      Assistant.
                    </span>
                  </motion.h1>

                  <motion.p variants={introItem} className="mt-8 text-xl text-white/60 font-medium leading-relaxed max-w-md">
                    Attachable AI that guides, upsells, and lets shoppers skip the line.
                  </motion.p>

                  <motion.div variants={introItem} className="mt-10 flex gap-4">
                    <Button
                      onClick={() => setShowDemo(true)}
                      className="px-8 py-4 text-base bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-black font-extrabold shadow-[0_0_50px_rgba(0,255,208,0.3)]"
                    >
                      <span>Get my demo</span>
                      <ArrowRight size={18} />
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Hero Feature Visual (The "Second Picture" - moved here) */}
                <motion.div
                  initial={shouldAnimate ? { opacity: 0, scale: 0.95 } : false}
                  animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
                  transition={shouldAnimate ? { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } : undefined}
                  className="relative max-w-2xl mx-auto"
                >
                  <div className="absolute -inset-10 bg-gradient-radial from-[var(--accent)]/20 to-transparent blur-3xl opacity-50" />
                  <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                    <img
                      src="/1st_Image.png"
                      alt="Smart cart device"
                      className="w-full h-auto object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="inline-flex gap-3">
                        <Pill icon={<Mic size={14} />} text="Assistant" className="bg-black/40 backdrop-blur border-white/10" />
                        <Pill icon={<CreditCard size={14} />} text="Self checkout" className="bg-black/40 backdrop-blur border-white/10" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="h-32 md:h-40" />

              {/* Part 2: Interactive Demo (Moved Below) */}
              <div className="relative">
                <div className="text-center mb-12">
                  <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${space.className}`}>Try the experience</h2>
                </div>
                <TryCartHeroCard />
              </div>

            </div>
          </motion.section>

          <VideoFeature reduced={reduced} />

          <HowItWorksSection />
          <ProblemStorySection />
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
