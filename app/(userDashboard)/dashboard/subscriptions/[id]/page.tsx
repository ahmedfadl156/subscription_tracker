"use client"

import { useQuery } from "@tanstack/react-query"
import { getBillingHistory, getSubscriptionById } from "@/services/subscriptions"
import { getServiceLogo } from "@/lib/popularServices"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import {
    ArrowLeft,
    Calendar,
    CreditCard,
    DollarSign,
    Globe,
    RefreshCw,
    Tag,
    Users,
    Clock,
    ExternalLink,
    Zap,
    Receipt,
    CheckCircle2,
    TrendingUp,
} from "lucide-react"

// Types 
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
    cancelUrl?: string
    createdAt: string
    updatedAt: string
}

interface BillingHistory {
    amount: number
    currency: string
    date: string
    paymentDate: Date 
}

//  Helpers
const statusConfig: Record<Status, { dot: string; text: string; bg: string; ring: string; label: string }> = {
    active: { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-400/10", ring: "ring-emerald-400/20", label: "Active" },
    trial: { dot: "bg-sky-400", text: "text-sky-400", bg: "bg-sky-400/10", ring: "ring-sky-400/20", label: "Trial" },
    expired: { dot: "bg-red-400", text: "text-red-400", bg: "bg-red-400/10", ring: "ring-red-400/20", label: "Expired" },
    cancelled: { dot: "bg-red-400", text: "text-red-400", bg: "bg-red-400/10", ring: "ring-red-400/20", label: "Cancelled" },
}

const categoryColor: Record<string, string> = {
    entertainment: "#6366F1",
    education: "#22D3EE",
    productivity: "#F59E0B",
    health: "#10B981",
    finance: "#EF4444",
    sports: "#F97316",
    technology: "#8B5CF6",
    other: "#A78BFA",
}

const frequencyLabel: Record<Frequency, string> = {
    monthly: "Monthly",
    yearly: "Yearly",
    weekly: "Weekly",
    daily: "Daily",
}

const frequencyDays: Record<Frequency, number> = {
    daily: 1, weekly: 7, monthly: 30, yearly: 365,
}

function fmt(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
    })
}

function daysUntil(dateStr: string) {
    const diff = new Date(dateStr).getTime() - Date.now()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Sub-components 
const ServiceAvatar = ({ name, category, size = 64 }: { name: string; category: string; size?: number }) => {
    const logoUrl = getServiceLogo(name)
    const color = categoryColor[category.toLowerCase()] ?? "#6B7280"
    const [err, setErr] = useState(false)

    if (logoUrl && !err) {
        return (
            <div
                className="rounded-2xl border border-white/10 flex items-center justify-center shrink-0 overflow-hidden"
                style={{ width: size, height: size, background: color + "22" }}
            >
                <Image
                    src={logoUrl} alt={name}
                    width={size - 16} height={size - 16}
                    className="object-contain rounded-xl"
                    onError={() => setErr(true)}
                    unoptimized
                />
            </div>
        )
    }
    return (
        <div
            className="rounded-2xl border border-white/10 flex items-center justify-center shrink-0 text-2xl font-bold uppercase"
            style={{ width: size, height: size, background: color + "22", color }}
        >
            {name.charAt(0)}
        </div>
    )
}

const InfoRow = ({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: React.ReactNode; accent?: string }) => (
    <div className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
        <div className="flex items-center gap-3 text-sm text-white/40">
            <Icon className="w-4 h-4 shrink-0" style={{ color: accent ?? "#64748b" }} />
            <span>{label}</span>
        </div>
        <div className="text-sm font-medium text-white/80">{value}</div>
    </div>
)

const StatCard = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) => (
    <div
        className="flex-1 rounded-xl border border-white/5 p-4 flex flex-col gap-1"
        style={{ background: color + "0d" }}
    >
        <span className="text-xs text-white/30 uppercase tracking-wider font-medium">{label}</span>
        <span className="text-xl font-bold" style={{ color }}>{value}</span>
        {sub && <span className="text-xs text-white/30">{sub}</span>}
    </div>
)

