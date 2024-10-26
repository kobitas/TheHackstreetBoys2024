"use client"

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Network, User } from 'lucide-react'

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
                        onClick={() => router.push('/organisation')}
                    >
                        <Network size={24} color="white" strokeWidth={2} />
                    </button>
                    <button 
                        className="p-2"
                        onClick={() => router.push('/account')}
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
                <button className="p-2" onClick={() => router.push('/search')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                </button>
                <button className="p-2" onClick={() => router.push('/home')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    </svg>
                </button>
                <button className="p-2" onClick={() => router.push('/add')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}
