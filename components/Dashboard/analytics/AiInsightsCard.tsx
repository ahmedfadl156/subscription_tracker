"use client"
import { getAiInsights } from "@/services/analytics";
import { useQuery } from "@tanstack/react-query";
import { Lightbulb, TrendingDown, RefreshCw, XCircle, ArrowDownCircle, Sparkles } from "lucide-react";

interface Suggestion {
    actionType: "cancel" | "switch_annual" | "downgrade";
    serviceName: string;
    reason: string;
    estimatedAnnualSavings: number;
}

interface AiInsightsData {
    totalPotentialSavings: number;
    suggestions: Suggestion[];
}

const actionConfig = {
    cancel: {
        label: "Cancel",
        icon: XCircle,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        dot: "bg-red-400",
    },
    switch_annual: {
        label: "Switch to Annual",
        icon: RefreshCw,
        color: "text-[#6467F2]",
        bg: "bg-[#6467F2]/10",
        border: "border-[#6467F2]/20",
        dot: "bg-[#6467F2]",
    },
    downgrade: {
        label: "Downgrade",
        icon: ArrowDownCircle,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20",
        dot: "bg-amber-400",
    },
};

const SkeletonCard = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-20 bg-white/5 rounded-xl" />
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 bg-white/5 rounded-xl" />
            ))}
        </div>
    </div>
);

const AiInsightsCard = () => {
    const { data, isLoading, isError, refetch, isFetching } = useQuery<AiInsightsData>({
        queryKey: ["ai-insights"],
        queryFn: async () => {
            const res = await getAiInsights();
            return res?.data;
        },
        staleTime: 1000 * 60 * 60 * 24, 
        retry: 1,
    });

    return (
        <div className="bg-[#1E243A]/40 border border-white/5 rounded-2xl p-6 mx-4 md:mx-6 lg:mx-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#6467F2]/15 flex items-center justify-center">
                        <Sparkles className="size-5 text-[#6467F2]" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg leading-tight">AI Insights</h2>
                        <p className="text-white/40 text-xs mt-0.5">Personalized savings recommendations</p>
                    </div>
                </div>
            </div>

            {/* Loading */}
            {isLoading && <SkeletonCard />}

            {/* Error */}
            {isError && !isLoading && (
                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <XCircle className="size-6 text-red-400" />
                    </div>
                    <p className="text-white/50 text-sm">Failed to load AI insights.</p>
                    <button
                        onClick={() => refetch()}
                        className="text-xs text-[#6467F2] hover:text-[#6467F2]/80 transition-colors cursor-pointer"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Data */}
            {data && !isLoading && (
                <div className="space-y-5">
                    {/* Total Savings Banner */}
                    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-[#6467F2]/20 to-[#60A5FA]/10 border border-[#6467F2]/20 p-5">
                        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#6467F2]/10 blur-2xl pointer-events-none" />
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#6467F2]/20 flex items-center justify-center shrink-0">
                                <TrendingDown className="size-5 text-[#6467F2]" />
                            </div>
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-widest font-medium">
                                    Total Potential Annual Savings
                                </p>
                                <p className="text-white text-3xl font-bold mt-0.5">
                                    ${data.totalPotentialSavings}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="space-y-3">
                        <p className="text-white/30 text-xs uppercase tracking-widest font-medium px-1">
                            Suggestions ({data.suggestions.length})
                        </p>
                        {data.suggestions.map((suggestion, idx) => {
                            const config = actionConfig[suggestion.actionType] ?? actionConfig["cancel"];
                            const Icon = config.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-xl border ${config.border} ${config.bg} p-4 transition-all duration-200 hover:border-white/10`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className={`h-8 w-8 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center shrink-0`}>
                                                <Icon className={`size-4 ${config.color}`} />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-white font-semibold text-sm truncate">
                                                        {suggestion.serviceName}
                                                    </p>
                                                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${config.bg} ${config.color} border ${config.border} whitespace-nowrap`}>
                                                        {config.label}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-green-400 font-bold text-sm whitespace-nowrap">
                                                +${suggestion.estimatedAnnualSavings.toLocaleString()}
                                            </p>
                                            <p className="text-white/30 text-[10px]">/ year</p>
                                        </div>
                                    </div>
                                    <p className="text-white/50 text-xs leading-relaxed mt-3 pl-11">
                                        {suggestion.reason}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer note */}
                    <div className="flex items-start gap-2 pt-1">
                        <Lightbulb className="size-3.5 text-white/20 mt-0.5 shrink-0" />
                        <p className="text-white/25 text-[11px] leading-relaxed">
                            Insights are AI-generated and refreshed every 24 hour. Actual savings may vary.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiInsightsCard;