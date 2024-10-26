'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    userType: 'admin' | 'driver'
}

export function MainNav({
    className,
    userType,
    ...props
}: MainNavProps) {
    const pathname = usePathname()

    const navItems = userType === 'admin'
        ? [
            { href: "/admin/overview", label: "Overview" },
            // { href: "/admin/random-page", label: "Random Page" },
        ]
        : [
            { href: "/user/search", label: "Search" },
            { href: "/user/profile", label: "Profile" },
        ]

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {navItems.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === href
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}
