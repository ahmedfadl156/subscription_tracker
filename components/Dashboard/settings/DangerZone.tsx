"use client";

import { useState } from "react";
import { deleteMe } from "@/services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/authContext"
import { useRouter } from "next/navigation"

const DeleteAccountConfirmModal = ({
    open,
    onClose,
    onConfirm,
    loading,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.55)" }}
            onClick={(e) => { if (e.target === e.currentTarget && !loading) onClose(); }}
        >
            <div
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
                    animation: "modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both",
                }}
            >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl" style={{ background: "rgba(239,68,68,0.12)" }} />

                <div className="relative px-8 pt-8 pb-7 flex flex-col items-center text-center gap-5">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-full border border-red-500/20" style={{ background: "rgba(239,68,68,0.1)" }}>
                        <AlertTriangle className="w-7 h-7 text-red-400" strokeWidth={1.8} />
                    </div>

                    {/* Text */}
                    <div className="space-y-1.5">
                        <h2 className="text-xl font-semibold text-white tracking-tight">Delete Account?</h2>
                        <p className="text-sm text-white/45 leading-relaxed max-w-xs">
                            This action is permanent and cannot be undone. All your data will be wiped out immediately.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/5" />

                    {/* Actions */}
                    <div className="flex w-full gap-3">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 border border-white/10 transition-all duration-200 hover:bg-white/5 hover:text-white hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white border border-red-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                            style={{ background: loading ? "rgba(239,68,68,0.4)" : "linear-gradient(135deg,#ef4444,#dc2626)", boxShadow: loading ? "none" : "0 4px 20px rgba(239,68,68,0.35)" }}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Deleting…
                                </>
                            ) : (
                                "Delete Account"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.88) translateY(12px); }
                    to   { opacity: 1; transform: scale(1)   translateY(0);    }
                }
            `}</style>
        </div>
    );
};

const DangerZone = () => {
    const [showModal, setShowModal] = useState(false);
    const queryClient = useQueryClient()
    const { clearUser } = useAuth()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: deleteMe,
        onSuccess: () => {
            toast.success("Account deleted successfully!")
            queryClient.invalidateQueries({ queryKey: ["user"] })
            setShowModal(false)
            clearUser()
            router.push('/sign-up')
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete account")
        }
    })
    return (
        <div className="bg-red-500/5 border border-red-500/15 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-red-500/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <AlertTriangle size={18} className="text-red-400" />
                </div>
                <div>
                    <h2 className="text-white font-semibold text-base leading-tight">Danger Zone</h2>
                    <p className="text-white/40 text-xs mt-0.5">Irreversible actions — proceed with caution</p>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <p className="text-white/80 text-sm font-medium">Delete Account</p>
                        <p className="text-white/35 text-xs mt-0.5">
                            Permanently delete your account and all associated data. This cannot be undone.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete your account"
                    >
                        <AlertTriangle size={13} />
                        Delete Account
                    </button>
                </div>
            </div>
            <DeleteAccountConfirmModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => mutation.mutate()}
                loading={mutation.isPending}
            />
        </div>
    )
}

export default DangerZone