import { useAuth } from '@/contexts/authContext'
import { updateUserProfile } from '@/services/user'
import { useMutation } from '@tanstack/react-query'
import { Camera, CheckCircle2, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import SectionCard from './SectionCard'

const Avatar = ({ name }: { name?: string | String }) => {
    const initials = name
        ? String(name).trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
        : "?"
    return (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold select-none shrink-0 ring-4 ring-[#6366F1]/20 shadow-xl shadow-[#6366F1]/20">
            {initials}
        </div>
    )
}

const ProfileSection = () => {
    const { user, refreshUser } = useAuth()
    const originalName = String(user?.name ?? "")
    const originalEmail = String(user?.email ?? "")
    const [name, setName] = useState(originalName)
    const [email, setEmail] = useState(originalEmail)

    const getChangedFields = () => {
        const payload: { name?: string; email?: string } = {}
        if (name.trim() && name.trim() !== originalName) payload.name = name.trim()
        if (email.trim() && email.trim() !== originalEmail) payload.email = email.trim()
        return payload
    }

    const hasChanges = name.trim() !== originalName || email.trim() !== originalEmail

    const mutation = useMutation({
        mutationFn: () => updateUserProfile(getChangedFields()),
        onSuccess: async () => {
            await refreshUser()
            toast.success("Profile updated successfully!", {
                description: "Your changes have been saved.",
                icon: <CheckCircle2 size={16} className="text-emerald-400" />,
            })
        },
        onError: (err: Error) => {
            toast.error(err.message || "Failed to update profile", {
                description: "Please check your info and try again.",
            })
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!hasChanges) return toast.error("No changes to save")
        if (name.trim() === "") return toast.error("Name cannot be empty")
        if (email.trim() === "") return toast.error("Email cannot be empty")
        mutation.mutate()
    }

    return (
        <SectionCard icon={User} title="Profile Information" subtitle="Update your display name and email address">
            {/* Avatar Preview */}
            <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/5">
                <div className="relative">
                    {user?.profileImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={user.profileImage} alt="Profile" className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#6366F1]/20 shadow-xl" />
                    ) : (
                        <Avatar name={user?.name} />
                    )}
                    <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl bg-[#6366F1] flex items-center justify-center shadow-lg shadow-[#6366F1]/40 border-2 border-[#0D1120]">
                        <Camera size={12} className="text-white" />
                    </div>
                </div>
                <div>
                    <p className="text-white font-semibold">{user?.name || "—"}</p>
                    <p className="text-white/40 text-sm mt-2 truncate max-w-xs">{String(user?.email ?? "")}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    id="settings-name"
                    label="Full Name"
                    value={name}
                    onChange={setName}
                    placeholder="John Doe"
                    icon={User}
                />
                <InputField
                    id="settings-email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    icon={Mail}
                />
                <div className="flex justify-end pt-2">
                    <SubmitButton loading={mutation.isPending} label="Save Changes" disabled={!hasChanges} />
                </div>
            </form>
        </SectionCard>
    )
}


export default ProfileSection