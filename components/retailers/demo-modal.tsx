"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/landing"

type DemoResponse = { ok: boolean; message?: string }

export function RetailersDemoModal({ onClose }: { onClose: () => void }) {
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
        let data: DemoResponse | null = null
        try {
          data = JSON.parse(text) as DemoResponse
        } catch {
          data = { ok: false, message: `Request failed (HTTP ${res.status})` }
        }
        if (!res.ok || !data?.ok) throw new Error(data?.message || `Request failed (HTTP ${res.status})`)
        setSubmitted(true)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong")
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
              style={{ border: "1px solid rgba(255,255,255,0.16)", background: "rgba(0,0,0,0.26)", color: "rgba(255,255,255,0.82)", borderRadius: 12, padding: "6px 10px", cursor: "pointer", fontWeight: 800 }}
            >
              Close
            </button>
          </div>

          <div style={{ fontSize: 24, fontWeight: 980, color: "rgba(255,255,255,0.95)", letterSpacing: -0.4 }}>See the cart in action</div>
          <div style={{ fontSize: 14, fontWeight: 760, color: "rgba(255,255,255,0.76)" }}>Share your details and we’ll send a live demo slot.</div>

          {submitted ? (
            <div style={{ display: "grid", gap: 12, padding: "16px 14px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.16)", background: "linear-gradient(140deg, rgba(0,255,208,0.16), rgba(88,130,255,0.12), rgba(0,0,0,0.55))" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(0,0,0,0.18)", color: "rgba(255,255,255,0.86)", fontSize: 12, fontWeight: 900, letterSpacing: 0.3, width: "fit-content" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(0,255,208,0.9)", boxShadow: "0 0 18px rgba(0,255,208,0.45)" }} />
                <span>Request received</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 980, color: "rgba(255,255,255,0.95)" }}>Thanks — you’re in.</div>
              <div style={{ fontSize: 14, fontWeight: 750, color: "rgba(255,255,255,0.74)" }}>{"You'll get a live demo slot shortly."}</div>
              <Button
                onClick={onClose}
                style={{ justifyContent: "center", background: "linear-gradient(120deg, var(--accent), var(--accent-2))", border: "1px solid rgba(255,255,255,0.18)", boxShadow: "0 18px 60px rgba(0,255,208,0.24)", padding: "12px 16px", fontSize: 14, fontWeight: 850, width: "100%" }}
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
                style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.28)", color: "white", fontWeight: 800 }}
              />
              <input
                type="email"
                required
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.28)", color: "white", fontWeight: 800 }}
              />
              <Button
                type="submit"
                disabled={submitting}
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
              >
                <span>{submitting ? "Sending..." : "Get my demo"}</span>
                <ArrowRight size={16} />
              </Button>
              {error ? <div style={{ color: "rgba(255,120,120,0.9)", fontWeight: 800, fontSize: 12 }}>{error}</div> : null}
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
