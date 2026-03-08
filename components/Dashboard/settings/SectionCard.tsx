const SectionCard = ({
    icon: Icon,
    iconColor = "text-[#6366F1]",
    iconBg = "bg-[#6366F1]/10 border-[#6366F1]/20",
    title,
    subtitle,
    children,
}: {
    icon: React.ElementType
    iconColor?: string
    iconBg?: string
    title: string
    subtitle: string
    children: React.ReactNode
}) => (
    <div className="bg-[#0D1120] border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-black/20">
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}>
                <Icon size={18} className={iconColor} />
            </div>
            <div>
                <h2 className="text-white font-semibold text-base leading-tight">{title}</h2>
                <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>
            </div>
        </div>
        {/* Card Body */}
        <div className="p-6">{children}</div>
    </div>
)


export default SectionCard