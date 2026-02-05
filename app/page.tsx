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
  VideoFeature,
  DemoModal,
  Hero,
  TryCartSection,
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



  return (
    <div
      ref={rootRef}
      onMouseMove={onMove}
      className={`min-h-screen text-[rgba(255,255,255,0.94)] ${manrope.className}`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 h-[3px] w-full z-50 origin-[0%_50%] bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] shadow-[0_0_30px_var(--accent)]"
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
                    <span>Get demo</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <Hero />

          <TryCartSection />

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
