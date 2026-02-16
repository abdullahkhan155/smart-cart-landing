import React from "react";
import { cn } from "@/lib/utils";

export function Card({
    className,
    children,
    style,
}: {
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-black/40 backdrop-blur-xl",
                "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
                className
            )}
            style={style}
        >
            {/* Noise texture for premium feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-overlay" />

            <div className="relative z-10">{children}</div>
        </div>
    );
}
