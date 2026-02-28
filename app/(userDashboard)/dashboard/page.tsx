"use client";
import { useEffect, useState } from "react"
import { getSpendingDetails } from "@/services/subscriptions"
import AnalyticsCard from "@/components/Dashboard/AnalyticsCard"
import { DollarSign, CreditCard, CalendarClock, PieChart, ArrowRight } from "lucide-react"

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
    category?: string
}

interface SpendingDetails {
    status: string
    totalSubscriptions: number
    totalCost: number
    upcomingCount: number
    upcomingRenewals: UpcomingRenewal[]
    data: CategoryData[]
}

const categoryColors: Record<string, { bg: string; bar: string }> = {
    entertainment: { bg: "bg-[#6366F1]/10", bar: "bg-[#6366F1]" },
    education: { bg: "bg-[#22D3EE]/10", bar: "bg-[#22D3EE]" },
    productivity: { bg: "bg-[#F59E0B]/10", bar: "bg-[#F59E0B]" },
    health: { bg: "bg-[#10B981]/10", bar: "bg-[#10B981]" },
    finance: { bg: "bg-[#EF4444]/10", bar: "bg-[#EF4444]" },
}
const defaultColor = { bg: "bg-white/10", bar: "bg-white/40" }

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
            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Overview</h1>
                <p className="text-sm text-white/40 mt-1">Track all your subscriptions at a glance</p>
            </div>

            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnalyticsCard
                    title="Total Monthly Spending"
                    value={spendingDetails?.totalCost ?? 0}
                    prefix="$"
                    icon={DollarSign}
                    iconColor="#6366F1"
                    iconBg="rgba(99,102,241,0.12)"
                    loading={loading}
                    subtitle="Across all active subscriptions"
                />
                <AnalyticsCard
                    title="Active Subscriptions"
                    value={spendingDetails?.totalSubscriptions ?? 0}
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

            {/* Bottom Row: Categories + Upcoming Renewals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Spending by Category */}
                <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart size={16} className="text-[#6366F1]" />
                        <h2 className="text-sm font-semibold text-white">Spending by Category</h2>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="flex justify-between mb-2">
                                        <div className="w-24 h-4 rounded bg-white/10" />
                                        <div className="w-12 h-4 rounded bg-white/10" />
                                    </div>
                                    <div className="w-full h-2 rounded-full bg-white/5">
                                        <div className="h-2 rounded-full bg-white/10 w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : spendingDetails?.data?.length ? (
                        <div className="space-y-5">
                            {spendingDetails.data.map((cat) => {
                                const colors = categoryColors[cat.category.toLowerCase()] ?? defaultColor
                                return (
                                    <div key={cat.category}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${colors.bar}`} />
                                                <span className="text-sm text-white capitalize">{cat.category}</span>
                                                <span className="text-xs text-white/30">{cat.subscriptionsCount} sub{cat.subscriptionsCount > 1 ? "s" : ""}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-semibold text-white">${cat.totalSpent}</span>
                                                <span className="text-xs text-white/30 ml-1.5">{cat.costPercentage}</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-700 ${colors.bar}`}
                                                style={{ width: cat.costPercentage }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-white/30 text-center py-6">No category data available.</p>
                    )}
                </div>

                {/* Upcoming Renewals */}
                <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <CalendarClock size={16} className="text-[#F59E0B]" />
                            <h2 className="text-sm font-semibold text-white">Upcoming Renewals</h2>
                        </div>
                        {(spendingDetails?.upcomingRenewals?.length ?? 0) > 0 && (
                            <button className="text-xs text-[#6366F1] hover:text-[#6366F1]/80 flex items-center gap-1 transition-colors">
                                View all <ArrowRight size={12} />
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 animate-pulse">
                                    <div className="w-9 h-9 rounded-xl bg-white/10 shrink-0" />
                                    <div className="flex-1">
                                        <div className="w-28 h-4 rounded bg-white/10 mb-1.5" />
                                        <div className="w-20 h-3 rounded bg-white/5" />
                                    </div>
                                    <div className="w-14 h-5 rounded bg-white/10" />
                                </div>
                            ))}
                        </div>
                    ) : spendingDetails?.upcomingRenewals?.length ? (
                        <div className="space-y-3">
                            {spendingDetails.upcomingRenewals.map((renewal, i) => {
                                const colors = categoryColors[renewal.category?.toLowerCase() ?? ""] ?? defaultColor
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                                            <CreditCard size={15} className="text-white/60" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{renewal.name}</p>
                                            <p className="text-xs text-white/30">
                                                {renewal.renewalDate
                                                    ? new Date(renewal.renewalDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                                                    : "—"}
                                            </p>
                                        </div>
                                        <span className="text-sm font-semibold text-white shrink-0">${renewal?.price}</span>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <CalendarClock size={32} className="text-white/10 mb-3" />
                            <p className="text-sm text-white/30">No upcoming renewals in the next 7 days</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default DashboardPage