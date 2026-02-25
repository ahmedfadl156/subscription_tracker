import HeroSection from "@/components/Home/HeroSection";

export default function Home() {
  return (
    <main className="relative pt-24 pb-16">
      {/* Background*/}
      <div className="absolute top-0 left-1/2 -translate-x-1/2
      w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px]
      -z-10 pointer-events-none opacity-40"></div>
      <div className="absolute top-40 right-0 w-[500px]
      h-[500px] bg-secondary/10 rounded-full blur-[100px]
      -z-10 pointer-events-none opacity-30"></div>
      <HeroSection />
    </main>
  );
}
