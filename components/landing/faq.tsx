"use client"

import React, { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ShieldCheck, Sparkles, CreditCard, Wifi, MapPin } from "lucide-react"
import { SectionTitle } from "./ui"

export function FaqSection() {
  const items = useMemo(
    () => [
      {
        q: "Does this replace self-checkout lanes?",
        a: "The cart handles most trips on-board. Lanes stay for edge cases: large returns, cash, age-gated items, or manual reviews.",
        icon: <CreditCard size={15} />,
      },
      {
        q: "How do promos stay relevant?",
        a: "Offers trigger by aisle, basket, and intent. If the basket changes, promos re-rank — no noisy banners, just one timely suggestion.",
        icon: <Sparkles size={15} />,
      },
      {
        q: "Is data and payment secure?",
        a: "All sessions are encrypted, tokens rotate on device, and payments run through the same PCI stack as your existing lanes.",
        icon: <ShieldCheck size={15} />,
      },
      {
        q: "What if Wi‑Fi drops?",
        a: "The cart works offline-first with store Wi-Fi or LTE failover. Guidance and promos cache, then sync when signal returns.",
        icon: <Wifi size={15} />,
      },
      {
        q: "How fast can we pilot?",
        a: "Most stores pilot in weeks: drop-in mounts, SIM/Wi-Fi setup, SKU sync, and a guided staff playbook for launch.",
        icon: <MapPin size={15} />,
      },
    ],
    []
  )

  return (
    <section id="faq" className="relative pt-10 md:pt-14 pb-10 md:pb-14 px-4">
      <div className="relative max-w-[700px] mx-auto">
        <SectionTitle
          eyebrow="FAQ"
          title="Got Questions?"
          subtitle="Everything you need to know about deploying Vexa."
        />

        <div className="mt-14 space-y-3">
          {items.map((it, idx) => (
            <FaqItem key={idx} q={it.q} a={it.a} icon={it.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ q, a, icon }: { q: string; a: string; icon: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open
        ? "border-white/[0.12] bg-white/[0.04]"
        : "border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.1]"
        }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-transparent border-none text-white cursor-pointer text-left px-6 py-5 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-white/30">{icon}</span>
          <span className="font-bold text-[15px] text-white/90">{q}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <ChevronDown size={16} className="text-white/40" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-5 pt-0 text-white/55 text-sm leading-relaxed font-medium border-t border-white/[0.04] ml-8">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
