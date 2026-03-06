const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export interface Notification {
    _id: string
    user: string
    title: string
    message: string
    type: "success" | "warning" | "info" | "error"
    subscription: string | null
    actionUrl: string | null
    isRead: boolean
    createdAt: string
    updatedAt: string
}

export interface NotificationsResponse {
    status: string
    data: {
        notifications: Notification[]
        unreadCount: number
    }
}

export const getUserNotifications = async (): Promise<NotificationsResponse> => {
    try {
        const res = await fetch(`${API_URL}/notifications`, {
            credentials: "include",
        })
        if (!res.ok) {
            throw new Error("Failed To Fetch Notifications")
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error While Fetching Notifications: " + error)
        throw new Error("Failed To Fetch Your Notifications. Please Try Again Later!")
    }
}

export const markNotificationsAsRead = async (notificationId?: string): Promise<void> => {
    try {
        const body = notificationId ? { notificationId } : {}
        const res = await fetch(`${API_URL}/notifications/mark-as-read`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        })
        if (!res.ok) {
            throw new Error("Failed To Mark Notifications As Read")
        }
    } catch (error) {
        console.error("Error While Marking Notifications As Read: " + error)
        throw new Error("Failed To Mark Notifications As Read. Please Try Again!")
    }
}
