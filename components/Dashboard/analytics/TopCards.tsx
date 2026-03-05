"use client"
import { getTopKPIs } from "@/services/analytics";
import Image from "next/image";
import { useEffect, useState } from "react"

interface TopCardsProps {
    totalAnnualSpend: {
        value: number;
        percentageChange: string | null;
    };
    averageMonthlySpend: {
        value: number;
        percentageChange: string | null;
    };
    highestMonthlyPeak: {
        value: number;
        percentageChange: string | null;
    };
    projectedNextMonth: {
        value: number;
        isForecast: boolean;
    };
}

const TopCards = () => {
    const [data, setData] = useState<TopCardsProps | null>(null)

    useEffect(() => {
        const fetchTopCards = async () => {
            await getTopKPIs()
                .then((res) => {
                    setData(res?.data ?? res)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        fetchTopCards();
    }, [])

    const cards = data
        ? [
            {
                id: "totalAnnualSpend",
                icon: "/icons/cash.png",
                iconBg: "#6467F2",
                title: "Total Annual Spend",
                value: `$${data.totalAnnualSpend.value.toFixed(2)}`,
                change: data.totalAnnualSpend.percentageChange !== null ? parseFloat(data.totalAnnualSpend.percentageChange) : null,
                sub: data.totalAnnualSpend.percentageChange ? `${data.totalAnnualSpend.percentageChange}%` : null,
            },
            {
                id: "averageMonthlySpend",
                icon: "/icons/calender.png",
                iconBg: "#60A5FA",
                title: "Avg Monthly Spend",
                value: `$${data.averageMonthlySpend.value.toFixed(2)}`,
                change: data.averageMonthlySpend.percentageChange !== null ? parseFloat(data.averageMonthlySpend.percentageChange) : null,
                sub: data.averageMonthlySpend.percentageChange ? `${data.averageMonthlySpend.percentageChange}%` : null,
            },
            {
                id: "highestMonthlyPeak",
                icon: "/icons/percentage.png",
                iconBg: "#FBBF24",
                title: "Highest Monthly Peak",
                value: `$${data.highestMonthlyPeak.value.toFixed(2)}`,
                change: data.highestMonthlyPeak.percentageChange !== null ? parseFloat(data.highestMonthlyPeak.percentageChange) : null,
                sub: data.highestMonthlyPeak.percentageChange ? `${data.highestMonthlyPeak.percentageChange}%` : null,
            },
            {
                id: "projectedNextMonth",
                icon: "/icons/projected.png",
                iconBg: "#34D399",
                title: "Projected Next Month",
                value: `$${data.projectedNextMonth.value.toFixed(2)}`,
                change: null,
                sub: data.projectedNextMonth.isForecast ? "Forecast" : null,
            },
        ]
        : []

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8">
            {cards.map((card) => (
                <div key={card.id} className="bg-[#1E243A]/40 border border-white/5 rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${card.iconBg}33` }}>
                            <Image src={card.icon} alt={card.title} width={20} height={20} />
                        </div>
                        {card.change !== null && (
                            <p className={`text-sm font-bold flex items-center gap-1 ${card.change > 0 ? "text-green-500" : "text-red-500"
                                }`}>
                                <span>{card.change > 0 ? "▲" : "▼"}</span>
                                <span>{card.change > 0 ? `+${card.sub}` : card.sub}</span>
                            </p>
                        )}
                        {card.change === null && card.sub && (
                            <p className="text-sm font-bold text-gray-400">{card.sub}</p>
                        )}
                    </div>
                    <p className="text-base font-semibold text-[#313952] mt-4">{card.title}</p>
                    <p className="text-2xl text-white font-bold mt-3">{card.value}</p>
                </div>
            ))}
        </div>
    )
}

export default TopCards