"use client"
import SubscriptionSearch from "@/components/subscriptions/SubscriptionSearch"
import SubscriptionsTable from "@/components/subscriptions/SubscriptionsTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { getUserSubscriptions } from "@/services/subscriptions"

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
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [query , setQuery] = useState("");
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const filtered = useMemo(() => 
        subscriptions.filter(s => s.name.toLowerCase().includes(query.toLowerCase())),
        [subscriptions , query])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserSubscriptions()
                setSubscriptions(data.data ?? [])
            } catch (err) {
                console.error(err)
                setError("Failed to load subscriptions")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
                <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">Subscriptions</h1>
                    <p className="text-[#94A3B8] text-sm mt-2">Manage your recurring payments and optimize spending</p>
                </div>
                <Link href="subscriptions/add">
                <Button className="cursor-pointer rounded-full py-6 px-8 hover:shadow-md shadow-primary hover:backdrop-blur-2xl hover:-translate-y-1 transition-all duration-300">
                    <Plus className="size-4" />
                    Add Subscription
                </Button>
                </Link>
            </div>

            {/* SUbscriptions Search */}
            <SubscriptionSearch onSearch={setQuery}/>

            {/* Subscription Table */}
            <SubscriptionsTable subscriptions={filtered} loading={loading} error={error} />
        </div>
    )
}

export default page