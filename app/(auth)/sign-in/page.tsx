import SignInForm from "@/components/SignInForm"
import Image from "next/image"

const page = () => {
    return (
        <main className="bg-[#101122] relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0
            w-[500px] h-[500px] bg-[#6366F1]/20 rounded-full blur-[120px]
            pointer-events-none opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-[400px]
            h-[400px] bg-[#22D3EE]/20 rounded-full blur-[120px]
            pointer-events-none opacity-30"></div>

            {/* Sign In Card */}
            <div className="w-full max-w-[480px] z-10 p-4">
                <div className="bg-[#15152A]/80 backdrop-blur-xl border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-8 sm:p-10">
                        {/* Header */}
                        <div className="flex flex-col items-center justify-center text-center gap-2 mb-8">
                            <Image src="/icons/subscription.png" alt="App Logo" width={48} height={48} />
                            <h1 className="font-bold text-white text-2xl lg:text-3xl mt-4">Welcome back</h1>
                            <p className="text-[#94A3B8] text-sm ">Enter your details to manage your subscriptions.</p>
                        </div>
                        <SignInForm />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page