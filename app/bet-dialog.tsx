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
import { Bet } from "./columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";




export function BetDialog({ bet }: { bet: Bet }) {
    const [selected, setSelected] = useState<"yes" | "no" | null>(null);
    const [value, setValue] = useState<number>(0);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Join</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Join a Bet</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <div className="border p-4 text-center italic">
                        {bet.bet}
                    </div>
                    <div className="flex flex-col gap-4">

                        <div className="flex justify-center items-center mt-4 gap-2">
                            <span>Judger:</span>
                            <div className="flex  items-center gap-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span>{bet.judge}</span>
                            </div>

                        </div>

                        <div className="flex justify-center items-center mt-4 gap-2">
                            <span>Ends in:</span>
                            <span>{new Date(bet.endsAt * 1000).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        </div>


                        <div className="flex items-center gap-2">
                            <Progress value={bet.yes / (bet.yes + bet.no) * 100} />
                            <div>{(bet.yes / (bet.yes + bet.no) * 100).toFixed(2)}%</div>
                        </div>
                        <div className="flex justify-center gap-2">
                            <Button variant={selected === "yes" ? "default" : "outline"} className="w-full" onClick={() => setSelected("yes")}>Yes({bet.yes})</Button>
                            <Button variant={selected === "no" ? "default" : "outline"} className="w-full" onClick={() => setSelected("no")}>No({bet.no})</Button>
                        </div>
                        <Label>Value</Label>
                        <div className="flex items-center gap-2">
                            <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
                            <div>ETH</div>
                        </div>
                        <Button className="w-full">Confirm</Button>

                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
