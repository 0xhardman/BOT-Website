"use client"

import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { BetDialog } from "./bet-dialog"

export type Bet = {
    id: string
    bet: string
    value: number
    minParticipants: number,
    status: "ongoing" | "ended"
    yes: number
    no: number
    judge: string
    endsAt: number
}


export const columns: ColumnDef<Bet>[] = [
    {
        accessorKey: "id",
        header: "#",
    },
    {
        accessorKey: "bet",
        header: "Bet",
        cell: ({ row }) => {
            return <div >{row.original.bet}</div>
        }
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => {
            return <div className="">${row.original.value}</div>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return <div className={cn("text-sm uppercase text-white text-center rounded-md px-2 py-1 w-fit", row.original.status === "ongoing" ? "bg-green-500" : "bg-red-500")}>{row.original.status}</div>
        }
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            return <BetDialog bet={row.original} />
        }
    },
]
