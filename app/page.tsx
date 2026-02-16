"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ShoppingCart, Menu, X } from "lucide-react"
import { Space_Grotesk } from "next/font/google"

import {
  AnimatedBackdrop,
  Button,
  ProblemStorySection,
  HowItWorksSection,
  TryCartSection,
  FaqSection,
  CtaSection,
  Footer,
  clamp,
  usePrefersReducedMotion,
  DemoModal,
  Hero,
  useBreakpoint,
} from "@/components/landing"

const space = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] })

export default function Page() {
  const reduced = usePrefersReducedMotion()
  const isMobile = useBreakpoint(768)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [showDemo, setShowDemo] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [mx, setMx] = useState(0.5)
  const [my, setMy] = useState(0.5)

  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 220, damping: 30 })

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const onMove = reduced || isMobile ? undefined : (e: React.MouseEvent) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width)
    mouseY.set((e.clientY - r.top) / r.height)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      ref={rootRef}
      onMouseMove={onMove}
      className="min-h-screen text-[rgba(255,255,255,0.94)]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 h-[2px] w-full z-50 origin-[0%_50%] bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-4)]"
        style={{ scaleX: progressScale }}
      />

      <div className="relative">
        <AnimatedBackdrop mx={mx} my={my} reduced={reduced} />

        <div className="relative z-10">
          {/* Premium Navbar */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-40"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`transition-all duration-500 ${scrolled
                ? "bg-black/60 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                : "bg-transparent border-b border-transparent"
                }`}
            >
              <div className="max-w-[1200px] mx-auto px-6 py-3.5 flex items-center justify-between gap-6">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl border border-white/[0.1] bg-white/[0.04] flex items-center justify-center">
                    <ShoppingCart size={17} className="text-white/80" />
                  </div>
                  <div className="flex flex-col leading-none gap-0.5">
                    <div className={`font-bold tracking-tight text-white ${space.className}`}>Vexa</div>
                    <div className="text-[10px] text-white/40 font-semibold tracking-wide">AI smart cart</div>
                  </div>
                </div>

                {/* Spacer for centering */}
                <div className="flex-1" />

                {/* Right side */}
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setShowDemo(true)}
                    className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] border-transparent text-black font-extrabold shadow-[0_0_30px_rgba(0,255,224,0.2)] hover:shadow-[0_0_50px_rgba(0,255,224,0.35)] text-sm px-5 py-2.5 rounded-full"
                  >
                    <span>Get demo</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <Hero />
          <TryCartSection />

          <HowItWorksSection />
          <ProblemStorySection />
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
