"use client"
import AddSubscriptionForm from "@/components/subscriptions/AddSubscriptionForm"
import { ArrowLeft, BadgePlus } from "lucide-react"
import Link from "next/link"

// export const metadata = {
//     title: "Add Subscription | Subscription Tracker",
//     description: "Add a new subscription to track your recurring expenses.",
// }

const AddSubscriptionPage = () => {
    return (
        <div className="w-full min-h-full px-4 sm:px-6 lg:px-8 py-8">

            {/* Back link — always visible at top */}
            <Link
                href="/dashboard/subscriptions"
                className="inline-flex items-center gap-1.5 text-sm mb-6 w-fit transition-colors"
                style={{ color: "#94A3B8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#CBD5E1")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
            >
                <ArrowLeft className="size-3.5" />
                Back to subscriptions
            </Link>

            {/* Two-column layout on lg+, single column below */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 xl:gap-12 items-start">

                {/* ── Left: Sticky Info Panel ── */}
                <div className="lg:sticky lg:top-8 flex flex-col gap-5">
                    {/* Icon badge */}
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ background: "linear-gradient(135deg, #6366F1, #22D3EE)" }}
                    >
                        <BadgePlus className="size-6 text-white" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1
                            className="text-2xl xl:text-3xl font-bold tracking-tight leading-tight"
                            style={{ color: "#CBD5E1" }}
                        >
                            Add New Subscription
                        </h1>
                        <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                            Track a new recurring service. Fill in the required fields
                            and we'll keep an eye on renewal dates, costs, and more.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />

                    {/* Quick tips */}
                    <div className="flex flex-col gap-3">
                        {[
                            { dot: "#6366F1", text: "Required fields are marked with an asterisk (*)" },
                            { dot: "#22D3EE", text: "Shared With accepts multiple comma-separated emails" },
                            { dot: "#A78BFA", text: "Add a cancel URL so you never forget where to manage it" },
                        ].map(({ dot, text }) => (
                            <div key={text} className="flex items-start gap-2.5">
                                <span
                                    className="mt-1.5 size-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: dot }}
                                />
                                <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right: Form ── */}
                <div className="min-w-0">
                    <AddSubscriptionForm />
                </div>
            </div>
        </div>
    )
}

export default AddSubscriptionPage