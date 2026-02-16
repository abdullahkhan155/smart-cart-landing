import React from "react"

interface PillProps {
    icon?: React.ReactNode
    text: string
    className?: string
    tone?: string
    border?: string
    align?: "left" | "right"
}

export function Pill({ icon, text, className = "" }: PillProps) {
    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-white/80 hover:bg-white/10 transition-colors ${className}`}>
            {icon && <span className="opacity-70">{icon}</span>}
            <span>{text}</span>
        </div>
    )
}

export function MiniChip({ text, tone }: { text: string; tone: string }) {
    return (
        <div
            style={{
                fontSize: 10,
                fontWeight: 800,
                color: tone,
                padding: "4px 8px",
                borderRadius: 6,
                background: tone.replace("0.85", "0.1").replace("0.95", "0.1").replace("0.75", "0.1"),
                border: `1px solid ${tone.replace("0.85", "0.2").replace("0.95", "0.2").replace("0.75", "0.2")}`,
                textTransform: "uppercase",
                letterSpacing: 0.5,
            }}
        >
            {text}
        </div>
    )
}

export function ActionButton({
    icon,
    label,
    onClick,
    highlight,
    disabled
}: {
    icon: React.ReactNode
    label: string
    onClick?: () => void
    highlight?: boolean
    disabled?: boolean
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "12px 20px",
                borderRadius: 14,
                border: highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
                background: highlight ? "white" : "rgba(255,255,255,0.04)",
                color: highlight ? "black" : "white",
                fontSize: 13,
                fontWeight: 800,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
                transition: "all 0.2s ease",
            }}
        >
            {icon}
            <span>{label}</span>
        </button>
    )
}

export function Bubble({ children, tone, border, align = "left" }: { children: React.ReactNode; tone: string; border?: string; align?: "left" | "right" }) {
    return (
        <div
            style={{
                background: tone,
                border: `1px solid ${border || "transparent"}`,
                padding: "12px 16px",
                borderRadius: 18,
                borderBottomLeftRadius: align === "left" ? 2 : 18,
                borderBottomRightRadius: align === "right" ? 2 : 18,
                color: "rgba(255,255,255,0.92)",
                fontSize: 14,
                lineHeight: 1.5,
                maxWidth: "85%",
                fontWeight: 500,
            }}
        >
            {children}
        </div>
    )
}

export function TypingBubble({ label, reduced }: { label: string; reduced: boolean }) {
    if (reduced) return null;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 4 }}>
            <div style={{ display: "flex", gap: 3 }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.5)",
                            animation: "bounce 1.4s infinite ease-in-out both",
                            animationDelay: `${i * 0.16}s`
                        }}
                    />
                ))}
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>{label}</span>
        </div>
    )
}

export function RouteStep({ label, detail, active, accent }: { label: string; detail: string; active?: boolean; accent?: boolean }) {
    return (
        <div style={{
            padding: "8px 10px", borderRadius: 10,
            background: active ? (accent ? "rgba(0,255,224,0.12)" : "rgba(255,255,255,0.06)") : "rgba(255,255,255,0.03)",
            border: `1px solid ${active ? (accent ? "rgba(0,255,224,0.25)" : "rgba(255,255,255,0.12)") : "rgba(255,255,255,0.06)"}`,
            opacity: active ? 1 : 0.6
        }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>{label}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: accent ? "rgba(0,255,224,0.95)" : "white" }}>{detail}</div>
        </div>
    )
}
