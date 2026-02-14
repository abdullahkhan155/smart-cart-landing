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
            className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-4"
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
                    An AI-powered device that guides shoppers, surfaces deals, and skips the checkout line.
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

                {/* Vexa Assistant Image – epic animated showcase */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 60 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
                    className="relative -mt-4 flex flex-col items-center w-full max-w-[620px] mx-auto"
                >
                    {/* Main showcase container */}
                    <div className="relative flex justify-center items-center w-[min(90vw,440px)] h-[min(90vw,440px)] sm:w-[440px] sm:h-[440px]">

                        {/* Deep ambient glow */}
                        <motion.div
                            className="absolute rounded-full"
                            style={{
                                width: "105%",
                                height: "105%",
                                background: "radial-gradient(circle, rgba(0,255,224,0.12) 0%, rgba(99,102,241,0.06) 40%, transparent 65%)",
                                filter: "blur(60px)",
                            }}
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.5, 0.9, 0.5],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Spinning gradient arc ring */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        >
                            <svg viewBox="0 0 440 440" className="w-full h-full" style={{ filter: "drop-shadow(0 0 12px rgba(0,255,224,0.4))" }}>
                                <defs>
                                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(0,255,224,0.8)" />
                                        <stop offset="50%" stopColor="rgba(167,139,250,0.6)" />
                                        <stop offset="100%" stopColor="rgba(0,255,224,0)" />
                                    </linearGradient>
                                </defs>
                                <circle cx="220" cy="220" r="210" fill="none" stroke="url(#arcGrad)" strokeWidth="2" strokeDasharray="320 1000" strokeLinecap="round" />
                            </svg>
                        </motion.div>

                        {/* Counter-rotating secondary arc */}
                        <motion.div
                            className="absolute inset-[5%]"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        >
                            <svg viewBox="0 0 400 400" className="w-full h-full" style={{ filter: "drop-shadow(0 0 8px rgba(167,139,250,0.3))" }}>
                                <defs>
                                    <linearGradient id="arcGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(167,139,250,0.5)" />
                                        <stop offset="50%" stopColor="rgba(99,102,241,0.3)" />
                                        <stop offset="100%" stopColor="rgba(167,139,250,0)" />
                                    </linearGradient>
                                </defs>
                                <circle cx="200" cy="200" r="190" fill="none" stroke="url(#arcGrad2)" strokeWidth="1.5" strokeDasharray="180 1000" strokeLinecap="round" />
                            </svg>
                        </motion.div>

                        {/* Orbiting particle ring 1 – fast */}
                        <motion.div
                            className="absolute inset-[2.5%]"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(0,255,224,0.8)]" />
                            <div className="absolute bottom-[15%] right-0 w-1.5 h-1.5 rounded-full bg-[#a78bfa] opacity-70 shadow-[0_0_10px_rgba(167,139,250,0.6)]" />
                        </motion.div>

                        {/* Orbiting particle ring 2 – slow, opposite */}
                        <motion.div
                            className="absolute inset-[7.5%]"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute top-[10%] right-0 w-2 h-2 rounded-full bg-[var(--accent-2)] opacity-60 shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-50 shadow-[0_0_8px_rgba(0,255,224,0.5)]" />
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 rounded-full bg-[#a78bfa] opacity-40 shadow-[0_0_6px_rgba(167,139,250,0.4)]" />
                        </motion.div>

                        {/* Holographic scan line */}
                        <div className="absolute inset-[5%] overflow-hidden rounded-full">
                            <motion.div
                                className="absolute left-0 w-full"
                                style={{
                                    height: 2,
                                    background: "linear-gradient(90deg, transparent, rgba(0,255,224,0.5), rgba(167,139,250,0.4), transparent)",
                                    boxShadow: "0 0 20px rgba(0,255,224,0.3), 0 0 40px rgba(0,255,224,0.15)",
                                }}
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Floating image */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-[120%] h-[120%] flex items-center justify-center -ml-[10%]"
                        >
                            <motion.img
                                src="/vexa-assistant.png"
                                alt="Vexa AI Assistant"
                                className="w-full h-full object-contain"
                                style={{
                                    filter: "drop-shadow(0 0 50px rgba(0,255,224,0.3)) drop-shadow(0 0 100px rgba(99,102,241,0.15))",
                                }}
                                animate={{ rotate: [-1.5, 1.5, -1.5] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                draggable={false}
                            />
                        </motion.div>
                    </div>

                    {/* Glowing platform / pedestal base */}
                    <div className="relative -mt-10 w-[80%] max-w-[480px]">
                        <motion.div
                            style={{
                                height: 3,
                                borderRadius: "50%",
                                background: "linear-gradient(90deg, transparent, rgba(0,255,224,0.6), rgba(167,139,250,0.5), rgba(0,255,224,0.6), transparent)",
                                boxShadow: "0 0 30px rgba(0,255,224,0.3), 0 0 60px rgba(0,255,224,0.15)",
                            }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </div>

            {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
        </section>
    )
}
