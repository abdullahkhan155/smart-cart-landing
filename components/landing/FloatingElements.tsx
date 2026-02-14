"use client"

import React from "react"
import { motion } from "framer-motion"
import {
    ShoppingCart,
    Barcode,
    Tag,
    CreditCard,
    Receipt,
    Package,
    Percent,
    ScanLine,
    Wallet,
    BadgeDollarSign,
} from "lucide-react"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface FloatingItem {
    icon: React.ElementType
    x: string
    y: string
    size: number
    iconSize: number
    delay: number
    duration: number
    rotate: number
    label?: string
}

const ITEMS: FloatingItem[] = [
    // Left side
    {
        icon: ShoppingCart,
        x: "6%",
        y: "15%",
        size: 72,
        iconSize: 28,
        delay: 0,
        duration: 7,
        rotate: -12,
        label: "Smart Cart",
    },
    {
        icon: Barcode,
        x: "3%",
        y: "52%",
        size: 56,
        iconSize: 22,
        delay: 1.2,
        duration: 8,
        rotate: 8,
    },
    {
        icon: Tag,
        x: "12%",
        y: "78%",
        size: 50,
        iconSize: 20,
        delay: 0.6,
        duration: 6.5,
        rotate: -6,
        label: "Deals",
    },
    {
        icon: Wallet,
        x: "8%",
        y: "35%",
        size: 44,
        iconSize: 18,
        delay: 2.5,
        duration: 9,
        rotate: 15,
    },
    // Right side
    {
        icon: CreditCard,
        x: "88%",
        y: "20%",
        size: 64,
        iconSize: 24,
        delay: 0.8,
        duration: 7.5,
        rotate: 10,
        label: "Checkout",
    },
    {
        icon: Receipt,
        x: "92%",
        y: "55%",
        size: 52,
        iconSize: 20,
        delay: 1.8,
        duration: 8.5,
        rotate: -8,
    },
    {
        icon: Package,
        x: "85%",
        y: "75%",
        size: 58,
        iconSize: 22,
        delay: 0.3,
        duration: 7,
        rotate: 5,
    },
    {
        icon: Percent,
        x: "90%",
        y: "40%",
        size: 46,
        iconSize: 18,
        delay: 2,
        duration: 6,
        rotate: -15,
        label: "Save",
    },
    // Top / Bottom accents
    {
        icon: ScanLine,
        x: "25%",
        y: "85%",
        size: 48,
        iconSize: 19,
        delay: 1.5,
        duration: 8,
        rotate: 12,
    },
    {
        icon: BadgeDollarSign,
        x: "75%",
        y: "88%",
        size: 44,
        iconSize: 17,
        delay: 2.2,
        duration: 7.5,
        rotate: -10,
    },
]

export function FloatingElements() {
    return (
        <div
            aria-hidden
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            {ITEMS.map((item, i) => {
                const Icon = item.icon
                const isEven = i % 2 === 0
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5, rotate: item.rotate }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1,
                            delay: 0.5 + item.delay,
                            ease: EASE,
                        }}
                        className="absolute"
                        style={{
                            left: item.x,
                            top: item.y,
                            transform: `translate(-50%, -50%)`,
                        }}
                    >
                        <motion.div
                            animate={{
                                y: isEven ? [0, -18, 0] : [0, 18, 0],
                                rotate: [item.rotate, item.rotate + (isEven ? 6 : -6), item.rotate],
                            }}
                            transition={{
                                duration: item.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative group"
                        >
                            {/* Glassmorphism card */}
                            <div
                                className="relative flex flex-col items-center justify-center rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-500"
                                style={{
                                    width: item.size,
                                    height: item.size,
                                }}
                            >
                                {/* Subtle glow behind icon */}
                                <div
                                    className="absolute rounded-full blur-xl opacity-30"
                                    style={{
                                        width: item.iconSize * 2,
                                        height: item.iconSize * 2,
                                        background:
                                            i % 3 === 0
                                                ? "rgba(0, 255, 224, 0.5)"
                                                : i % 3 === 1
                                                    ? "rgba(99, 102, 241, 0.5)"
                                                    : "rgba(232, 121, 249, 0.4)",
                                    }}
                                />

                                <Icon
                                    size={item.iconSize}
                                    className="relative z-10"
                                    style={{
                                        color:
                                            i % 3 === 0
                                                ? "rgba(0, 255, 224, 0.7)"
                                                : i % 3 === 1
                                                    ? "rgba(99, 102, 241, 0.7)"
                                                    : "rgba(232, 121, 249, 0.6)",
                                    }}
                                />

                                {item.label && (
                                    <span
                                        className="relative z-10 mt-1 text-[8px] font-bold tracking-wider uppercase"
                                        style={{
                                            color:
                                                i % 3 === 0
                                                    ? "rgba(0, 255, 224, 0.5)"
                                                    : i % 3 === 1
                                                        ? "rgba(99, 102, 241, 0.5)"
                                                        : "rgba(232, 121, 249, 0.4)",
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )
            })}
        </div>
    )
}
