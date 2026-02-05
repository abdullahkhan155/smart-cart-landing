"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { ArrowRight, Mic, Sparkles, CreditCard, ChevronRight, Play } from "lucide-react"
import { Button } from "./ui"
import { Pill } from "./Pill"
import { DemoModal } from "./DemoModal"

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [showDemo, setShowDemo] = useState(false)

    // Mouse position for 3D tilt and spotlight
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth out the mouse values
    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 }
    const smoothX = useSpring(mouseX, springConfig)
    const smoothY = useSpring(mouseY, springConfig)

    // Transforms for the 3D card effect
    // Range is small to keep it subtle but premium
    const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7])
    const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7])

    // Parallax for floating elements (they move MORE than the card to feel closer)
    const floatX = useTransform(smoothX, [-0.5, 0.5], [-20, 20])
    const floatY = useTransform(smoothY, [-0.5, 0.5], [-20, 20])

    // Background spotlight follows mouse (in pixel values)
    const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height

            // Center based ( -0.5 to 0.5 )
            mouseX.set(x - 0.5)
            mouseY.set(y - 0.5)

            setSpotlightPos({ x: x * 100, y: y * 100 })
        }
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-20 perspective-1000"
            style={{ perspective: "1200px" }}
        >
            {/* 1. Dynamic Background */}
            <div className="absolute inset-0 bg-[#050505] z-0">
                {/* Deep mesh gradients */}
                <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-[rgba(0,255,208,0.06)] blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-[rgba(160,120,255,0.06)] blur-[120px] rounded-full mix-blend-screen animate-pulse-slow delay-1000" />

                {/* Mouse Follow Spotlight */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255,255,255,0.03), transparent 40%)`
                    }}
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.07]" />
            </div>

            <div className="container relative z-10 max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* 2. Text Content */}
                <div className="space-y-8 lg:pr-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold tracking-widest text-white/80 uppercase shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-6 hover:bg-white/10 transition-colors cursor-default">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                            </span>
                            <span>Ready for Deployment</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-2xl">
                            AI Shopping Cart <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[#fff] to-[var(--accent-2)] bg-[length:200%_auto] animate-gradient">
                                Assistant.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-lg mt-6">
                            Turn any cart into an AI-powered assistant. Guide shoppers, verify items, and skip the checkout line entirely.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                onClick={() => setShowDemo(true)}
                                className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-black font-extrabold px-10 py-5 text-lg rounded-full shadow-[0_0_50px_rgba(0,255,208,0.4)] hover:shadow-[0_0_80px_rgba(0,255,208,0.6)] hover:scale-105 transition-all duration-300 group"
                            >
                                <span>Get Demo</span>
                            </Button>
                        </div>

                        <div className="pt-8 flex items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Trust badges or small logos could go here */}
                            <div className="text-xs font-semibold tracking-widest uppercase text-white/40">Trusted by top retailers</div>
                        </div>
                    </motion.div>
                </div>

                {/* 3. 3D Visual Centerpiece */}
                <motion.div
                    className="relative perspective-1000"
                    initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring" }}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                    }}
                >
                    {/* Glow behind object */}
                    <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/30 to-transparent blur-[80px] -z-10 transform translate-z-[-100px]" />

                    {/* Main Card Device */}
                    <motion.div
                        className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] bg-[#111]"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <img
                            src="/1st_Image.png"
                            alt="Vela Smart Cart Device"
                            className="w-full h-auto object-cover scale-[1.02]"
                        />

                        {/* Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40 mix-blend-overlay pointer-events-none" />

                        {/* Bottom Gradient for readability if we had text overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
                    </motion.div>

                    {/* Floating UI Elements (Parallax) - Hidden on mobile */}
                    <motion.div
                        className="hidden md:block absolute top-[25%] -left-[4%] z-20"
                        style={{ x: floatX, y: floatY }}
                    >
                        <FloatingPill icon={<Mic size={14} />} text="Where is Quinoa?" delay={0} />
                    </motion.div>

                    <motion.div
                        className="hidden md:block absolute bottom-[30%] -right-[4%] z-20"
                        style={{ x: useTransform(smoothX, [-0.5, 0.5], [25, -25]), y: useTransform(smoothY, [-0.5, 0.5], [20, -20]) }}
                    >
                        <FloatingPill icon={<CreditCard size={14} />} text="Total: $42.80" delay={0.2} accent />
                    </motion.div>

                    <motion.div
                        className="hidden md:block absolute top-[15%] right-[2%] z-20"
                        style={{ x: useTransform(smoothX, [-0.5, 0.5], [15, -15]), y: useTransform(smoothY, [-0.5, 0.5], [15, -15]) }}
                    >
                        <FloatingPill icon={<Sparkles size={14} />} text="20% Off Match" delay={0.4} />
                    </motion.div>

                </motion.div>

            </div>

            {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
        </section>
    )
}

function FloatingPill({ icon, text, delay, accent = false }: { icon: any, text: string, delay: number, accent?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + delay, duration: 0.6, type: "spring" }}
            className={`
                flex items-center gap-2.5 px-3 py-2 rounded-xl backdrop-blur-xl border shadow-xl
                ${accent
                    ? "bg-[rgba(0,255,208,0.15)] border-[rgba(0,255,208,0.3)] text-white"
                    : "bg-black/60 border-white/10 text-white/90"
                }
            `}
        >
            <div className={`
                p-1 rounded-md 
                ${accent ? "bg-[rgba(0,255,208,0.2)] text-[var(--accent)]" : "bg-white/10 text-white/80"}
            `}>
                {icon}
            </div>
            <span className="font-bold text-xs tracking-wide">{text}</span>
        </motion.div>
    )
}

function LinkButton({ children, href }: { children: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl md:rounded-2xl font-bold text-white/80 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
        >
            {children}
            <ChevronRight size={16} className="opacity-50" />
        </a>
    )
}