// Skeleton
const DetailsPageSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <div className="w-24 h-4 rounded bg-white/10" />
        <div className="rounded-2xl border border-white/5 bg-[#111827] p-6 flex gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 shrink-0" />
            <div className="flex-1 space-y-3">
                <div className="w-40 h-6 rounded bg-white/10" />
                <div className="w-24 h-4 rounded bg-white/5" />
                <div className="w-20 h-5 rounded-full bg-white/5" />
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-white/5" />
            ))}
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#111827] p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between py-1">
                    <div className="w-28 h-3.5 rounded bg-white/10" />
                    <div className="w-24 h-3.5 rounded bg-white/5" />
                </div>
            ))}
        </div>
    </div>
)

const BillingHistorySkeleton = () => (
    <div className="space-y-3 animate-pulse px-6 py-4">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-2">
                <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                <div className="flex-1 space-y-1.5">
                    <div className="w-32 h-3 rounded bg-white/10" />
                    <div className="w-20 h-2.5 rounded bg-white/5" />
                </div>
                <div className="w-16 h-4 rounded bg-white/10" />
            </div>
        ))}
    </div>
)


const SubscriptionDetailsPage = () => {
    const params = useParams()
    const id = params.id as string

    const { data, isLoading, isError } = useQuery({
        queryKey: ["subscription", id],
        queryFn: async () => {
            const res = await getSubscriptionById(id)
            return (res?.data ?? res) as Subscription
        },
        enabled: !!id,
    })

    const { data: billingHistory, isLoading: billingHistoryLoading } = useQuery({
        queryKey: ["billing-history", id],
        queryFn: async () => {
            const res = await getBillingHistory(id)
            return (res?.data ?? res) as BillingHistory[]
        },
        enabled: !!id,
    })


    if (isLoading) return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <DetailsPageSkeleton />
        </div>
    )

    if (isError || !data) return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-white/50 text-sm">Failed to load subscription details.</p>
            <Link href="/dashboard/subscriptions" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                ← Back to subscriptions
            </Link>
        </div>
    )

    const sub = data
    const color = categoryColor[sub.category.toLowerCase()] ?? "#6B7280"
    const st = statusConfig[sub.status] ?? statusConfig.active
    const renewalDays = daysUntil(sub.renewalDate)
    const cycleProgress = (() => {
        const total = frequencyDays[sub.frequency] * 24 * 60 * 60 * 1000
        const start = new Date(sub.startDate).getTime()
        const elapsed = Date.now() - start
        return Math.min(100, Math.max(0, Math.round((elapsed % total) / total * 100)))
    })()

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

            {/* Back link */}
            <Link
                href="/dashboard/subscriptions"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Subscriptions
            </Link>

            {/*  Hero Card  */}
            <div
                className="relative rounded-2xl border border-white/5 overflow-hidden"
                style={{ background: "linear-gradient(135deg,#0f172a 0%,#111827 100%)" }}
            >
                <div
                    className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: color }}
                />
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${color}80,transparent)` }} />

                <div className="relative p-6 flex flex-col sm:flex-row gap-5 items-start">
                    <ServiceAvatar name={sub.name} category={sub.category} size={72} />

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-white">{sub.name}</h1>
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset capitalize ${st.bg} ${st.text} ${st.ring}`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                                {st.label}
                            </span>
                        </div>
                        <p className="text-sm text-white/40 capitalize mb-4">{sub.category}</p>

                        {/* Price hero */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white">
                                {sub.price.toFixed(2)}
                            </span>
                            <span className="text-lg font-semibold text-white/50 uppercase">{sub.currency}</span>
                            <span className="text-sm text-white/30">/ {frequencyLabel[sub.frequency]}</span>
                        </div>
                    </div>

                    {/* Cancel link */}
                    {sub.cancelUrl && (
                        <a
                            href={sub.cancelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 transition-all"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Manage
                        </a>
                    )}
                </div>

                {/* Renewal progress bar */}
                <div className="px-6 pb-5">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-white/30">Billing cycle progress</span>
                        <span className="text-xs font-medium" style={{ color }}>
                            {renewalDays > 0
                                ? `Renews in ${renewalDays} day${renewalDays === 1 ? "" : "s"}`
                                : "Renewal overdue"}
                        </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${cycleProgress}%`, background: `linear-gradient(90deg,${color}80,${color})` }}
                        />
                    </div>
                </div>
            </div>

            {/* Stat Chips */}
            <div className="flex gap-3 flex-wrap">
                <StatCard
                    label="Cost / person"
                    value={`${sub.costPerPerson.toFixed(2)} ${sub.currency}`}
                    sub={`${sub.sharedWith.length + 1} people sharing`}
                    color={color}
                />
                <StatCard
                    label="Next renewal"
                    value={fmt(sub.renewalDate)}
                    sub={renewalDays > 0 ? `in ${renewalDays} days` : "Overdue"}
                    color={renewalDays <= 7 ? "#F59E0B" : "#10B981"}
                />
                <StatCard
                    label="Member since"
                    value={fmt(sub.startDate)}
                    sub={`${Math.floor((Date.now() - new Date(sub.startDate).getTime()) / 86400000)} days`}
                    color="#8B5CF6"
                />
            </div>

            {/*Details panel */}
            <div
                className="rounded-2xl border border-white/5 overflow-hidden"
                style={{ background: "#111827" }}
            >
                <div className="px-6 py-4 border-b border-white/5">
                    <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Subscription Details</h2>
                </div>
                <div className="px-6 py-2">
                    <InfoRow icon={Tag} label="Category" value={<span className="capitalize">{sub.category}</span>} accent={color} />
                    <InfoRow icon={RefreshCw} label="Billing Cycle" value={frequencyLabel[sub.frequency]} accent={color} />
                    <InfoRow icon={CreditCard} label="Payment Method" value={sub.paymentMethod} accent={color} />
                    <InfoRow icon={Globe} label="Currency" value={sub.currency.toUpperCase()} accent={color} />
                    <InfoRow icon={Calendar} label="Start Date" value={fmt(sub.startDate)} accent={color} />
                    <InfoRow icon={Calendar} label="Renewal Date" value={fmt(sub.renewalDate)} accent={color} />
                </div>
            </div>

            {/* Billing History */}
            <div
                className="rounded-2xl border border-white/5 overflow-hidden"
                style={{ background: "#111827" }}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/5 flex flex-col md:flex-row items-center gap-3">
                    <div
                        className="w-7 h-7 rounded-lg flex  items-center justify-center"
                        style={{ background: color + "22" }}
                    >
                        <Receipt className="w-3.5 h-3.5" style={{ color }} />
                    </div>
                    <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Billing History</h2>
                    {billingHistory && billingHistory.length > 0 && (
                        <div className="md:ml-auto flex flex-col md:flex-row items-center gap-3">
                            <div className="flex items-center gap-1.5 text-xs text-white/30">
                                <TrendingUp className="w-3 h-3" />
                                <span>{billingHistory.length} payment{billingHistory.length !== 1 ? "s" : ""}</span>
                            </div>
                            <div
                                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                                style={{ background: color + "22", color }}
                            >
                                {billingHistory[0].currency.toUpperCase()}{" "}
                                {billingHistory.reduce((sum, b) => sum + b.amount, 0).toFixed(2)} total
                            </div>
                        </div>
                    )}
                </div>

                {/* Body */}
                {billingHistoryLoading ? (
                    <BillingHistorySkeleton />
                ) : !billingHistory || billingHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ background: color + "15" }}
                        >
                            <Receipt className="w-5 h-5" style={{ color, opacity: 0.6 }} />
                        </div>
                        <p className="text-sm text-white/25">No billing records yet</p>
                        <p className="text-xs text-white/15">Payments will appear here once processed</p>
                    </div>
                ) : (
                    <div className="relative">
                        <ul className="px-6 py-3 space-y-1">
                            {billingHistory.map((entry, i) => {
                                const isLatest = i === 0
                                const entryDate = new Date(entry?.paymentDate)
                                const dateLabel = entryDate.toLocaleDateString("en-US", {
                                    year: "numeric", month: "short", day: "numeric",
                                })
                                const timeLabel = entryDate.toLocaleTimeString("en-US", {
                                    hour: "2-digit", minute: "2-digit",
                                })
                                return (
                                    <li
                                        key={i}
                                        className="relative flex items-center gap-4 py-3"
                                    >
                                        {/* Timeline dot */}
                                        <div className="relative z-10 shrink-0">
                                            {isLatest ? (
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center ring-2"
                                                    style={{
                                                        background: color + "30",
                                                        boxShadow: `0 0 0 2px ${color}40`,
                                                    }}
                                                >
                                                    <CheckCircle2 className="w-4 h-4" style={{ color }} />
                                                </div>
                                            ) : (
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center"
                                                    style={{ background: "#1e2a3a" }}
                                                >
                                                    <DollarSign className="w-3.5 h-3.5 text-white/20" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white/70">
                                                {sub.name} Payment
                                                {isLatest && (
                                                    <span
                                                        className="ml-2 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                                                        style={{ background: color + "25", color }}
                                                    >
                                                        Latest
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-xs text-white/25 mt-0.5">
                                                {dateLabel}{" "}
                                                <span className="text-white/15">·</span>{" "}
                                                {timeLabel}
                                            </p>
                                        </div>

                                        {/* Amount */}
                                        <div className="text-right shrink-0">
                                            <p
                                                className="text-sm font-bold"
                                                style={{ color: isLatest ? color : "rgba(255,255,255,0.55)" }}
                                            >
                                                {entry.currency.toUpperCase()} {entry.amount.toFixed(2)}
                                            </p>
                                            <p className="text-[10px] text-white/20 mt-0.5 uppercase tracking-wider">
                                                {frequencyLabel[sub.frequency]}
                                            </p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </div>

            {/*  Shared With  */}
            <div
                className="rounded-2xl border border-white/5 overflow-hidden"
                style={{ background: "#111827" }}
            >
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/30" />
                    <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Shared With</h2>
                    <span className="ml-auto text-xs rounded-full px-2 py-0.5 bg-white/5 text-white/30">
                        {sub.sharedWith.length === 0 ? "Only you" : `${sub.sharedWith.length} person${sub.sharedWith.length > 1 ? "s" : ""}`}
                    </span>
                </div>
                <div className="px-6 py-4">
                    {sub.sharedWith.length === 0 ? (
                        <p className="text-sm text-white/20 text-center py-4">Not shared with anyone</p>
                    ) : (
                        <div className="space-y-3">
                            {sub.sharedWith.map((email, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold"
                                        style={{ background: color + "22", color }}
                                    >
                                        {email.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm text-white/60">{email}</span>
                                    <span
                                        className="ml-auto text-xs px-2 py-0.5 rounded-full border border-white/5 text-white/30"
                                        style={{ background: color + "11" }}
                                    >
                                        {sub.costPerPerson.toFixed(2)} {sub.currency}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Timestamps */}
            <div
                className="rounded-2xl border border-white/5 px-6 py-4 flex flex-wrap gap-x-8 gap-y-2"
                style={{ background: "#0f172a" }}
            >
                <div className="flex items-center gap-2 text-xs text-white/25">
                    <Clock className="w-3.5 h-3.5" />
                    Created {fmt(sub.createdAt)}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/25">
                    <RefreshCw className="w-3.5 h-3.5" />
                    Updated {fmt(sub.updatedAt)}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/20 ml-auto font-mono">
                    ID: <span className="text-white/15">{sub._id}</span>
                </div>
            </div>

        </div>
    )
}

export default SubscriptionDetailsPage