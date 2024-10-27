"use client"

import { MainNav } from '@/components/dashboard/main-nav'
import TeamSwitcher from '@/components/dashboard/team-switcher'
import { ModeToggle } from '@/components/dark-mode-toggle'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function InnerLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    const userType = pathname.startsWith('/admin') ? 'admin' : 'driver'

    const handleTeamSwitch = (team: { label: string; value: string }) => {
        if (team.value === "admin") {
            router.push('/admin/overview')
        } else {
            router.push('/user/search')
        }
    }

    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <TeamSwitcher onTeamSwitch={handleTeamSwitch} />
                    <MainNav className="mx-6" userType={userType} />
                    <div className="ml-auto flex items-center space-x-4">
                        <ModeToggle />
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
