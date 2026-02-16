import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";

export function CTA() {
    return (
        <section className="px-6 py-24 pb-48 relative overflow-hidden text-center">
            {/* Ambient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent)]/10" />

            <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6 tracking-tighter font-space leading-tight">
                    Ready to Upgrade <br /> Your Store?
                </h2>
                <p className="text-white/60 text-lg mb-10 max-w-xs mx-auto">
                    Walk the aisles, see promos land, and finish checkout on-cart.
                </p>

                <div className="flex justify-center" id="demo-form">
                    <Button className="h-16 px-8 text-xl font-bold bg-white text-black rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform w-full max-w-xs">
                        Book a Demo <ArrowRight className="ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
