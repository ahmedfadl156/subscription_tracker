'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/authContext"
import { toast } from "sonner"
import {
    LayoutDashboard,
    CreditCard,
    BarChart3,
    Bell,
    Settings,
    LogOut,
    X,
    Menu,
    ChevronRight,
} from "lucide-react"

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/subscriptions", label: "Subscriptions", icon: CreditCard },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const Avatar = ({ name }: { name?: String }) => {
    const initials = name
        ? name.trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
        : "?"
    return (
        <div className="w-9 h-9 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-sm font-bold select-none shrink-0 ring-2 ring-[#6366F1]/30">
            {initials}
        </div>
    )
}

interface SidebarProps {
    mobileOpen: boolean
    setMobileOpen: (open: boolean) => void
}

const SidebarContent = ({ setMobileOpen }: { setMobileOpen?: (open: boolean) => void }) => {
    const pathname = usePathname()
    const router = useRouter()
    const { user, signOut } = useAuth()

    const handleLogout = async () => {
        try {
            await signOut()
            toast.success("Signed out successfully")
            router.push("/")
        } catch {
            toast.error("Sign out failed. Please try again.")
        }
    }

    return (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-white/5 shrink-0">
                <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen?.(false)}>
                    <Image src="/Images/Logo.png" alt="Logo" width={30} height={30} className="group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-xl font-bold text-white">SubTrack</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-3 mb-3">Main Menu</p>
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen?.(false)}
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative
                                ${isActive
                                    ? "bg-[#6366F1]/15 text-white"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#6366F1] rounded-r-full" />
                            )}
                            <Icon
                                className={`w-4.5 h-4.5 shrink-0 transition-colors duration-200 ${isActive ? "text-[#6366F1]" : "text-white/40 group-hover:text-white/70"}`}
                                size={18}
                            />
                            <span>{label}</span>
                            {isActive && <ChevronRight size={14} className="ml-auto text-[#6366F1]/60" />}
                        </Link>
                    )
                })}
            </nav>

            {/* User Footer */}
            <div className="px-3 pb-5 pt-3 border-t border-white/5 shrink-0">
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 mb-3">
                    {user?.profileImage ? (
                        <Image src={user.profileImage} alt="Profile" width={36} height={36} className="rounded-full shrink-0" />
                    ) : (
                        <Avatar name={user?.name} />
                    )}
                    <div className="min-w-0 flex-1">
                        <p className="text-white text-sm font-semibold truncate">{user?.name || "User"}</p>
                        <p className="text-white/40 text-xs truncate">{String(user?.email ?? "")}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
                >
                    <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

const Sidebar = ({ mobileOpen, setMobileOpen }: SidebarProps) => {
    const overlayRef = useRef<HTMLDivElement>(null)

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) setMobileOpen(false)
    }

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false) }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [setMobileOpen])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [mobileOpen])

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-[#0D1120] border-r border-white/5">
                <SidebarContent />
            </aside>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    ref={overlayRef}
                    onClick={handleOverlayClick}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    aria-hidden="true"
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#0D1120] border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
                    aria-label="Close sidebar"
                >
                    <X size={18} />
                </button>
                <SidebarContent setMobileOpen={setMobileOpen} />
            </aside>
        </>
    )
}

export default Sidebar

export const MobileMenuButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="lg:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
        aria-label="Open sidebar"
    >
        <Menu size={20} />
    </button>
)
