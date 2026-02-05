import React from "react"
import { Space_Grotesk } from "next/font/google"
import { cn } from "@/lib/utils"

const space = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] })

interface HeroMetricProps {
    label: string
    value: string
    icon: React.ReactNode
    tone?: string
    className?: string
}

export function HeroMetric({ label, value, icon, tone = "var(--accent)", className }: HeroMetricProps) {
    return (
        <div className={cn("p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm", className)}>
            <div className="flex items-center justify-between gap-3">
                <div
                    className="w-11 h-11 rounded-xl border border-white/10 bg-black/30 flex items-center justify-center shadow-lg"
                    style={{ color: tone }}
                >
                    {icon}
                </div>
                <div className={`text-2xl font-bold text-white tracking-tight ${space.className}`}>
                    {value}
                </div>
            </div>
            <div className="mt-2 text-xs font-semibold text-white/60">
                {label}
            </div>
        </div>
    )
}
