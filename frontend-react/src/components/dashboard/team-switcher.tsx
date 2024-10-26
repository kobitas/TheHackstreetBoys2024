"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
    CaretSortIcon,
    CheckIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const groups = [
    {
        label: "Admin",
        teams: [
            {
                label: "Alicia Koch",
                value: "admin",
            },
        ],
    },
    {
        label: "Driver",
        teams: [
            {
                label: "John Doe",
                value: "driver",
            }
        ],
    },
]

type Team = (typeof groups)[number]["teams"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {
    onTeamSwitch: (team: Team) => void
}

export default function TeamSwitcher({ className, onTeamSwitch }: TeamSwitcherProps) {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname()

    const isAdmin = pathname.startsWith('/admin')
    const defaultTeam = isAdmin ? groups[0].teams[0] : groups[1].teams[0]

    const [selectedTeam, setSelectedTeam] = React.useState<Team>(defaultTeam)

    React.useEffect(() => {
        const newTeam = isAdmin ? groups[0].teams[0] : groups[1].teams[0]
        setSelectedTeam(newTeam)
    }, [isAdmin])

    const handleTeamSelect = (team: Team) => {
        setSelectedTeam(team)
        setOpen(false)
        onTeamSwitch(team)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a team"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                            src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                            alt={selectedTeam.label}
                            className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {selectedTeam.label}
                    <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search person..." />
                    <CommandList>
                        <CommandEmpty>No team found.</CommandEmpty>
                        {groups.map((group) => (
                            <CommandGroup key={group.label} heading={group.label}>
                                {group.teams.map((team) => (
                                    <CommandItem
                                        key={team.value}
                                        onSelect={() => handleTeamSelect(team)}
                                        className="text-sm"
                                    >
                                        <Avatar className="mr-2 h-5 w-5">
                                            <AvatarImage
                                                src={`https://avatar.vercel.sh/${team.value}.png`}
                                                alt={team.label}
                                                className="grayscale"
                                            />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        {team.label}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedTeam.value === team.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
