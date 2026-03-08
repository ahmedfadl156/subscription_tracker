const InputField = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    icon: Icon,
    rightElement,
    disabled = false,
    hint,
}: {
    id: string
    label: string
    type?: string
    value: string
    onChange: (v: string) => void
    placeholder?: string
    icon: React.ElementType
    rightElement?: React.ReactNode
    disabled?: boolean
    hint?: string
}) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="block text-xs font-medium text-white/50 uppercase tracking-widest">
            {label}
        </label>
        <div className="relative">
            <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20
                    focus:outline-none focus:border-[#6366F1]/50 focus:bg-white/8 focus:ring-1 focus:ring-[#6366F1]/20
                    transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
                    ${rightElement ? "pr-11" : ""}`}
            />
            {rightElement && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
            )}
        </div>
        {hint && <p className="text-[11px] text-white/25 leading-relaxed">{hint}</p>}
    </div>
)


export default InputField