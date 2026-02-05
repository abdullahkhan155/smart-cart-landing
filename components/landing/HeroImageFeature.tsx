"use client"

import React from "react"
import { motion } from "framer-motion"
import { Mic, Sparkles, MapPin } from "lucide-react"
import { Pill } from "./Pill"

interface HeroImageFeatureProps {
    reduced?: boolean
}

export function HeroImageFeature({ reduced = false }: HeroImageFeatureProps) {
    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-12 items-center">

                <motion.div
                    animate={reduced ? {} : { y: [0, -8, 0] }}
                    transition={reduced ? { duration: 0.01 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative order-2 md:order-1"
                >
                    {/* Background Glow */}
                    <div className="absolute -inset-8 bg-gradient-radial from-[var(--accent)]/20 to-transparent blur-3xl opacity-60" />

                    <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                        <img
                            src="/1st_Image.png"
                            alt="Smart cart experience in aisle"
                            className="w-full h-auto aspect-[4/3] object-cover"
                            loading="lazy"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

                        {/* Floating UI Elements */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <Pill icon={<Mic size={14} />} text="Ask in aisle" className="bg-black/40 backdrop-blur border-white/10" />
                            <Pill icon={<Sparkles size={14} />} text="Smart promos" className="bg-black/40 backdrop-blur border-white/10" />
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg">
                            <div className="text-sm font-bold text-white">Cart screen, real time</div>
                            <div className="text-xs text-white/60 mt-1">Live location, answers, and promos while you shop.</div>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-6 order-1 md:order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-white/70 uppercase tracking-widest w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        In-aisle experience
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
                        Attachable AI Powered Device
                    </h2>

                    <p className="text-lg text-white/60 font-medium leading-relaxed max-w-lg">
                        Turn any cart into a smart cart with a guided experience—precise answers, personalized offers, and self checkout built in.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Pill icon={<MapPin size={14} />} text="Live location" />
                        <Pill icon={<Sparkles size={14} />} text="Context aware" />
                    </div>
                </div>

            </div>
        </section>
    )
}
