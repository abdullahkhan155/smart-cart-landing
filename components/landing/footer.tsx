"use client"

import React from "react"
import { ShoppingCart } from "lucide-react"

export function Footer() {
  const navLink: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 900,
    color: "rgba(255,255,255,0.70)",
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.02)",
    cursor: "pointer",
  }

  return (
    <footer style={{ paddingBottom: 40 }}>
      <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 18, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShoppingCart size={18} style={{ opacity: 0.92 }} />
            </div>
            <div style={{ fontWeight: 980, color: "rgba(255,255,255,0.82)" }}>CartNova</div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={navLink} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Top</span>
            <span style={navLink} onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>How</span>
            <span style={navLink} onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}>Demo</span>
          </div>
        </div>

        <div style={{ marginTop: 14, textAlign: "center", color: "rgba(255,255,255,0.52)", fontSize: 12, fontWeight: 850 }}>
          Concept landing page. Replace copy and metrics for your brand.
        </div>
      </div>
    </footer>
  )
}
