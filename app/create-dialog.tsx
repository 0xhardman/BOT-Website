"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { CreateForm } from "./create-form";


export function CreateDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create a Bet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create a Bet</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <CreateForm />
                </div>
            </DialogContent>
        </Dialog>
    )
}
