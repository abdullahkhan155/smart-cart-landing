import React from "react";
import { ShoppingCart } from "lucide-react";

export function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/[0.08] bg-black/40 text-center">
            <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 text-white font-bold text-xl">
                    <ShoppingCart className="w-6 h-6 text-white/80" />
                    <span>Vexa</span>
                </div>

                <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                    The AI-powered smart cart assistant for grocery, fashion, and retail.
                </p>

                <div className="text-xs text-white/20 mt-8">
                    © {new Date().getFullYear()} Vexa AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
