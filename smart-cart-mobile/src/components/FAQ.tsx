import React from "react";
import { ChevronDown } from "lucide-react";
import { SectionTitle } from "@/components/ui";

const faqs = [
    {
        q: "Does this replace self-checkout?",
        a: "The cart handles most trips on-board. Lanes stay for edge cases: large returns, cash, or age-gated items."
    },
    {
        q: "How do promos stay relevant?",
        a: "Offers trigger by aisle and basket intent. If the basket changes, promos re-rank instantly."
    },
    {
        q: "Is payment secure?",
        a: "All sessions are encrypted, and payments run through standard secure PCI stacks."
    },
    {
        q: "What if Wi-Fi drops?",
        a: "The cart works offline-first. Guidance and scanning continue, then sync when signal returns."
    },
    {
        q: "How fast can we pilot?",
        a: "Most stores are ready in weeks with drop-in mounts and a simple SKU sync."
    }
];

export function FAQ() {
    return (
        <section className="px-4 py-24 pb-40">
            <SectionTitle
                eyebrow="FAQ"
                title="Common Questions"
                subtitle="Everything you need to know about deploying Vexa."
            />

            <div className="flex flex-col gap-3 max-w-lg mx-auto">
                {faqs.map((item, i) => (
                    <details
                        key={i}
                        className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden open:bg-white/[0.05] open:border-white/10 transition-all duration-300"
                    >
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none text-left select-none">
                            <span className="font-bold text-white/90 font-space pr-4 text-sm">{item.q}</span>
                            <ChevronDown className="text-white/40 transition-transform group-open:rotate-180 shrink-0" size={18} />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed font-medium">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
