import { ArrowRight, PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const HeroSection = () => {
    return (
        <>
            <section className="mx-auto max-w-7xl flex flex-col items-center justify-center px-6 lg:px-8 pt-12 sm:pt-16 pb-12 sm:pb-16 text-center">
                {/* Badge */}
                <div className="bg-white/5 border border-white/10 flex items-center gap-2 rounded-full w-fit px-4 py-1.5 mb-6">
                    <span className="bg-[#22D3EE] w-2 h-2 rounded-full animate-pulse" />
                    <p className="text-xs sm:text-sm font-medium text-[#22D3EE] tracking-wide">v1.0 is now live</p>
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight tracking-tight">
                    Track. Optimize.{" "}
                    <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-transparent bg-clip-text">
                        Control Your Subscriptions
                    </span>
                </h1>

                {/* Sub-heading */}
                <p className="text-[#94A3B8] text-sm sm:text-base max-w-lg sm:max-w-xl mt-5 leading-relaxed">
                    The premium dashboard to manage all your recurring expenses in one place.
                    Stop wasting money on forgotten subscriptions today with subTrack.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
                    <Link
                        href="/sign-up"
                        className="w-full sm:w-auto bg-primary text-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 px-7 py-3 rounded-xl shadow-lg border border-white/10 cursor-pointer hover:bg-primary/80 transition-all duration-200 hover:shadow-primary/30 hover:shadow-xl"
                    >
                        Start Tracking Free
                        <ArrowRight className="size-4" />
                    </Link>
                    <button className="w-full sm:w-auto bg-white/5 text-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-200">
                        <PlayCircle className="size-4 text-[#22D3EE]" />
                        View Demo
                    </button>
                </div>

                {/* Social proof */}
                <p className="text-[#64748B] text-xs mt-6 tracking-wide">
                    No credit card required &nbsp;·&nbsp; Free forever plan available
                </p>
            </section>

            {/*Dashboard Image Section*/}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
                <div className="relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[60%] h-24 bg-[#6366F1]/30 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute -top-6 left-1/4 w-[30%] h-16 bg-[#22D3EE]/20 blur-[60px] rounded-full pointer-events-none" />

                    {/* Image card */}
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 ring-1 ring-white/5">
                        <div className="relative w-full aspect-video">
                            <Image
                                src="/Images/dashboard.png"
                                alt="subTrack Dashboard Preview"
                                fill
                                priority
                                className="object-cover object-top"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection
