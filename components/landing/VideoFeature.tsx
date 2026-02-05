"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"

interface VideoFeatureProps {
    reduced?: boolean
}

export function VideoFeature({ reduced = false }: VideoFeatureProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [playing, setPlaying] = useState(true)

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
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Ambient background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ y: [0, -40, 0], opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] bg-[var(--accent)]/15 blur-[100px] rounded-full mix-blend-screen"
                />
                <motion.div
                    animate={{ y: [0, 60, 0], opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[0%] right-[5%] w-[45vw] h-[45vw] bg-[#a078ff]/15 blur-[100px] rounded-full mix-blend-screen"
                />
            </div>

            <div className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-8">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                        See Vela in action.
                    </h2>
                    <p className="text-xl text-white/70 font-medium leading-relaxed max-w-md">
                        Real-time guidance, smart promos, and instant checkout.
                    </p>
                </div>

                <div className="relative perspective-1000">
                    {/* Floating 3D Elements */}
                    <motion.div
                        animate={reduced ? {} : { y: [0, -20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-16 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--accent)]/20 to-transparent blur-2xl border border-white/10 z-0 hidden md:block opacity-60"
                    />
                    <motion.div
                        animate={reduced ? {} : { y: [0, 25, 0], rotate: [0, -15, 0] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-12 -left-8 w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#a078ff]/20 to-transparent blur-2xl border border-white/10 z-20 hidden md:block opacity-60"
                    />

                    <motion.div
                        animate={reduced ? {} : { y: [0, -10, 0] }}
                        transition={reduced ? { duration: 0.01 } : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        className="relative group z-10"
                    >
                        {/* Glow effect behind */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--accent)]/10 to-[var(--accent-2)]/10 blur-xl opacity-70" />

                        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 pointer-events-none" />

                            <video
                                src="/Shopping_Assistant.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                ref={videoRef}
                                className="w-full h-auto aspect-[4/3] object-cover opacity-95"
                                onEnded={() => setPlaying(false)}
                            />

                            <div className="absolute left-6 bottom-6 z-20 flex flex-col gap-3">
                                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md w-fit">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
                                    <span className="text-xs font-bold text-white/90 tracking-wide uppercase">Live Footage</span>
                                </div>
                                <div className="text-xl font-bold text-white">Vela in aisle</div>
                            </div>

                            <button
                                type="button"
                                onClick={togglePlay}
                                className="absolute right-6 bottom-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-black/40 text-white font-bold backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                {playing ? <Pause size={16} /> : <Play size={16} />}
                                <span className="text-sm">{playing ? "Pause" : "Play"}</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
