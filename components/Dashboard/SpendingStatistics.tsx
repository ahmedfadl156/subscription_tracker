"use client"
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts"

interface CategoryData {
    category: string
    subscriptionsCount: number
    countPercentage: string
    totalSpent: number
    costPercentage: string
}

interface SpendingDetails {
    status: string
    totalSubscriptions: number
    totalCost: number
    upcomingCount: number
    upcomingRenewals: { name: string; renewalDate: string; cost: number; category?: string }[]
    data: CategoryData[]
}

interface SpendingStatisticsProps {
    spendingDetails: SpendingDetails | null
    loading: boolean
    categoryColors: Record<string, { bg: string; bar: string; hex: string }>
    defaultColor: { bg: string; bar: string; hex: string }
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1a2236] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
                <p className="text-xs text-white/40 capitalize mb-1">{label}</p>
                <p className="text-base font-bold text-white">${payload[0].value.toFixed(2)}</p>
            </div>
        )
    }
    return null
}

const SpendingStatistics = ({ spendingDetails, loading, categoryColors, defaultColor }: SpendingStatisticsProps) => {
    const chartData = spendingDetails?.data?.map((cat) => ({
        category: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
        totalSpent: cat.totalSpent,
        rawCategory: cat.category.toLowerCase(),
    })) ?? []

    const maxSpent = Math.max(...chartData.map((d) => d.totalSpent), 1)

    return (
        <div className="space-y-5">
            {/* Bar Chart — Spending by Category */}
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
                <div className="flex flex-col items-start gap-1 mb-6">
                    <h2 className="text-base font-semibold text-white">Spending by Category</h2>
                    <p className="text-xs text-white/30">Monthly cost breakdown</p>
                </div>

                {loading ? (
                    <div className="h-48 flex items-end gap-4 px-2">
                        {[60, 90, 45, 75, 55].map((h, i) => (
                            <div key={i} className="flex-1 animate-pulse rounded-t-lg bg-white/10" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                ) : chartData.length ? (
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={chartData} barCategoryGap="30%">
                            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                            <XAxis
                                dataKey="category"
                                tick={{ fontSize: 11, fill: "#94A3B8" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: "#94A3B8" }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `$${v}`}
                                width={45}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                            <Bar dataKey="totalSpent" radius={[6, 6, 0, 0]}>
                                {chartData.map((entry, index) => {
                                    const color = categoryColors[entry.rawCategory]?.hex ?? defaultColor.hex
                                    return <Cell key={`cell-${index}`} fill={color} fillOpacity={0.85} />
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-48 flex items-center justify-center">
                        <p className="text-sm text-white/30">No category data available.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpendingStatistics