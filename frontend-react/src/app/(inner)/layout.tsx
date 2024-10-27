"use client"

import { MainNav } from '@/components/dashboard/main-nav'
import TeamSwitcher from '@/components/dashboard/team-switcher'
import { ModeToggle } from '@/components/dark-mode-toggle'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function InnerLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className="hidden flex-col md:flex">
            {/* <div className="flex h-16 items-center px-4">
                <ModeToggle />
            </div> */}
            {children}
        </div>
    )
}
