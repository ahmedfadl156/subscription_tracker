import Image from "next/image"

const HowItWorks = () => {
    const steps = [
        {
            title: "1. Connect Accounts",
            description: "Easily track your digital services like Netflix, Spotify, and others. Keep all your subscriptions organized in one place.",
            icon: "/icons/accounts.png",
        },
        {
            title: "2. Track Spending",
            description: "Our AI automatically categorizes your transactions and identifies recurring payments. See exactly where your money is going with smart insights and visualizations.",
            icon: "/icons/analyze.png",
        },
        {
            title: "3. Save Money",
            description: "Discover hidden savings with personalized recommendations. We'll help you find unused subscriptions, negotiate better rates, and optimize your monthly spending.",
            icon: "/icons/save.png",
        }
    ]
    return (
        <section id="how-it-works" className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-[#111827]/30 border-y border-white/5 scroll-mt-24">
            <div className="mx-auto max-w-7xl ">
                {/* Header */}
                <div className="text-center">
                    <h2 className="font-bold text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed">How SubTrack Works</h2>
                    <p className="text-[#94A3B8] text-sm mt-2">Get control of your finances in three simple steps</p>
                </div>
                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-16">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-[#6366F1]/20 via-[#6366F1]/50 to-[#6366F1]/20 z-0"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-[#1F2937] border border-white/10 flex items-center justify-center mb-6 shadow-xl group hover:border-[#6366F1]/50 transition-all duration-300">
                                <Image src={step.icon} alt={step.title} width={32} height={32} />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-[280px]">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
