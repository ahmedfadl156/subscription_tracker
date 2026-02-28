import Navbar from '@/components/shared/Navbar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="bg-[#0B0F19] min-h-screen">
                <Navbar />
                {children}
        </main>
    )
}

export default layout