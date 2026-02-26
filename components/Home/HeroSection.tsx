import { ArrowRight, PlayCircle } from "lucide-react"
import { Button } from "../ui/button"

const HeroSection = () => {
    return (
        <section className="mx-auto max-w-7xl flex flex-col items-center justify-center px-6 lg:px-8 pt12 pb-24 text-center">
            {/* badge */}
            <div className="bg-white/5 flex items-center gap-2 rounded-full w-fit px-4 py-1">
                <span className="bg-[#22D3EE] w-2 h-2 rounded-full animate-pulse"></span>
                <p className="text-sm font-medium text-primary">v1.0 is now live</p>
            </div>
            {/* Heading */}
            <h1 className="text-5xl leading-20 md:tex-6xl lg:text-7xl font-bold text-white max-w-4xl mt-6">
                Track. Optimize. <br />
                <span className="bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-transparent bg-clip-text">
                    Control Your Subscriptions
                </span>
            </h1>

            {/* subHeading */}
            <p className="text-[#94A3B8] text-base max-w-xl mt-6 leading-relaxed">
                The premium dashboard to manage all your recurring expenses in one place.
                Stop wating money on forgotten subscriptions today with subTrack.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
                <button className="bg-primary text-white text-base flex items-center gap-2 px-6 py-3 rounded-xl shadow-md border border-white/10 cursor-pointer hover:bg-primary/80 transition-colors">
                    Start Tracking
                    <ArrowRight className="size-4"/>
                </button>
                <button className="bg-[#111827] text-white text-base flex items-center gap-2 px-7 py-3 rounded-xl shadow-md border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                    <PlayCircle className="size-4 text-[#22D3EE]"/>
                    View Demo
                </button>
            </div>
        </section>
    )
}

export default HeroSection