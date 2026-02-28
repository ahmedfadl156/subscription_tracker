"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: String,
    email: String,
    name?: String,
    profileImage?: string
}

interface AuthContextType {
    user: User | null,
    isLoading: boolean,
    isAuthenticated: boolean,
    signUp: (name: string, email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const res = await fetch(`${API_URL}/users/getMe`, {
                credentials: "include"
            })
            if (res.ok) {
                const userData = await res.json();
                setUser(userData.data)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error(error)
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const signIn = async (email: String, password: String) => {
        try {
            const res = await fetch(`${API_URL}/auth/sign-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })
            setIsLoading(true)
            if (res.ok) {
                await checkAuth();
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || "Login Failed Please Try Again!")
            }
        } catch (error) {
            setIsLoading(false)
            console.error("Login Failed", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const signOut = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/sign-out`, {
                method: "POST",
                credentials: "include"
            })
            if (res.ok) {
                setUser(null)
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || "Logout Failed Please Try Again!")
            }
        } catch (error) {
            console.error("Logout Failed", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
