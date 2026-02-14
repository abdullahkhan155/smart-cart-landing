"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { FloatingElements } from "./FloatingElements"
import { Button } from "./ui"
import { DemoModal } from "./DemoModal"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [showDemo, setShowDemo] = useState(false)

    return (
        <section
            ref={containerRef}
            className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-6"
        >
            {/* Background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-[rgba(0,255,224,0.05)] blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-[rgba(99,102,241,0.06)] blur-[150px] rounded-full" />
            </div>

            {/* Floating glassmorphism elements */}
            <FloatingElements />

            {/* Centered content */}
            <div className="relative z-10 max-w-[900px] mx-auto text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-md text-[11px] font-extrabold tracking-[0.15em] text-white/70 uppercase">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                        </span>
                        <span>AI Shopping Cart Assistant</span>
                    </div>
                </motion.div>

                {/* Giant Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.03em] text-white leading-[1.02] mb-6"
                >
                    AI Shopping Cart{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[#a78bfa] to-[var(--accent-2)] bg-[length:200%_auto] animate-gradient">
                        Assistant
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                    className="text-lg md:text-xl text-white/50 font-medium leading-relaxed max-w-lg mx-auto mb-10"
                >
                    An AI-powered cart that guides shoppers, surfaces deals, and skips the checkout line.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <Button
                        onClick={() => setShowDemo(true)}
                        className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-black font-extrabold px-8 py-4 text-base rounded-full shadow-[0_0_60px_rgba(0,255,224,0.3)] hover:shadow-[0_0_80px_rgba(0,255,224,0.5)] hover:scale-105 transition-all duration-300"
                    >
                        <span>Get Demo</span>
                    </Button>
                </motion.div>
            </div>

            {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
        </section>
    )
}
