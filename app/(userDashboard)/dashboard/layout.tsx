'use client'

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Sidebar, { MobileMenuButton } from "@/components/Dashboard/Sidebar"
import { Bell, Search, CheckCheck, CheckCircle2, AlertTriangle, Info, XCircle, ArrowRight, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/authContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUserNotifications, markNotificationsAsRead, Notification } from "@/services/notifications"
import { toast } from "sonner"
import { timeAgo } from "@/lib/utils"


const typeIcon: Record<string, React.ElementType> = {
    success: CheckCircle2,
    warning: AlertTriangle,
    info: Info,
    error: XCircle,
}
const typeColor: Record<string, string> = {
    success: "text-emerald-400",
    warning: "text-amber-400",
    info: "text-blue-400",
    error: "text-red-400",
}
const typeBg: Record<string, string> = {
    success: "bg-emerald-500/10",
    warning: "bg-amber-500/10",
    info: "bg-blue-500/10",
    error: "bg-red-500/10",
}


const NotificationBell = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ["notifications"],
        queryFn: getUserNotifications,
        refetchInterval: 60_000,
    })

    const notifications: Notification[] = data?.data?.notifications ?? []
    const unreadCount: number = data?.data?.unreadCount ?? 0
    const preview = notifications.slice(0, 5)

    const markMutation = useMutation({
        mutationFn: (id?: string) => markNotificationsAsRead(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
            if (!id) toast.success("All notifications marked as read")
        },
        onError: () => toast.error("Failed to mark as read"),
    })

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="relative p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Notifications"
            >
                <Bell size={18} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center rounded-full bg-[#6366F1] text-[9px] font-bold text-white ring-2 ring-[#0B0F19] shadow-lg shadow-[#6366F1]/40">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#0D1120] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <Bell size={14} className="text-[#6366F1]" />
                            <span className="text-sm font-semibold text-white">Notifications</span>
                            {unreadCount > 0 && (
                                <span className="px-1.5 py-0.5 rounded-full bg-[#6366F1]/15 text-[#6366F1] text-[10px] font-bold">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={() => markMutation.mutate(undefined)}
                                disabled={markMutation.isPending}
                                className="flex items-center gap-1 text-[11px] text-white/40 hover:text-white/70 transition-colors duration-200 disabled:opacity-50"
                            >
                                {markMutation.isPending
                                    ? <Loader2 size={11} className="animate-spin" />
                                    : <CheckCheck size={11} />
                                }
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-white/5 scrollbar-hide">
                        {preview.length === 0 ? (
                            <div className="py-10 text-center">
                                <Bell size={24} className="text-white/15 mx-auto mb-2" />
                                <p className="text-white/30 text-xs">No notifications yet</p>
                            </div>
                        ) : (
                            preview.map((n) => {
                                const Icon = typeIcon[n.type] ?? Info
                                return (
                                    <div
                                        key={n._id}
                                        className={`flex gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150 ${!n.isRead ? "bg-[#6366F1]/5" : ""}`}
                                    >
                                        <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 ${typeBg[n.type] ?? "bg-blue-500/10"}`}>
                                            <Icon size={13} className={typeColor[n.type] ?? "text-blue-400"} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-medium leading-snug truncate ${n.isRead ? "text-white/60" : "text-white"}`}>
                                                {n.title}
                                            </p>
                                            <p className="text-[11px] text-white/35 truncate mt-0.5">{n.message}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-white/25">{timeAgo(n.createdAt)}</span>
                                                {!n.isRead && (
                                                    <button
                                                        onClick={() => markMutation.mutate(n._id)}
                                                        className="text-[10px] text-[#6366F1]/60 hover:text-[#6366F1] transition-colors duration-150"
                                                    >
                                                        Mark read
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {!n.isRead && (
                                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-2 shadow-sm shadow-[#6366F1]/50" />
                                        )}
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-white/5 px-4 py-2.5">
                        <Link
                            href="/dashboard/alerts"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors duration-200 py-1"
                        >
                            View all notifications
                            <ArrowRight size={11} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}


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
                        <NotificationBell />

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
