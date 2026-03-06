"use client"
import { getSpendingTrends } from "@/services/analytics";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface TrendDataPoint {
    month: string;
    year: number;
    currentPeriod: number;
    previousYear: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-[#1E243A] border border-white/10 rounded-xl px-4 py-3 shadow-xl text-sm">
            <p className="text-white/60 mb-2 font-medium">{label}</p>
            {payload.map((entry: any) => (
                <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
                    <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-white/70">
                        {entry.dataKey === "currentPeriod" ? "This Year" : "Last Year"}:
                    </span>
                    <span className="text-white font-bold">${entry.value.toFixed(2)}</span>
                </div>
            ))}
        </div>
    );
};

const CustomLegend = () => (
    <div className="flex items-center gap-6 justify-end pr-2 mb-4">
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#6467F2]" />
            <span className="text-sm text-white/60">This Year</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#60A5FA]" />
            <span className="text-sm text-white/60">Last Year</span>
        </div>
    </div>
);

const SpendingTrends = () => {
    const { data: analytics, isLoading, isError, isFetching } = useQuery({
        queryKey: ['analytics-data'],
        queryFn: async () => {
            const res = await getSpendingTrends();
            return res?.data;
        }
    })


    const chartData = (analytics as TrendDataPoint[] | undefined)?.map((d: TrendDataPoint) => ({
        ...d,
        label: `${d.month} '${String(d.year).slice(2)}`,
    }));

    if (isError) {
        return (
            <div className="flex items-center justify-center h-64 text-white/30 text-sm">
                Error Loading Data!
            </div>
        )
    }

    return (
        <div className="bg-[#1E243A]/40 border border-white/5 rounded-2xl p-6 mt-6 mx-4 md:mx-6 lg:mx-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-white font-bold text-lg">Spending Trends</h2>
                    <p className="text-white/40 text-sm mt-0.5">
                        Monthly comparison — current year vs last year
                    </p>
                </div>
            </div>

            {isFetching && (
                <div className="flex items-center justify-center h-64 text-white/30 text-sm">
                    Updating...
                </div>
            )}

            <CustomLegend />

            {isLoading ? (
                <div className="flex items-center justify-center h-64 text-white/30 text-sm">
                    Loading chart…
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6467F2" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#6467F2" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradPrevious" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#ffffff08"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="label"
                            tick={{ fill: "#ffffff50", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "#ffffff50", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `$${v}`}
                            width={55}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#ffffff15" }} />

                        <Area
                            type="monotone"
                            dataKey="previousYear"
                            stroke="#60A5FA"
                            strokeWidth={2}
                            fill="url(#gradPrevious)"
                            dot={false}
                            activeDot={{ r: 4, fill: "#60A5FA", strokeWidth: 0 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="currentPeriod"
                            stroke="#6467F2"
                            strokeWidth={2.5}
                            fill="url(#gradCurrent)"
                            dot={false}
                            activeDot={{ r: 5, fill: "#6467F2", strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default SpendingTrends;
