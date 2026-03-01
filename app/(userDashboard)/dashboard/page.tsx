"use client";
import { useEffect, useState } from "react"
import { getSpendingDetails } from "@/services/subscriptions"
import AnalyticsCard from "@/components/Dashboard/AnalyticsCard"
import { DollarSign, CreditCard, CalendarClock, ArrowRight, TrendingUp } from "lucide-react"
import SpendingStatistics from "@/components/Dashboard/SpendingStatistics";
import QuickStatsCard from "@/components/Dashboard/QuickStatsCard";
import { CategoryBreakdown } from "@/components/Dashboard/CategoryBreakdown";

interface CategoryData {
    category: string
    subscriptionsCount: number
    countPercentage: string
    totalSpent: number
    costPercentage: string
}

interface UpcomingRenewal {
    name: string
    renewalDate: string
    cost: number
    price?: number
    category?: string
}

interface SpendingDetails {
    status: string
    totalSubscriptions: number
    activeSubscriptions: number
    totalCost: number
    upcomingCount: number
    upcomingRenewals: UpcomingRenewal[]
    data: CategoryData[]
}

const categoryColors: Record<string, { bg: string; bar: string; hex: string }> = {
    entertainment: { bg: "bg-[#6366F1]/10", bar: "bg-[#6366F1]", hex: "#6366F1" },
    education: { bg: "bg-[#22D3EE]/10", bar: "bg-[#22D3EE]", hex: "#22D3EE" },
    productivity: { bg: "bg-[#F59E0B]/10", bar: "bg-[#F59E0B]", hex: "#F59E0B" },
    health: { bg: "bg-[#10B981]/10", bar: "bg-[#10B981]", hex: "#10B981" },
    finance: { bg: "bg-[#EF4444]/10", bar: "bg-[#EF4444]", hex: "#EF4444" },
    other: { bg: "bg-[#A78BFA]/10", bar: "bg-[#A78BFA]", hex: "#A78BFA" },
}
const defaultColor = { bg: "bg-white/10", bar: "bg-white/40", hex: "#6B7280" }

// Deterministic urgency: days until renewal
function daysUntil(dateStr: string): number {
    const now = new Date()
    const target = new Date(dateStr)
    return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

const DashboardPage = () => {
    const [spendingDetails, setSpendingDetails] = useState<SpendingDetails | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSpendingDetails = async () => {
            try {
                const data = await getSpendingDetails()
                setSpendingDetails(data)
            } catch (error) {
                console.error("Error fetching spending details:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchSpendingDetails()
    }, [])

    return (
        <div className="space-y-8">
            {/* Page Header  */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Overview</h1>
                    <p className="text-sm text-white/40 mt-1">Track all your subscriptions at a glance</p>
                </div>
                <span className="hidden sm:block text-xs text-white/20 font-mono">
                    {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
            </div>

            {/* Cards  */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnalyticsCard
                    title="Monthly Spending"
                    value={spendingDetails?.totalCost?.toFixed(2) ?? "0.00"}
                    prefix="$"
                    icon={DollarSign}
                    iconColor="#6366F1"
                    iconBg="rgba(99,102,241,0.12)"
                    loading={loading}
                    subtitle="Across all active subscriptions"
                />
                <AnalyticsCard
                    title="Active Subscriptions"
                    value={spendingDetails?.activeSubscriptions ?? 0}
                    icon={CreditCard}
                    iconColor="#22D3EE"
                    iconBg="rgba(34,211,238,0.12)"
                    loading={loading}
                    subtitle="Currently tracked services"
                />
                <AnalyticsCard
                    title="Upcoming Renewals"
                    value={spendingDetails?.upcomingCount ?? 0}
                    icon={CalendarClock}
                    iconColor="#F59E0B"
                    iconBg="rgba(245,158,11,0.12)"
                    loading={loading}
                    subtitle="Due within the next 7 days"
                />
            </section>

            {/*  Main Content: Charts + Renewals  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="col-span-2 flex flex-col gap-4">
                    {/* Left col — charts */}
                    <div>
                        <SpendingStatistics
                            spendingDetails={spendingDetails}
                            loading={loading}
                            categoryColors={categoryColors}
                            defaultColor={defaultColor}
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Category BreakDown */}
                        <CategoryBreakdown spendingDetails={spendingDetails} loading={loading} categoryColors={categoryColors} defaultColor={defaultColor} />
                        {/* Quick stats card */}
                        <QuickStatsCard spendingDetails={spendingDetails} loading={loading} />
                    </div>
                </div>
                {/* Right col — Upcoming Renewals */}
                <div className="lg:col-span-1 flex flex-col gap-5 h-fit">
                    {/* Renewals card */}
                    <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex-1">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                                    <CalendarClock size={14} className="text-[#F59E0B]" />
                                </div>
                                <h2 className="text-sm font-semibold text-white">Upcoming Renewals</h2>
                            </div>
                            {(spendingDetails?.upcomingRenewals?.length ?? 0) > 0 && (
                                <button className="text-xs text-[#6366F1] hover:text-[#6366F1]/70 flex items-center gap-1 transition-colors">
                                    View all <ArrowRight size={11} />
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <div className="space-y-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 animate-pulse">
                                        <div className="w-9 h-9 rounded-xl bg-white/10 shrink-0" />
                                        <div className="flex-1 space-y-1.5">
                                            <div className="w-28 h-3.5 rounded bg-white/10" />
                                            <div className="w-16 h-3 rounded bg-white/5" />
                                        </div>
                                        <div className="w-12 h-4 rounded bg-white/10" />
                                    </div>
                                ))}
                            </div>
                        ) : spendingDetails?.upcomingRenewals?.length ? (
                            <div className="space-y-2">
                                {spendingDetails.upcomingRenewals.map((renewal, i) => {
                                    const colors = categoryColors[renewal.category?.toLowerCase() ?? ""] ?? defaultColor
                                    const days = renewal.renewalDate ? daysUntil(renewal.renewalDate) : null
                                    const isUrgent = days !== null && days <= 2
                                    const price = renewal.price ?? renewal.cost ?? 0
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-200"
                                        >
                                            {/* Icon */}
                                            <div
                                                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[13px] font-bold"
                                                style={{
                                                    backgroundColor: colors.hex + "20",
                                                    color: colors.hex,
                                                }}
                                            >
                                                {renewal.name.charAt(0).toUpperCase()}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{renewal.name}</p>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    {days !== null && (
                                                        <span
                                                            className={`text-xs font-medium ${isUrgent ? "text-red-400" : "text-white/30"
                                                                }`}
                                                        >
                                                            {days === 0
                                                                ? "Today"
                                                                : days === 1
                                                                    ? "Tomorrow"
                                                                    : `in ${days}d`}
                                                        </span>
                                                    )}
                                                    {renewal.renewalDate && (
                                                        <span className="text-xs text-white/20">
                                                            · {new Date(renewal.renewalDate).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                            })}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right shrink-0">
                                                <span className="text-sm font-semibold text-white">${price}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3">
                                    <CalendarClock size={22} className="text-white/20" />
                                </div>
                                <p className="text-sm text-white/30">No upcoming renewals</p>
                                <p className="text-xs text-white/15 mt-1">in the next 7 days</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage