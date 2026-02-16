import React from "react";
import { MapPin, Sparkles, CreditCard, Zap } from "lucide-react";
import { Card, SectionTitle } from "@/components/ui";

const features = [
    {
        title: "Indoor Navigation",
        desc: "Find any item with turn-by-turn guidance.",
        icon: <MapPin className="text-[var(--accent)]" size={24} />,
        gradient: "from-[var(--accent)]/20 to-transparent"
    },
    {
        title: "Instant Deals",
        desc: "Promos that pop up right when you need them.",
        icon: <Sparkles className="text-amber-400" size={24} />,
        gradient: "from-amber-500/20 to-transparent"
    },
    {
        title: "Skip the Line",
        desc: "Pay directly on the cart and just walk out.",
        icon: <CreditCard className="text-purple-400" size={24} />,
        gradient: "from-purple-500/20 to-transparent"
    },
    {
        title: "Always On",
        desc: "15-hour battery life and rapid charging.",
        icon: <Zap className="text-blue-400" size={24} />,
        gradient: "from-blue-500/20 to-transparent"
    }
];

export function Features() {
    return (
        <section className="px-4 py-24 pb-32">
            <SectionTitle
                eyebrow="Features"
                title="Everything You Need To Shop Smarter."
                subtitle="Built for the modern shopper, designed for efficiency."
            />

            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {features.map((feat, i) => (
                    <Card key={i} className="group p-1" glow={false}>
                        <div className={`absolute inset-0 bg-gradient-to-r ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative p-5 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                {feat.icon}
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-bold text-white leading-tight font-space mb-1.5">{feat.title}</h3>
                                <p className="text-sm text-white/50 leading-snug font-medium">{feat.desc}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
