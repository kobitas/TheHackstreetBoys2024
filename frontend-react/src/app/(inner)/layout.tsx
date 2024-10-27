"use client"

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Network, User, Search, Home, Plus } from 'lucide-react'


export default function InnerLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-[#001A1A] flex flex-col">
            {/* Header */}
            <div className="bg-blue-900 h-12 w-full flex justify-between items-center px-4">
                <div /> {/* Empty div for spacing */}
                <div className="flex items-center gap-4">
                    <button 
                        className="p-2" 
                        onClick={() => router.push('/user/organisation')}
                    >
                        <Network size={24} color="white" strokeWidth={2} />
                    </button>
                    <button 
                        className="p-2"
                        onClick={() => router.push('/user/profile')}
                    >
                        <User size={24} color="white" strokeWidth={2} />
                    </button>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
                {children}
            </div>
            
            {/* Bottom Navigation */}
            <div className="h-16 border-t border-gray-700 flex justify-around items-center px-4">
                <button className="p-2" onClick={() => router.push('/user/search')}>
                    <Search size={24} color="white" strokeWidth={2} />
                </button>
                <button className="p-2" onClick={() => router.push('/user/home')}>
                    <Home size={24} color="white" strokeWidth={2} />
                </button>
                <button className="p-2" onClick={() => router.push('/user/add')}>
                    <Plus size={24} color="white" strokeWidth={2} />
                </button>
            </div>
        </div>
    )
}
