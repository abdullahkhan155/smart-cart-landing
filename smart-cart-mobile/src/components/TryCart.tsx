"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, MessageSquare } from "lucide-react"
import { Card, usePrefersReducedMotion } from "./ui"
import { Bubble, ActionButton } from "./Pill"

export function TryCart() {
    const demo = useTryCartAskDemo()
    const { panelRef, ...cardProps } = demo

    return (
        <section className="py-24 px-4 overflow-hidden relative" id="demo">
            {/* Glow behind the cart */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[600px] bg-[var(--accent)]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-md mx-auto relative z-10" ref={panelRef}>
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-4 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                        Live Assistant
                    </div>
                    <h2 className="text-3xl font-bold font-space text-white mb-2">Ask Vexa</h2>
                    <p className="text-white/50 text-sm max-w-xs mx-auto">Experience the conversational AI that guides your shopping trip.</p>
                </div>

                <TryCartCard {...cardProps} />
            </div>
        </section>
    )
}

function useTryCartAskDemo() {
    const reduced = usePrefersReducedMotion()
    const [step, setStep] = useState(0)
    const [key, setKey] = useState(0)
    const panelRef = useRef<HTMLDivElement | null>(null)

    // Script sequence
    useEffect(() => {
        if (reduced) return
        const delays = [2000, 3500, 3000, 4000]
        let timeout: NodeJS.Timeout

        const next = (currentStep: number) => {
            if (currentStep >= delays.length) {
                // Restart loop
                timeout = setTimeout(() => {
                    setStep(0)
                    setKey(k => k + 1)
                }, 5000)
                return
            }

            timeout = setTimeout(() => {
                setStep(s => s + 1)
                next(currentStep + 1)
            }, delays[currentStep])
        }

        next(step)
        return () => clearTimeout(timeout)
    }, [key, reduced])

    const restart = () => {
        setStep(0)
        setKey(k => k + 1)
    }

    return {
        step,
        panelRef,
        restart
    }
}

function TryCartCard({ step, restart }: { step: number; restart: () => void }) {
    return (
        <Card className="overflow-hidden border-white/10 bg-black/40 backdrop-blur-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] h-[480px] flex flex-col relative" glow>

            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/5 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
                        <MessageSquare className="w-5 h-5 text-black" />
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm tracking-wide">Vexa Assistant</div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-white/40 text-[10px] font-medium uppercase tracking-wider">Online</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={restart}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors active:scale-95"
                >
                    <div className="text-[10px] font-bold text-[var(--accent)]">REPLAY</div>
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto scrollbar-hide relative z-10">
                {/* Initial User Message */}
                <div className="flex justify-end">
                    <Bubble tone="rgba(255,255,255,0.1)" align="right">
                        Where can I find gluten-free pasta?
                    </Bubble>
                </div>

                {/* AI Response 1 */}
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="flex justify-start"
                        >
                            <Bubble tone="rgba(0,255,224,0.1)" border="rgba(0,255,224,0.2)" align="left">
                                Aisle 4, right side. <br />
                                <span className="opacity-70 text-xs mt-1 block">It's on the middle shelf next to the organic sauces.</span>
                            </Bubble>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* AI Follow-up (Deal) */}
                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="mt-2"
                        >
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-4 flex gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0 border border-[var(--accent)]/20">
                                    <Sparkles size={20} className="text-[var(--accent)]" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-[var(--accent)] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">DEAL</span>
                                        <span className="text-xs text-[var(--accent)] font-bold">20% OFF</span>
                                    </div>
                                    <div className="text-sm font-bold text-white">Banza Chickpea Pasta</div>
                                    <div className="text-[11px] text-white/50">Expires in 15 mins</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Action Button */}
                <AnimatePresence>
                    {step >= 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-auto"
                        >
                            <ActionButton
                                icon={<ArrowRight size={16} />}
                                label="Navigate to Aisle 4"
                                highlight
                                onClick={restart}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Placeholder */}
            <div className="p-4 border-t border-white/5 bg-white/[0.02] relative z-10">
                <div className="h-12 rounded-full bg-white/5 border border-white/10 flex items-center px-5 text-sm text-white/30">
                    Ask Vexa anything...
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--accent)]/5 pointer-events-none" />
        </Card>
    )
}


