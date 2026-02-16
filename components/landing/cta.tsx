"use client"

import React from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Button, useBreakpoint } from "./ui"

export function CtaSection({ reduced, onRequestDemo }: { reduced: boolean; onRequestDemo: () => void }) {
  const isMobile = useBreakpoint(768)
  return (
    <section id="cta" className="relative pt-10 md:pt-14 pb-24 md:pb-32 px-4 overflow-hidden">
      {/* Full-bleed gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={
            reduced
              ? {}
              : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
          }
          transition={
            reduced
              ? { duration: 0.01 }
              : { duration: 10, repeat: Infinity, ease: "linear" }
          }
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,255,224,0.06), rgba(99,102,241,0.08), rgba(232,121,249,0.06), rgba(0,255,224,0.06))",
            backgroundSize: "300% 300%",
          }}
        />
        <div className="absolute inset-0 bg-[var(--background)] opacity-60" />
      </div>

      {/* Floating orbs */}
      {!reduced && !isMobile && (
        <>
          <motion.div
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full bg-[var(--accent)]/8 blur-[100px] pointer-events-none"
          />
          <motion.div
            animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] rounded-full bg-[var(--accent-2)]/8 blur-[100px] pointer-events-none"
          />
        </>
      )}

      {/* Centered CTA content */}
      <div className="relative z-10 max-w-[600px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-[11px] font-extrabold tracking-[0.15em] text-white/70 uppercase backdrop-blur-md mb-8">
            <Sparkles size={13} className="text-[var(--accent)]" />
            <span>Ready to transform your store</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-5">
            Book a live{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]">
              cart demo
            </span>
          </h2>

          <p className="text-lg text-white/45 font-medium mb-10 leading-relaxed max-w-md mx-auto">
            Walk the aisles, see promos land, and finish checkout on-cart. One short session.
          </p>

          {/* CTA Button with glow */}
          <div className="relative inline-block">
            <div className="absolute inset-[-8px] bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent-2)]/20 blur-2xl rounded-full" />
            <Button
              onClick={onRequestDemo}
              className="relative bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-black font-extrabold px-10 py-5 text-lg rounded-full shadow-[0_0_60px_rgba(0,255,224,0.25)] hover:shadow-[0_0_80px_rgba(0,255,224,0.45)] hover:scale-105 transition-all duration-300"
            >
              <span>Get my demo</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
