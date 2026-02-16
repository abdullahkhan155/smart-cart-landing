import React from "react";
import { Mic, Sparkles, ScanLine, CreditCard, ShieldCheck } from "lucide-react";
import { Card, SectionTitle } from "@/components/ui";

const steps = [
    {
        k: "01",
        title: "Ask in aisle",
        subtitle: "AI voice assistant",
        icon: <Mic size={20} />,
        accent: "#00FFD1",
        body: "Find products and navigate aisles hands-free with AI.",
    },
    {
        k: "02",
        title: "Get Personalized Promos",
        subtitle: "Deals as you shop",
        icon: <Sparkles size={20} />,
        accent: "#FFAA50",
        body: "Personalized offers triggered by your location in-store.",
    },
    {
        k: "03",
        title: "Scan as you pick",
        subtitle: "Real-time total",
        icon: <ScanLine size={20} />,
        accent: "#00FFD1",
        body: "Scan items as you go with a running total in real time.",
    },
    {
        k: "04",
        title: "Pay on cart",
        subtitle: "No-lane checkout",
        icon: <CreditCard size={20} />,
        accent: "#A078FF",
        body: "Tap to pay on the cart and walk out. No lanes, no waiting.",
    },
    {
        k: "05",
        title: "Secure every basket",
        subtitle: "Vision verification",
        icon: <ShieldCheck size={20} />,
        accent: "#00BE78",
        body: "Weight sensors and computer vision verify every item seamlessly.",
    },
];

export function HowItWorks() {
    return (
        <section className="px-4 py-24 relative overflow-hidden bg-black/20">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[var(--accent)]/5 blur-[120px] pointer-events-none rounded-full" />

            <SectionTitle
                eyebrow="Process"
                title="From Aisle to Exit, Reimagined."
                subtitle="A cart that helps first, sells smarter, and ends the trip without a line."
            />

            <div className="flex flex-col gap-8 relative z-10 max-w-sm mx-auto">
                <div className="absolute left-[27px] top-8 bottom-8 w-[2px] bg-white/5 rounded-full" />

                {steps.map((step, i) => (
                    <div key={i} className="relative pl-16">
                        {/* Timeline node */}
                        <div
                            className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                        >
                            <div className="text-[var(--accent)]" style={{ color: step.accent }}>
                                {step.icon}
                            </div>
                        </div>

                        <Card className="p-5 flex flex-col gap-3" glow={false}>
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-white font-space">{step.title}</h3>
                                <span className="text-[10px] font-bold text-white/20 font-space mt-1">{step.k}</span>
                            </div>

                            <p className="text-xs font-bold uppercase tracking-wider opacity-80" style={{ color: step.accent }}>
                                {step.subtitle}
                            </p>

                            <p className="text-sm text-white/60 leading-relaxed font-medium">
                                {step.body}
                            </p>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
}
