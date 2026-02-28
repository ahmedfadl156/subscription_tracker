import CTASection from "@/components/Home/CTASection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden pt-24 pb-16">
      {/* Background*/}
      <div className="absolute top-0 left-1/2 -translate-x-1/2
      w-[800px] h-[500px] bg-[#6366F1]/20 rounded-full blur-[120px]
      pointer-events-none opacity-40"></div>
      <div className="absolute top-40 right-0 w-[500px]
      h-[500px] bg-[#22D3EE]/20 rounded-full blur-[120px]
      pointer-events-none opacity-30"></div>
      <HeroSection />
      <Separator className="bg-white/10" />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
    </main>
  );
}
