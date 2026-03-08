import { CheckCircle2, Loader2 } from "lucide-react"

const SubmitButton = ({
    loading,
    label,
    loadingLabel = "Saving…",
    disabled = false,
}: {
    loading: boolean
    label: string
    loadingLabel?: string
    disabled?: boolean
}) => (
    <button
        type="submit"
        disabled={loading || disabled}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#6366F1] text-white
            hover:bg-[#5254CC] active:scale-[0.98] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#6366F1]/25"
    >
        {loading ? (
            <>
                <Loader2 size={15} className="animate-spin" />
                {loadingLabel}
            </>
        ) : (
            <>
                <CheckCircle2 size={15} />
                {label}
            </>
        )}
    </button>
)

export default SubmitButton