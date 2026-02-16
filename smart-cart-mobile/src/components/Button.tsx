import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
}

export function Button({
    className,
    variant = "primary",
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50",

                // Variants
                variant === "primary" &&
                "bg-[var(--foreground)] text-[var(--background)] hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]",

                variant === "secondary" &&
                "bg-white/10 text-white border border-white/10 hover:bg-white/15 backdrop-blur-md",

                variant === "ghost" &&
                "bg-transparent text-white/70 hover:text-white hover:bg-white/5",

                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
