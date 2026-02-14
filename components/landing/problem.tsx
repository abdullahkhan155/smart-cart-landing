"use client"

import React, { useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { AlertTriangle, Clock, HelpCircle, Mic, Sparkles, CreditCard, Check, X } from "lucide-react"
import { SectionTitle } from "./ui"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function ProblemStorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const before = [
    { icon: <Clock size={18} />, text: "10+ min checkout queues" },
    { icon: <HelpCircle size={18} />, text: "Can't find what you need" },
    { icon: <AlertTriangle size={18} />, text: "No help when you need it" },
  ]

  const after = [
    { icon: <CreditCard size={18} />, text: "30-second on-cart pay" },
    { icon: <Mic size={18} />, text: "AI-guided navigation" },
    { icon: <Sparkles size={18} />, text: "Instant deals & bundles" },
  ]

  return (
    <section ref={sectionRef} className="relative pt-24 md:pt-32 pb-10 md:pb-14 px-4">
      {/* Background accent */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(600px 300px at 30% 40%, rgba(245,158,11,0.03), transparent), radial-gradient(600px 300px at 70% 60%, rgba(0,255,224,0.03), transparent)",
        }}
      />

      <div className="relative max-w-[1000px] mx-auto">
        <SectionTitle
          eyebrow="Why Vexa"
          title="Every Trip, Elevated"
          subtitle="See the difference an AI-powered cart makes."
        />

        {/* Before / After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-16 grid md:grid-cols-2 gap-4 md:gap-0"
        >
          {/* BEFORE */}
          <div className="noise-overlay relative rounded-[var(--radius-lg)] md:rounded-r-none border border-white/[0.06] bg-white/[0.015] p-8 md:p-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-400/20 bg-red-400/[0.06] text-[11px] font-extrabold tracking-[0.12em] text-red-400/70 uppercase mb-8">
                <X size={12} />
                Without Vexa
              </div>

              <div className="space-y-5">
                {before.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-white/30 shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-white/40 font-semibold text-base">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* AFTER */}
          <div className="noise-overlay relative rounded-[var(--radius-lg)] md:rounded-l-none border border-white/[0.1] bg-white/[0.025] p-8 md:p-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.04] to-transparent pointer-events-none" />
            {/* Highlight border on left (desktop) */}
            <div className="hidden md:block absolute left-0 top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-[var(--accent)]/60 to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.06] text-[11px] font-extrabold tracking-[0.12em] text-[var(--accent)]/80 uppercase mb-8">
                <Check size={12} />
                With Vexa
              </div>

              <div className="space-y-5">
                {after.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: EASE }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-xl border border-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)] shrink-0"
                      style={{ background: "rgba(0,255,224,0.06)", boxShadow: "0 0 20px rgba(0,255,224,0.08)" }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-white/80 font-semibold text-base">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
