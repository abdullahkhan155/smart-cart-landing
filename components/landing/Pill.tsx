import React from "react"

interface PillProps {
    icon?: React.ReactNode
    text: string
    className?: string
}

export function Pill({ icon, text, className = "" }: PillProps) {
    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-white/80 hover:bg-white/10 transition-colors ${className}`}>
            {icon && <span className="opacity-70">{icon}</span>}
            <span>{text}</span>
        </div>
    )
}
