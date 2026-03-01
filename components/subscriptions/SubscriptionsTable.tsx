"use client"

import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table"
import { useEffect, useState } from "react"
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

const statusStyles: Record<Status, { dot: string; text: string; bg: string; ring: string }> = {
    active: { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-400/10", ring: "ring-emerald-400/20" },
    trial: { dot: "bg-sky-400", text: "text-sky-400", bg: "bg-sky-400/10", ring: "ring-sky-400/20" },
    expired: { dot: "bg-red-400", text: "text-red-400", bg: "bg-red-400/10", ring: "ring-red-400/20" },
    cancelled: { dot: "bg-red-400", text: "text-red-400", bg: "bg-red-400/10", ring: "ring-red-400/20" },
}

const StatusBadge = ({ status }: { status: Status }) => {
    const s = statusStyles[status] ?? statusStyles.active
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset capitalize ${s.bg} ${s.text} ${s.ring}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {status}
        </span>
    )
}

const cycleLabel: Record<Frequency, string> = {
    monthly: "Mo",
    yearly: "Yr",
    weekly: "Wk",
    daily: "dy",
}

const categoryHex: Record<string, string> = {
    entertainment: "#6366F1",
    education: "#22D3EE",
    productivity: "#F59E0B",
    health: "#10B981",
    finance: "#EF4444",
    other: "#A78BFA",
}

const SubscriptionsTable = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
        <div className="[&_.bg-brand-solid]:bg-white/20! [&_.ring-bg-brand-solid]:ring-white/10!">
            <TableCard.Root className="border border-white/5 bg-[#111827] rounded-2xl overflow-hidden shadow-none ring-0 [&_tr:hover]:bg-white/5! [&_.selected\:bg-secondary]:bg-white/5!">
                <TableCard.Header
                    title="All Subscriptions"
                    badge={
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset bg-slate-400/10 text-slate-300 ring-slate-400/20">
                            {loading ? "…" : subscriptions.length}
                        </span>
                    }
                    description="Your currently tracked recurring payments"
                    className="border-white/5 bg-[#111827] [&_h2]:text-white [&_p]:text-white/40"
                />

                {loading && (
                    <div className="divide-y divide-white/5">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                                <div className="flex-1 space-y-1.5">
                                    <div className="w-28 h-3.5 rounded bg-white/10" />
                                    <div className="w-16 h-3 rounded bg-white/5" />
                                </div>
                                <div className="w-16 h-3.5 rounded bg-white/10" />
                                <div className="w-20 h-5 rounded-full bg-white/5" />
                                <div className="w-20 h-5 rounded-full bg-white/5" />
                                <div className="w-20 h-5 rounded bg-white/5" />
                                <div className="w-5 h-5 rounded bg-white/10" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error state */}
                {!loading && error && (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && subscriptions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-14 text-center">
                        <p className="text-sm text-white/30">No subscriptions found.</p>
                        <p className="text-xs text-white/15 mt-1">Add your first subscription to get started.</p>
                    </div>
                )}

                {/* Data table — only rendered when we have rows */}
                {!loading && !error && subscriptions.length > 0 && (
                    <Table selectionMode="multiple" aria-label="Subscriptions table">
                        <Table.Header className="border-white/5 bg-white/[0.02] text-[#94A3B8]">
                            <Table.Head label="Service" isRowHeader />
                            <Table.Head label="Price" />
                            <Table.Head label="Frequency" />
                            <Table.Head label="Status" />
                            <Table.Head label="Shared With" />
                            <Table.Head label="Actions" />
                        </Table.Header>

                        <Table.Body items={subscriptions}>
                            {(sub) => (
                                <Table.Row key={sub._id} id={sub._id}>

                                    {/* Service Name */}
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-sm font-bold uppercase"
                                                style={{
                                                    backgroundColor: (categoryHex[sub.category.toLowerCase()] ?? "#6B7280") + "22",
                                                    color: categoryHex[sub.category.toLowerCase()] ?? "#6B7280",
                                                }}
                                            >
                                                {sub.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{sub.name}</p>
                                                <p className="text-xs text-white/30 capitalize">{sub.category}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    {/* Price */}
                                    <Table.Cell>
                                        <span className="text-sm font-semibold text-white">
                                            {sub.price.toFixed(2)}
                                        </span>
                                        <span className="text-xs text-white/30 ml-1 uppercase">{sub.currency}</span>
                                    </Table.Cell>

                                    {/* Frequency */}
                                    <Table.Cell>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 bg-white/5 border border-white/10 rounded-md px-2 py-1 capitalize">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: categoryHex[sub.category.toLowerCase()] ?? "#6B7280" }}
                                            />
                                            {sub.frequency}
                                            <span className="text-white/25">({cycleLabel[sub.frequency]})</span>
                                        </span>
                                    </Table.Cell>

                                    {/* Status */}
                                    <Table.Cell>
                                        <StatusBadge status={sub.status} />
                                    </Table.Cell>

                                    {/* Shared With */}
                                    <Table.Cell>
                                        {sub.sharedWith.length === 0 ? (
                                            <span className="text-xs text-white/25">Only me</span>
                                        ) : (
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex -space-x-2">
                                                    {sub.sharedWith.slice(0, 3).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-7 h-7 rounded-full bg-[#6366F1]/20 border-2 border-[#111827] flex items-center justify-center text-[10px] font-bold text-[#6366F1]"
                                                        >
                                                            {i + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                                {sub.sharedWith.length > 3 && (
                                                    <span className="text-xs text-white/30">+{sub.sharedWith.length - 3}</span>
                                                )}
                                                <span className="text-xs text-white/40 ml-1">
                                                    {sub.sharedWith.length} {sub.sharedWith.length === 1 ? "person" : "people"}
                                                </span>
                                            </div>
                                        )}
                                    </Table.Cell>

                                    {/* Actions */}
                                    <Table.Cell>
                                        <TableRowActionsDropdown />
                                    </Table.Cell>

                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                )}

            </TableCard.Root>
        </div>
    )
}

export default SubscriptionsTable