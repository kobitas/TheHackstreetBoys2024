"use client"
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Network, User, Search, Home, Plus } from 'lucide-react'
import { theme } from "@/lib/theme"

export default function InnerLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <div className="bg-secondary h-12 w-full flex justify-between items-center px-4">
                <div /> {/* Empty div for spacing */}
                <div className="flex items-center gap-4">
                    <button 
                        className="p-2"
                        onClick={() => router.push('/user/organisation')}
                    >
                        <Network size={24} color="#DAF2FB" strokeWidth={2} />
                    </button>
                    <button 
                        className="p-2"
                        onClick={() => router.push('/user/profile')}
                    >
                        <User size={24} color="#DAF2FB" strokeWidth={2} />
                    </button>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
                {children}
            </div>
            
            {/* Bottom Navigation - Updated according to Figma */}
            <nav 
                className="h-[68px] w-full mx-auto px-4 
                          flex justify-center items-center
                          bg-[#010709] rounded-t-lg
                          shadow-[0px_4px_16px_0px_#78D1F2]"
                style={{
                    padding: "15px 0"
                }}
            >
                <div className="flex justify-around items-center w-full">
                    <button 
                        className="p-2 hover:opacity-80 transition-opacity"
                        onClick={() => router.push('/user/search')}
                    >
                        <Search size={24} color="#DAF2FB" strokeWidth={2} />
                    </button>
                    <button 
                        className="p-2 hover:opacity-80 transition-opacity" 
                        onClick={() => router.push('/user/home')}
                    >
                        <Home size={24} color="#DAF2FB" strokeWidth={2} />
                    </button>
                    <button 
                        className="p-2 hover:opacity-80 transition-opacity"
                        onClick={() => router.push('/user/add')}
                    >
                        <Plus size={24} color="#DAF2FB" strokeWidth={2} />
                    </button>
                </div>
            </nav>
        </div>
    )
}
