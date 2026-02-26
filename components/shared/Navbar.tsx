'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { useAuth } from "@/contexts/authContext"

const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => (
    <Link
        href={href}
        onClick={onClick}
        className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
    >
        {label}
    </Link>
)

const Avatar = ({ name }: { name?: String }) => {
    const initials = name
        ? name.trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
        : "?"
    return (
        <div className="w-9 h-9 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-sm font-bold select-none ring-2 ring-[#6366F1]/40 transition-all duration-200 group-hover:ring-[#6366F1]/80">
            {initials}
        </div>
    )
}

const Navbar = () => {
    const { user, isLoading } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#how-it-works", label: "How it Works" },
        { href: "#about", label: "About" },
    ]

    return (
        <nav className="bg-[#0B0F19]/80 border-b border-white/5 backdrop-blur-md shadow-md w-full px-6 md:px-16 py-4 relative z-50">
            <div className="flex items-center justify-between">

                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Image src="/Images/Logo.png" alt="Logo" width={32} height={32} />
                    <span className="text-xl font-bold text-white">SubTrack</span>
                </Link>

                <ul className="hidden md:flex items-center gap-10">
                    {navLinks.map((l) => (
                        <li key={l.href}>
                            <NavLink href={l.href} label={l.label} />
                        </li>
                    ))}
                </ul>

                <div className="hidden md:flex items-center gap-4">
                    {isLoading ? (
                        <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
                    ) : user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((o) => !o)}
                                className="group flex items-center gap-2 rounded-full focus:outline-none"
                                aria-label="User menu"
                            >
                                {user?.profileImage ? (
                                    <Image src={user?.profileImage} alt="Profile" width={32} height={32} className="rounded-full"/>
                                ) : (
                                    <Avatar name={user?.name} />
                                )}
                                <svg
                                    className={`w-4 h-4 text-white/50 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                className={`absolute right-0 mt-3 w-64 rounded-xl border border-white/10 bg-[#0D1120]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden transition-all duration-200 origin-top-right
                                    ${dropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
                            >
                                <div className="px-4 py-4 border-b border-white/10 flex items-center gap-3">
                                    {user?.profileImage ? (
                                        <Image src={user?.profileImage} alt="Profile" width={32} height={32} className="rounded-full"/>
                                    ) : (
                                        <Avatar name={user?.name} />
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-white text-sm font-semibold truncate">{user.name || "User"}</p>
                                        <p className="text-white/40 text-xs truncate">{String(user.email)}</p>
                                    </div>
                                </div>

                                <div className="py-2">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-150"
                                    >
                                        <svg className="w-4 h-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </div>

                                <div className="border-t border-white/10 py-2">
                                    <button
                                        onClick={() => { setDropdownOpen(false);  }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-150"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <Button className="text-white cursor-pointer" variant="ghost">Sign In</Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button className="bg-[#6366F1] hover:bg-[#6366F1]/80 cursor-pointer">Sign Up</Button>
                            </Link>
                        </>
                    )}
                </div>

                <button
                    onClick={() => setMobileOpen((o) => !o)}
                    className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] focus:outline-none group"
                    aria-label="Toggle menu"
                >
                    <span className={`block h-[2px] w-6 bg-white rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                    <span className={`block h-[2px] w-6 bg-white rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-[2px] w-6 bg-white rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                </button>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
            >
                <div className="rounded-xl border border-white/10 bg-[#0D1120]/95 backdrop-blur-xl divide-y divide-white/10">
                    {/* nav links */}
                    <div className="px-4 py-3 flex flex-col gap-4 items-center justify-center">
                        {navLinks.map((l) => (
                            <NavLink key={l.href} href={l.href} label={l.label} onClick={() => setMobileOpen(false)} />
                        ))}
                    </div>

                    {isLoading ? (
                        <div className="px-4 py-4">
                            <div className="h-8 bg-white/10 rounded animate-pulse" />
                        </div>
                    ) : user ? (
                        <>
                            <div className="px-4 py-4 flex items-center gap-3">
                                {user?.profileImage ? (
                                    <Image src={user?.profileImage} alt="Profile" width={32} height={32} className="rounded-full"/>
                                ) : (
                                    <Avatar name={user?.name} />
                                )}
                                <div className="min-w-0">
                                    <p className="text-white text-sm font-semibold truncate">{user.name || "User"}</p>
                                    <p className="text-white/40 text-xs truncate">{String(user.email)}</p>
                                </div>
                            </div>
                            <div className="px-4 py-3 flex flex-col gap-1">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white py-2 transition-colors"
                                >
                                    <svg className="w-4 h-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => { setMobileOpen(false); /* call signOut here */ }}
                                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 py-2 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="px-4 py-4 flex flex-col gap-3">
                            <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full text-white cursor-pointer" variant="ghost">Sign In</Button>
                            </Link>
                            <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full bg-[#6366F1] hover:bg-[#6366F1]/80 cursor-pointer">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar