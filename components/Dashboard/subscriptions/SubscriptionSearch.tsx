import { Search } from "lucide-react"

const SubscriptionSearch = ({onSearch}: {onSearch: (query: string) => void}) => {
    const handleSearch = (query: string) => {
        if(query === "") {
            onSearch("");
            return;
        }
        onSearch(query);
    }
    return (
        <form>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"/>   
                <input
                onChange={(e) => handleSearch(e.target.value)}
                type="text" 
                placeholder="Search services (e.g. Netflix , AWS)..."
                className="w-full bg-[#16172B] border border-white/6 rounded-full px-12 py-3 outline-none placeholder:text-[#64748B] text-[#64748B]" />
            </div>
        </form>
    )
}

export default SubscriptionSearch