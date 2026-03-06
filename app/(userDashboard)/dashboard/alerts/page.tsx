'use client'

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUserNotifications, markNotificationsAsRead, Notification } from "@/services/notifications"
import {
    Bell,
    CheckCheck,
    CheckCircle2,
    AlertTriangle,
    Info,
    XCircle,
    Inbox,
    Loader2,
    Calendar,
    Sparkles,
} from "lucide-react"
import { toast } from "sonner"
import { timeAgo } from "@/lib/utils"

const typeConfig: Record<
    string,
    { icon: React.ElementType; color: string; bg: string; glow: string; label: string }
> = {
    success: {
        icon: CheckCircle2,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        glow: "shadow-emerald-500/20",
        label: "Success",
    },
    warning: {
        icon: AlertTriangle,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        glow: "shadow-amber-500/20",
        label: "Warning",
    },
    info: {
        icon: Info,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        glow: "shadow-blue-500/20",
        label: "Info",
    },
    error: {
        icon: XCircle,
        color: "text-red-400",
        bg: "bg-red-500/10",
        glow: "shadow-red-500/20",
        label: "Error",
    },
}

const getConfig = (type: string) => typeConfig[type] ?? typeConfig.info


const NotificationCard = ({
    notification,
    onMarkRead,
}: {
    notification: Notification
    onMarkRead: (id: string) => void
}) => {
    const cfg = getConfig(notification.type)
    const Icon = cfg.icon
    const time = timeAgo(notification.createdAt)

    return (
        <div
            className={`group relative flex gap-4 p-4 rounded-2xl border transition-all duration-300
                ${notification.isRead
                    ? "bg-white/2 border-white/5 hover:border-white/10 hover:bg-white/4"
                    : "bg-[#6366F1]/5 border-[#6366F1]/20 hover:border-[#6366F1]/30 hover:bg-[#6366F1]/8"
                }`}
        >
            {/* Unread dot */}
            {!notification.isRead && (
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#6366F1] shadow-lg shadow-[#6366F1]/40 ring-2 ring-[#0B0F19]" />
            )}

            {/* Icon */}
            <div
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${cfg.bg} ${cfg.glow}`}
            >
                <Icon size={18} className={cfg.color} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm font-semibold leading-snug ${notification.isRead ? "text-white/70" : "text-white"}`}>
                        {notification.title}
                    </p>
                    <span
                        className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} border-current/20`}
                    >
                        {cfg.label}
                    </span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-2">{notification.message}</p>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] text-white/30">
                        <Calendar size={11} />
                        {time}
                    </span>
                    {!notification.isRead && (
                        <button
                            onClick={() => onMarkRead(notification._id)}
                            className="flex items-center gap-1 text-[11px] text-[#6366F1]/70 hover:text-[#6366F1] transition-colors duration-200 underline underline-offset-2"
                        >
                            <CheckCheck size={11} />
                            Mark as read
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}


const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl">
            <Inbox size={32} className="text-white/20" />
        </div>
        <p className="text-white/60 font-semibold text-lg mb-1">All caught up!</p>
        <p className="text-white/30 text-sm max-w-xs">
            You have no notifications right now. We'll let you know when something needs your attention.
        </p>
    </div>
)


const SkeletonCard = () => (
    <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/2 animate-pulse">
        <div className="w-10 h-10 rounded-xl bg-white/5 shrink-0" />
        <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-white/5 rounded-full w-3/5" />
            <div className="h-3 bg-white/5 rounded-full w-4/5" />
            <div className="h-3 bg-white/5 rounded-full w-1/3" />
        </div>
    </div>
)


type FilterType = "all" | "unread" | "read"

const FilterTabs = ({
    active,
    setActive,
    unreadCount,
}: {
    active: FilterType
    setActive: (f: FilterType) => void
    unreadCount: number
}) => {
    const tabs: { key: FilterType; label: string }[] = [
        { key: "all", label: "All" },
        { key: "unread", label: "Unread" },
        { key: "read", label: "Read" },
    ]
    return (
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
            {tabs.map((t) => (
                <button
                    key={t.key}
                    onClick={() => setActive(t.key)}
                    className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                        ${active === t.key
                            ? "bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/30"
                            : "text-white/40 hover:text-white/60"
                        }`}
                >
                    {t.label}
                    {t.key === "unread" && unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-[10px] font-bold">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </button>
            ))}
        </div>
    )
}


export default function AlertsPage() {
    const queryClient = useQueryClient()
    const [filter, setFilter] = useState<FilterType>("all")

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notifications"],
        queryFn: getUserNotifications,
    })

    const notifications = data?.data?.notifications ?? []
    const unreadCount = data?.data?.unreadCount ?? 0

    const markReadMutation = useMutation({
        mutationFn: (id?: string) => markNotificationsAsRead(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
            if (id) {
                toast.success("Notification marked as read")
            } else {
                toast.success("All notifications marked as read")
            }
        },
        onError: () => toast.error("Failed to mark notifications as read"),
    })

    const filtered = notifications.filter((n) => {
        if (filter === "unread") return !n.isRead
        if (filter === "read") return n.isRead
        return true
    })

    return (
        <div className="max-w-2xl mx-auto lg:max-w-none">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-9 h-9 rounded-xl bg-[#6366F1]/15 border border-[#6366F1]/20 flex items-center justify-center shadow-lg shadow-[#6366F1]/10">
                        <Bell size={17} className="text-[#6366F1]" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Notifications</h1>
                    {unreadCount > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/25 text-[#6366F1] text-xs font-semibold">
                            <Sparkles size={10} />
                            {unreadCount} new
                        </span>
                    )}
                </div>
                <p className="text-white/40 text-sm ml-12">
                    Stay on top of your subscription activity
                </p>
            </div>

            {/*  Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                <FilterTabs active={filter} setActive={setFilter} unreadCount={unreadCount} />

                {unreadCount > 0 && (
                    <button
                        onClick={() => markReadMutation.mutate(undefined)}
                        disabled={markReadMutation.isPending}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {markReadMutation.isPending ? (
                            <Loader2 size={13} className="animate-spin" />
                        ) : (
                            <CheckCheck size={13} />
                        )}
                        Mark all as read
                    </button>
                )}
            </div>

            {/* Content*/}
            {isLoading ? (
                <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                        <XCircle size={28} className="text-red-400" />
                    </div>
                    <p className="text-white/60 font-semibold mb-1">Failed to load notifications</p>
                    <p className="text-white/30 text-sm">Please refresh the page and try again.</p>
                </div>
            ) : filtered.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-3">
                    {filtered.map((n) => (
                        <NotificationCard
                            key={n._id}
                            notification={n}
                            onMarkRead={(id) => markReadMutation.mutate(id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
