"use client"
import {Settings} from "lucide-react"
import ProfileSection from "@/components/Dashboard/settings/ProfileSection"
import PasswordSection from "@/components/Dashboard/settings/PasswordSection"
import DangerZone from "@/components/Dashboard/settings/DangerZone"

export default function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto lg:max-w-none">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-9 h-9 rounded-xl bg-[#6366F1]/15 border border-[#6366F1]/20 flex items-center justify-center shadow-lg shadow-[#6366F1]/10">
                        <Settings size={17} className="text-[#6366F1]" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
                </div>
                <p className="text-white/40 text-sm ml-12">Manage your account preferences and security</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-6">
                    <ProfileSection />
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    <PasswordSection />
                    <DangerZone />
                </div>
            </div>
        </div>
    )
}
