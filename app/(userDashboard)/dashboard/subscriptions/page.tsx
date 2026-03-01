import SubscriptionsTable from "@/components/subscriptions/SubscriptionsTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const page = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
                <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">Subscriptions</h1>
                    <p className="text-[#94A3B8] text-sm mt-2">Manage your recurring payments and optimize spending</p>
                </div>
                <Button className="cursor-pointer rounded-full py-6 px-8 hover:shadow-md shadow-primary hover:backdrop-blur-2xl hover:-translate-y-1 transition-all duration-300">
                    <Plus className="size-4" />
                    Add Subscription
                </Button>
            </div>

            {/* SUbscriptions Search */}
            <p className="text-white text-center py-16">Search Will Be Here</p>

            {/* Subscription Table */}
            <SubscriptionsTable />
        </div>
    )
}

export default page