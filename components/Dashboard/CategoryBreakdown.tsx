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

export const CategoryBreakdown = ({spendingDetails, loading, categoryColors, defaultColor}: {spendingDetails: SpendingDetails | null; loading: boolean; categoryColors: Record<string, { bg: string; bar: string; hex: string }>; defaultColor: { bg: string; bar: string; hex: string }}) => {
    return (
                    <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
                <div className="flex flex-col items-start gap-1 mb-6">
                    <h2 className="text-base font-semibold text-white">Category Breakdown</h2>
                    <p className="text-xs text-white/30">Percentage of total monthly spend</p>
                </div>

                {loading ? (
                    <div className="space-y-5">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse space-y-2">
                                <div className="flex justify-between">
                                    <div className="w-20 h-3.5 rounded bg-white/10" />
                                    <div className="w-10 h-3.5 rounded bg-white/10" />
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-white/5">
                                    <div className="h-1.5 rounded-full bg-white/10 w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : spendingDetails?.data?.length ? (
                    <div className="space-y-4">
                        {spendingDetails.data.map((cat) => {
                            const colors = categoryColors[cat.category.toLowerCase()] ?? defaultColor
                            const pct = parseFloat(cat.costPercentage) || 0
                            return (
                                <div key={cat.category}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-2 h-2 rounded-full shrink-0"
                                                style={{ backgroundColor: colors.hex }}
                                            />
                                            <span className="text-sm text-white capitalize">{cat.category}</span>
                                            <span className="text-xs text-white/30">
                                                {cat.subscriptionsCount} sub{cat.subscriptionsCount !== 1 ? "s" : ""}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-white/40">{cat.costPercentage}</span>
                                            <span className="text-sm font-semibold text-white">${cat.totalSpent}</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{ width: `${pct}%`, backgroundColor: colors.hex }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-white/30 text-center py-6">No data available.</p>
                )}
            </div>
    )
}
