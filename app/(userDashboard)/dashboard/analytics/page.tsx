import TopCards from "@/components/Dashboard/analytics/TopCards";
import SpendingTrends from "@/components/Dashboard/analytics/SpendingTrends";
import AiInsightsCard from "@/components/Dashboard/analytics/AiInsightsCard";

const page = () => {
    return (
        <main className="space-y-8">
            <TopCards />
            <SpendingTrends />
            <AiInsightsCard />
        </main>
    )
}

export default page;
