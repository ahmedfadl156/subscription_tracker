const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface UpdateProfileData {
    name?: string;
    email?: string;
}

export interface UpdatePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const updateUserProfile = async (updatedData: UpdateProfileData) => {
    try {
        const res = await fetch(`${API_URL}/users/updateMe`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedData)
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to update user profile")
        }

        const user = await res.json();
        return user;
    } catch (error) {
        console.error("Error while updating user: " + error)
        throw error instanceof Error ? error : new Error("Failed to update user profile")
    }
}

export const updatePassword = async (data: UpdatePasswordData) => {
    try {
        const res = await fetch(`${API_URL}/auth/updatePassword`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to update password")
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Error while updating password: " + error)
        throw error instanceof Error ? error : new Error("Failed to update password")
    }
}

export const deleteMe = async () => {
    try {
        const res = await fetch(`${API_URL}/users/deleteMe`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error("Failed To Delte User");
        }

        const text = await res.text();
        return text ? JSON.parse(text) : null;
    } catch (error) {
        console.error("Error while deleting user: " + error)
        throw error instanceof Error ? error : new Error("Failed to delete user account")
    }
}