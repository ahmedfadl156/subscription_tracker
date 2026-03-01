import { TrendingUp } from "lucide-react"

interface SpendingDetails {
    status: string
    totalSubscriptions: number
    totalCost: number
    upcomingCount: number
    upcomingRenewals: { name: string; renewalDate: string; cost: number; category?: string }[]
    data: CategoryData[]
}

interface CategoryData {
    category: string
    subscriptionsCount: number
    countPercentage: string
    totalSpent: number
    costPercentage: string
}

const QuickStatsCard = ({ spendingDetails, loading }: { spendingDetails: SpendingDetails | null; loading: boolean }) => {
    return (
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                    <TrendingUp size={14} className="text-[#6366F1]" />
                </div>
                <h2 className="text-sm font-semibold text-white">Quick Stats</h2>
            </div>
            {loading ? (
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between animate-pulse">
                        <div className="w-24 h-3.5 rounded bg-white/10" />
                        <div className="w-12 h-3.5 rounded bg-white/10" />
                    </div>
                    ))}
                </div>
                ) : (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40">Avg. per subscription</span>
                        <span className="text-xs font-semibold text-white">
                        ${spendingDetails?.totalSubscriptions
                        ? (spendingDetails.totalCost / spendingDetails.totalSubscriptions).toFixed(2): "0.00"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40">Categories tracked</span>
                        <span className="text-xs font-semibold text-white">
                            {spendingDetails?.data?.length ?? 0}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40">Annual estimate</span>
                        <span className="text-xs font-semibold text-white">
                        ${((spendingDetails?.totalCost ?? 0) * 12).toFixed(0)}
                        </span>
                    </div>
                    <div className="h-px bg-white/5 my-1" />
                        <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40">Renewals (7 days)</span>
                        <span
                            className={`text-xs font-semibold ${(spendingDetails?.upcomingCount ?? 0) > 0? "text-amber-400": "text-white"}`}>
                            {spendingDetails?.upcomingCount ?? 0}
                        </span>
                    </div>
                    </div>
                    )}
        </div>
    )
}

export default QuickStatsCard