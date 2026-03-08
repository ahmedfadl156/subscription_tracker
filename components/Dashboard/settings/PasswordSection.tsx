import { AlertTriangle, CheckCircle2, Eye, EyeOff, Lock, Shield } from "lucide-react"
import InputField from "./InputField"
import SubmitButton from "./SubmitButton"
import SectionCard from "./SectionCard"
import { toast } from "sonner"
import { updatePassword } from "@/services/user"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

const EyeToggle = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <button
        type="button"
        onClick={onToggle}
        className="text-white/30 hover:text-white/60 transition-colors duration-150 p-0.5"
        tabIndex={-1}
    >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
)


const PasswordSection = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const getStrength = (pass: string) => {
        if (!pass) return { level: 0, label: "", color: "" }
        let score = 0
        if (pass.length >= 8) score++
        if (/[A-Z]/.test(pass)) score++
        if (/[0-9]/.test(pass)) score++
        if (/[^A-Za-z0-9]/.test(pass)) score++
        const config: Record<number, { label: string; color: string }> = {
            1: { label: "Weak", color: "bg-red-500" },
            2: { label: "Fair", color: "bg-amber-500" },
            3: { label: "Good", color: "bg-cyan-400" },
            4: { label: "Strong", color: "bg-emerald-500" },
        }
        return { level: score, ...(config[score] ?? { label: "", color: "" }) }
    }

    const strength = getStrength(newPassword)

    const mutation = useMutation({
        mutationFn: () => updatePassword({ oldPassword, newPassword, confirmPassword }),
        onSuccess: () => {
            toast.success("Password changed successfully!", {
                description: "Your new password is active.",
                icon: <Shield size={16} className="text-emerald-400" />,
            })
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
        },
        onError: (err: Error) => {
            toast.error(err.message || "Failed to change password", {
                description: "Make sure your old password is correct.",
            })
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!oldPassword) return toast.error("Enter your old password")
        if (newPassword.length < 8) return toast.error("New password must be at least 8 characters")
        if (newPassword !== confirmPassword) return toast.error("Passwords do not match")
        mutation.mutate()
    }

    const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword

    return (
        <SectionCard
            icon={Lock}
            iconColor="text-cyan-400"
            iconBg="bg-cyan-400/10 border-cyan-400/20"
            title="Change Password"
            subtitle="Keep your account secured with a strong password"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    id="old-password"
                    label="old Password"
                    type={showOld ? "text" : "password"}
                    value={oldPassword}
                    onChange={setOldPassword}
                    placeholder="Enter old password"
                    icon={Lock}
                    rightElement={<EyeToggle show={showOld} onToggle={() => setShowOld((v) => !v)} />}
                />

                <InputField
                    id="new-password"
                    label="New Password"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="Min. 8 characters"
                    icon={Shield}
                    rightElement={<EyeToggle show={showNew} onToggle={() => setShowNew((v) => !v)} />}
                />

                {/* Strength bar */}
                {newPassword.length > 0 && (
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 flex gap-1 h-1 rounded-full overflow-hidden bg-white/5">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`flex-1 rounded-full transition-all duration-300 ${s <= strength.level ? strength.color : "bg-white/10"}`}
                                    />
                                ))}
                            </div>
                            {strength.label && (
                                <span className="text-[11px] text-white/40 font-medium w-12 text-right">{strength.label}</span>
                            )}
                        </div>
                        <p className="text-[11px] text-white/25">
                            Use at least 8 characters, uppercase letters, numbers, and symbols for a stronger password.
                        </p>
                    </div>
                )}

                <div className="relative">
                    <InputField
                        id="confirm-password"
                        label="Confirm New Password"
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Re-enter new password"
                        icon={Lock}
                        rightElement={<EyeToggle show={showConfirm} onToggle={() => setShowConfirm((v) => !v)} />}
                    />
                    {/* Match indicator */}
                    {confirmPassword.length > 0 && (
                        <div className={`absolute right-11 top-[38px] flex items-center gap-1 text-[11px] font-medium transition-all duration-200 ${passwordsMatch ? "text-emerald-400" : "text-red-400"}`}>
                            {passwordsMatch ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                            {passwordsMatch ? "Match" : "No match"}
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-2">
                    <SubmitButton loading={mutation.isPending} label="Update Password" loadingLabel="Updating…" />
                </div>
            </form>
        </SectionCard>
    )
}

export default PasswordSection