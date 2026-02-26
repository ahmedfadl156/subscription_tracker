import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { AuthProvider } from '@/contexts/authContext'

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="bg-[#0B0F19] min-h-screen">
            <AuthProvider>
                <Navbar />
                {children}
            </AuthProvider>
        </main>
    )
}

export default layout