const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const getTopKPIs = async () => {
    try {
        const response = await fetch(`${API_URL}/payments/getTopKPIs`, {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch top KPIs");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching top KPIs:", error);
        return null;
    }
}

export const getSpendingTrends = async () => {
    try {
        const response = await fetch(`${API_URL}/payments/getSpendingTrends`, {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch spending trends");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching spending trends:", error);
        return null;
    }
}

export const getAiInsights = async () => {
    try {
        const response = await fetch(`${API_URL}/payments/ai-insights`, {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch AI insights");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching AI insights:", error);
        throw error;
    }
}
