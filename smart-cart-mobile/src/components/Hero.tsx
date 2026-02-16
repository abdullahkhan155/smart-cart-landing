"use client";

import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/Button";

export function Hero() {
    return (
        <section className="relative pt-32 pb-40 px-6 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center text-center">
            {/* Ambient Background */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[var(--accent)]/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[200px] h-[200px] bg-[var(--accent-2)]/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
                    <span className="flex h-2 w-2 relative">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase font-space">AI Smart Cart</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.05] tracking-tighter font-space">
                    A Cart That <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-blue-400 to-[var(--accent-2)] animate-gradient">Actually Helps.</span>
                </h1>

                <p className="text-lg text-white/50 mb-10 max-w-sm mx-auto leading-relaxed font-medium">
                    Turn any shopping cart into an AI assistant. Skip lines, find deals, and shop faster.
                </p>

                <div className="w-full max-w-xs space-y-3">
                    <Button
                        onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full h-14 text-lg font-bold bg-white text-black border-none shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-[1.02] transition-all duration-300 rounded-full"
                    >
                        Try It Live <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                        Works with any cart • No app needed
                    </div>
                </div>

                {/* Hero Visual - Vexa Assistant */}
                <div className="relative w-full max-w-[320px] mt-16 mx-auto group">
                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/20 to-transparent blur-[60px] rounded-full scale-110 pointer-events-none" />

                    {/* Image Container */}
                    <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl shadow-[var(--accent)]/10 bg-black/50 backdrop-blur-xl">
                        <img
                            src="/vexa-assistant.png"
                            alt="Vexa Assistant Interface"
                            className="w-full h-auto object-cover opacity-90"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Status Indicator */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Active</span>
                        </div>
                    </div>
                </div>

                {/* Floating Elements / Decor */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-20 h-40 bg-gradient-to-r from-[var(--accent)]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
                <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-20 h-40 bg-gradient-to-l from-[var(--accent-2)]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
            </div>
        </section>
    );
}
