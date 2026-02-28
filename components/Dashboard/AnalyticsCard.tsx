import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface AnalyticsCardProps {
    title: string
    value: string | number
    subtitle?: string
    icon: LucideIcon
    iconColor: string
    iconBg: string
    trend?: {
        value: string
        positive: boolean
    }
    prefix?: string
    loading?: boolean
    children?: ReactNode
}

const AnalyticsCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor,
    iconBg,
    trend,
    prefix = "",
    loading = false,
    children
}: AnalyticsCardProps) => {
    if (loading) {
        return (
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 animate-pulse">
                <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/10" />
                    <div className="w-16 h-5 rounded-full bg-white/10" />
                </div>
                <div className="w-24 h-8 rounded-lg bg-white/10 mb-2" />
                <div className="w-32 h-4 rounded-md bg-white/5" />
            </div>
        )
    }

    return (
        <div className="group relative bg-[#111827] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 overflow-hidden">
            {/* Subtle glow */}
            <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                style={{ backgroundColor: iconColor }}
            />

            {/* Top Row */}
            <div className="flex items-start justify-between mb-5">
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: iconBg }}
                >
                    <Icon size={20} style={{ color: iconColor }} strokeWidth={1.8} />
                </div>

                {trend && (
                    <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${trend.positive
                                ? "text-emerald-400 bg-emerald-400/10"
                                : "text-red-400 bg-red-400/10"
                            }`}
                    >
                        {trend.positive ? "↑" : "↓"} {trend.value}
                    </span>
                )}
            </div>

            {/* Value */}
            <p className="text-3xl font-bold text-white tracking-tight mb-1">
                {prefix}<span>{value ?? "—"}</span>
            </p>

            {/* Title */}
            <p className="text-sm font-medium text-white/40">{title}</p>

            {/* Optional subtitle */}
            {subtitle && (
                <p className="text-xs text-white/30 mt-0.5">{subtitle}</p>
            )}

            {/* Slot for extra content (mini chart, progress, etc.) */}
            {children && <div className="mt-4">{children}</div>}
        </div>
    )
}

export default AnalyticsCard
