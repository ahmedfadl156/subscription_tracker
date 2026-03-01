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
        const res = await fetch(`${API_URL}/subscriptions/user` , {
            credentials: "include"
        })

        if(res.ok){
            const data = await res.json();
            return data;
        }else{
            throw new Error("Error While Getting Your Subscriptions Please Try Again Later!")
        }
    } catch (error) {
        console.error(error)
        throw new Error("Error While Getting User Subscriptions")
    }
}