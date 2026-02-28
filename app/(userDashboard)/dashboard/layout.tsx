'use client'

import { useState } from "react"
import Sidebar, { MobileMenuButton } from "@/components/Dashboard/Sidebar"
import { Bell, Search } from "lucide-react"
import { useAuth } from "@/contexts/authContext"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-[#0B0F19] flex">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">

                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-6 py-3.5 flex items-center gap-4 shrink-0">
                    <MobileMenuButton onClick={() => setMobileOpen(true)} />

                    {/* Search */}
                    <div className="relative flex-1 max-w-sm hidden sm:block">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search subscriptions..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#6366F1]/50 focus:bg-white/8 transition-all duration-200"
                        />
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        {/* Notifications */}
                        <button className="relative p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#6366F1] rounded-full ring-2 ring-[#0B0F19]" />
                        </button>

                        {/* Greeting */}
                        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10">
                            <span className="text-sm text-white/50">
                                Hello, <span className="text-white font-medium">{user?.name?.split(" ")[0] ?? "there"}</span> 👋
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout