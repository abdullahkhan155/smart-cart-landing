import React from "react";
import { XCircle, Frown, Clock, HelpCircle } from "lucide-react";
import { Card, SectionTitle } from "@/components/ui";

const problems = [
    {
        title: "Finding Items",
        icon: <HelpCircle className="text-orange-400" size={24} />,
        desc: "Wandering aisles looking for that one specific spice.",
        gradient: "from-orange-500/20 to-orange-500/0"
    },
    {
        title: "Missing Deals",
        icon: <Frown className="text-red-400" size={24} />,
        desc: "Walking past sales without ever knowing they existed.",
        gradient: "from-red-500/20 to-red-500/0"
    },
    {
        title: "Checkout Lines",
        icon: <Clock className="text-yellow-400" size={24} />,
        desc: "The 15-minute wait just to pay for a few items.",
        gradient: "from-yellow-500/20 to-yellow-500/0"
    },
];

export function Problem() {
    return (
        <section className="px-4 py-24 relative overflow-hidden">
            <SectionTitle
                eyebrow="The Old Way"
                title="Shopping Shouldn't Be a Chore."
                subtitle="We've all been there. The friction of traditional retail needs a fix."
            />

            <div className="grid gap-4 max-w-md mx-auto relative z-10">
                {problems.map((item, i) => (
                    <Card key={i} className="p-1" glow={false}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`} />
                        <div className="relative p-5 flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg backdrop-blur-sm">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1.5 font-space">{item.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[60%] bg-red-500/5 blur-[100px] -z-10 rounded-full pointer-events-none" />
        </section>
    );
}
