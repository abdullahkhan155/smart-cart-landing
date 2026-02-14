"use client"

import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Pause } from "lucide-react"

interface VideoFeatureProps {
    reduced?: boolean
}

export function VideoFeature({ reduced = false }: VideoFeatureProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const sectionRef = useRef<HTMLDivElement>(null)
    const [playing, setPlaying] = useState(true)
    const [isHovering, setIsHovering] = useState(false)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    const togglePlay = () => {
        const v = videoRef.current
        if (!v) return
        if (v.paused) {
            v.play()
            setPlaying(true)
        } else {
            v.pause()
            setPlaying(false)
        }
    }

    return (
        <section id="video" ref={sectionRef} className="relative pt-10 md:pt-14 pb-24 md:pb-32 px-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[1240px] mx-auto"
            >
                {/* Section header */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-bold tracking-widest text-white/60 uppercase backdrop-blur-md mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        <span>Experience Vexa</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
                        See it in <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50">Action</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/50 font-medium max-w-2xl mx-auto leading-relaxed">
                        Seamless navigation, instant product discovery, and checkout without the line.
                    </p>
                </div>

                {/* Video Container */}
                <div
                    className="group relative rounded-[24px] md:rounded-[32px] overflow-hidden bg-[#0a0a0a] ring-1 ring-white/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_40px_-12px_rgba(0,0,0,1)]"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >

                    {/* Cinematic Glow */}
                    <div className="absolute -inset-[1px] bg-gradient-to-b from-white/[0.08] to-transparent rounded-[24px] md:rounded-[32px] pointer-events-none z-10" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent z-20" />

                    {/* Dark Backdrop for Video */}
                    <div className="aspect-video relative bg-black">
                        <video
                            src="/Shopping_Assistant.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            ref={videoRef}
                            className="w-full h-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                            onEnded={() => setPlaying(false)}
                        />

                        {/* Screen Texture/Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
                    </div>

                    {/* UI Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex items-end justify-between z-30">
                        {/* Status Badge */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                                <motion.div
                                    animate={{ opacity: [1, 0.4, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-2 h-2 rounded-full bg-[#ff3b30] shadow-[0_0_8px_#ff3b30]"
                                />
                                <span className="text-xs font-bold text-white tracking-wider uppercase">Live Demo</span>
                            </div>
                        </div>

                        {/* Play/Pause Control */}
                        <button
                            onClick={togglePlay}
                            className="group/btn flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                            aria-label={playing ? "Pause video" : "Play video"}
                        >
                            {playing ? (
                                <Pause size={20} fill="currentColor" className="opacity-90" />
                            ) : (
                                <Play size={20} fill="currentColor" className="ml-1 opacity-90" />
                            )}
                        </button>
                    </div>

                    {/* Centered Play Button (Visible on Pause) */}
                    {!playing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-20 pointer-events-none">
                            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-2xl">
                                <span className="text-sm font-bold tracking-wide">PAUSED</span>
                            </div>
                        </div>
                    )}

                </div>
            </motion.div>
        </section>
    )
}
