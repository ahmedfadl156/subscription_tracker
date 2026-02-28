import Image from "next/image"

const FeaturesSection = () => {
    const features = [
        {
            title: "Smart Alerts",
            description: "Get notified 3 days before a subscription ends or a price increases unexpectedly",
            icon: "/icons/bell.png",
            iconBg: "bg-[#22D3EE]/10",
            iconColor: "text-[#22D3EE]"
        },
        {
            title: "Spending Analytics",
            description: "Visualize your spending habits with beautiful, interactive charts and breakdown by category",
            icon: "/icons/analytics.png",
            iconBg: "bg-[#6366F1]/10",
            iconColor: "text-[#6366F1]"
        },
        {
            title: "One-Click Cancel",
            description: "Cancel unwanted subscriptions directly from the dashboard without the phone calls",
            icon: "/icons/error.png",
            iconBg: "bg-[#EF4444]/10",
            iconColor: "text-[#EF4444]"
        },
        {
            title: "Trial Tracker",
            description: "Never get surprise-charged again. Track all your free trials and get reminders before they convert to paid plans",
            icon: "/icons/clock.png",
            iconBg: "bg-[#F59E0B]/10",
            iconColor: "text-[#F59E0B]"
        },
    ]
    return (
        <section id="features" className="mx-auto max-w-7xl py-12 md:py-20 px-6 lg:px-8 scroll-mt-24">
            {/* Header */}
            <div className="mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Premium Features for Power Users</h2>
                <p className="text-[#94A3B8] text-sm">Everything you need to take control of your financial outflow.</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map(el => (
                    <div key={el.title} className="bg-[#111827] flex flex-col items-start p-6 border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                        <div className={`${el.iconBg} p-3 rounded-xl mb-4`}>
                            <Image src={el.icon} alt={el.title} width={24} height={24} />
                        </div>
                        <h3 className="text-white font-semibold text-xl mb-2">{el.title}</h3>
                        <p className="text-[#94A3B8] text-sm leading-relaxed">{el.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturesSection