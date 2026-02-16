import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TryCart } from "@/components/TryCart";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[var(--accent)] selection:text-black font-sans overflow-x-hidden">
      <Header />
      <Hero />
      <TryCart />
      <Problem />
      <Features />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
