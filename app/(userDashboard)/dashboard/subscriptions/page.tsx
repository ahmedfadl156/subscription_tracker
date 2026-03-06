"use client"
import SubscriptionSearch from "@/components/Dashboard/subscriptions/SubscriptionSearch"
import SubscriptionsTable from "@/components/Dashboard/subscriptions/SubscriptionsTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { getUserSubscriptions } from "@/services/subscriptions"
import { useQuery } from "@tanstack/react-query"

type Frequency = "monthly" | "yearly" | "weekly" | "daily"
type Status = "active" | "expired" | "cancelled" | "trial"

interface Subscription {
    _id: string
    name: string
    category: string
    price: number
    currency: string
    frequency: Frequency
    status: Status
    sharedWith: string[]
    renewalDate: string
    startDate: string
    paymentMethod: string
    costPerPerson: number
    user: string
}

const page = () => {
    const { data: subscriptions, isLoading, isError } = useQuery({
        queryKey: ['subscriptions-data'],
        queryFn: async () => {
            const res = await getUserSubscriptions();
            return res?.data;
        }
    })
    const [query, setQuery] = useState("");
    const filtered = useMemo(() =>
        (subscriptions as Subscription[] ?? []).filter((s: Subscription) => s.name.toLowerCase().includes(query.toLowerCase())),
        [subscriptions, query])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
                <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mt-4 md:mt-0">Subscriptions</h1>
                    <p className="text-[#94A3B8] text-sm text-center md:text-left mt-2">Manage your recurring payments and optimize spending</p>
                </div>
                <Link href="subscriptions/add">
                    <Button className="cursor-pointer my-6 md:mt-0 rounded-full py-6 px-8 hover:shadow-md shadow-primary hover:backdrop-blur-2xl hover:-translate-y-1 transition-all duration-300">
                        <Plus className="size-4" />
                        Add Subscription
                    </Button>
                </Link>
            </div>

            {/* SUbscriptions Search */}
            <SubscriptionSearch onSearch={setQuery} />

            {/* Subscription Table */}
            <SubscriptionsTable subscriptions={filtered} loading={isLoading} error={isError ? "Something went wrong. Please try again." : null} />
        </div>
    )
}

export default page