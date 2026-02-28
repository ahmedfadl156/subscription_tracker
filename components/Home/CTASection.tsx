import Link from "next/link"
import { Button } from "../ui/button"

const CTASection = () => {
    return (
        <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 border-b border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="relative isolate overflow-hidden bg-[#111827] rounded-3xl shadow-2xl px-6 py-12 sm:px-12 xl:py-16 mb-16 border border-white/5">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),theme(colors.slate.900))] opacity-40"></div>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">Ready to stop losing money?</h2>
                    <p className="text-sm lg:text-base max-w-xl text-[#94A3B8] leading-relaxed my-6">Join 15,000+ users saving an average of $600/year with SubTrack Pro.</p>
                    <Link href="/sign-up">
                        <Button className="bg-white mt-3 text-[#0B0F19] px-8 py-6 hover:bg-white/80 cursor-pointer hover:shadow-2xl hover:-translate-y-1">Get started for free</Button>
                    </Link>
                </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection