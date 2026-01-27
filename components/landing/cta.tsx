"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button, Card } from "./ui"

export function CtaSection({ reduced, onRequestDemo }: { reduced: boolean; onRequestDemo: () => void }) {
  return (
    <section id="cta" style={{ paddingTop: 90, paddingBottom: 110 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <Card style={{ padding: 22 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18, alignItems: "center" }}>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.82)", fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.35 }}>
                <Sparkles size={14} style={{ opacity: 0.9 }} />
                <span>Ready to see it</span>
              </div>

              <div style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 980, letterSpacing: -0.6, color: "rgba(255,255,255,0.95)" }}>
                Book a live cart demo
              </div>

              <div style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.72)", fontWeight: 760, maxWidth: 560 }}>
                Walk the aisle, see promos land, and finish checkout on-cart. One short session; we’ll tailor it to your store.
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Button
                  onClick={onRequestDemo}
                  style={{
                    justifyContent: "center",
                    background: "linear-gradient(120deg, var(--accent), var(--accent-2))",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 18px 60px rgba(0,255,208,0.24)",
                    padding: "14px 18px",
                  }}
                >
                  <span>Get my demo</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            <ShimmerPanel reduced={reduced} />
          </div>
        </Card>
      </div>
    </section>
  )
}

function ShimmerPanel({ reduced }: { reduced: boolean }) {
  const shimmer = reduced ? {} : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }

  return (
    <div style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", padding: 16, overflow: "hidden", position: "relative" }}>
      <motion.div
        animate={shimmer}
        transition={reduced ? { duration: 1 } : { duration: 6.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(66,214,255,0.14), rgba(166,109,255,0.14), rgba(255,140,200,0.14), rgba(66,214,255,0.14))",
          backgroundSize: "300% 300%",
          opacity: 0.7,
        }}
      />

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.24)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={18} style={{ opacity: 0.92 }} />
          </div>
          <div>
            <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>Demo package</div>
            <div style={{ marginTop: 4, fontSize: 13, fontWeight: 850, color: "rgba(255,255,255,0.66)" }}>What you get</div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <Line title="AI assistant" desc="Answers, swaps, aisle guidance, promos" />
          <Line title="On-cart checkout" desc="Scan, total, tap to pay, receipts" />
          <Line title="Verification flow" desc="Light checks, staff assist when needed" />
          <Line title="Store dashboard" desc="Live throughput and exceptions" />
        </div>
      </div>
    </div>
  )
}

function Line({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.22)", padding: 12 }}>
      <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.92)" }}>{title}</div>
      <div style={{ marginTop: 6, color: "rgba(255,255,255,0.70)", fontSize: 13, lineHeight: 1.6, fontWeight: 750 }}>{desc}</div>
    </div>
  )
}
