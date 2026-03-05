import { CreateSubscritionSchema } from "@/lib/Schemas"
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
export const getSpendingDetails = async () => {
    try {
        const res = await fetch(`${API_URL}/subscriptions/user/spendingAnalytics`, {
            credentials: "include"
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Error While Fetching Your Subscriptions Details. Please Try Again Later!")
        }
    } catch (error) {
        console.error(`Failed To Fetch Subscriptions: ` + error)
        throw new Error('Failed To Fetch Your Subscriptions Details')
    }
}


export const getUserSubscriptions = async () => {
    try {
        const res = await fetch(`${API_URL}/subscriptions/user`, {
            credentials: "include"
        })

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Error While Getting Your Subscriptions Please Try Again Later!")
        }
    } catch (error) {
        console.error(error)
        throw new Error("Error While Getting User Subscriptions")
    }
}

export const addSubscription = async (data: CreateSubscritionSchema) => {
    try {
        const res = await fetch(`${API_URL}/subscriptions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Failed To Add Subscription")
        }
        const sub = await res.json();
        return sub;
    } catch (error) {
        console.error("Erro While Creating The Susbcription" + error);
        throw new Error("Failed To Add Your Subscription Please Try Again!")
    }
}

export const deleteUserSubscription = async (id: String) => {
    try {
        const res = await fetch(`${API_URL}/subscriptions/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error("Failed To Delete Subscription");
        }

        const sub = await res.json();
        return sub;
    } catch (error) {
        console.error("Error While Deleting Subscription" + error);
        throw new Error("Failed To Delete Your Subscription Please Try Again Later!");
    }
}

export const getSubscriptionById = async (id: string) => {
    try {
        const res = await fetch(`${API_URL}/subscriptions/${id}`, {
            credentials: "include",
        });
        if (!res.ok) {
            throw new Error("Failed To Fetch Subscription");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error While Fetching Subscription: " + error);
        throw new Error("Failed To Fetch Subscription Details");
    }
}
