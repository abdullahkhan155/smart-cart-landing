"use client"

import React from "react"
import { ShoppingCart, ArrowUpRight } from "lucide-react"

export function Footer() {
  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navLink = "text-sm font-semibold text-white/40 hover:text-white/80 transition-colors duration-300 cursor-pointer"

  return (
    <footer className="relative pt-8 pb-12 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="border-t border-white/[0.06] pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl border border-white/[0.1] bg-white/[0.04] flex items-center justify-center">
                  <ShoppingCart size={17} className="text-white/70" />
                </div>
                <span className="font-bold text-lg tracking-tight text-white">Vexa</span>
              </div>
              <p className="text-sm text-white/35 font-medium leading-relaxed max-w-[240px]">
                AI-powered smart carts for every store. Guiding shoppers from aisle to checkout.
              </p>
            </div>

            {/* Product links */}
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.15em] text-white/25 uppercase mb-4">Product</div>
              <div className="space-y-3">
                <div className={navLink} onClick={() => scrollTo("video")}>Features</div>
                <div className={navLink} onClick={() => scrollTo("how")}>How it works</div>
                <div className={navLink} onClick={() => scrollTo("proof")}>Results</div>
              </div>
            </div>

            {/* Company links */}
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.15em] text-white/25 uppercase mb-4">Company</div>
              <div className="space-y-3">
                <div className={navLink} onClick={() => scrollTo("faq")}>FAQ</div>
                <div className={navLink} onClick={() => scrollTo("cta")}>Contact</div>
                <a href="/retailers" className={`${navLink} flex items-center gap-1 no-underline`}>
                  For Retailers
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.15em] text-white/25 uppercase mb-4">Legal</div>
              <div className="space-y-3">
                <div className={navLink}>Privacy</div>
                <div className={navLink}>Terms</div>
                <div className={navLink}>Security</div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-white/25 font-medium">
              © {new Date().getFullYear()} Vexa. All rights reserved.
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollTo("top")}
                className="text-xs font-semibold text-white/30 hover:text-white/60 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.04] cursor-pointer bg-transparent border-none"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
