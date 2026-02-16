"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/Button";

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center">
                        <span className="font-bold text-black text-xs">V</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white font-space">
                        Vexa
                    </span>
                </div>

                {/* CTA */}
                <Button
                    className="h-9 px-4 text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/10"
                    onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    Get Demo
                </Button>
            </div>
        </header>
    );
}
