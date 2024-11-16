'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Confetti from "@/components/ui/confetti";
import { useRef } from "react";
import { ConfettiRef } from "@/components/ui/confetti";
import Link from "next/link";

export default function InsuranceClaimedPage() {
    const confettiRef = useRef<ConfettiRef>(null);
    const tx = "0xd70aabc0b6de74f9830ca1dee00c2e68e989baf0120c2b2adbe08aeb96f3c416"

    return (
        <div className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-6">
            <Confetti
                ref={confettiRef}
                className="fixed inset-0 w-full h-full pointer-events-none"
                options={{
                    particleCount: 100,
                    spread: 70,
                    colors: ['#4B5563', '#9CA3AF', '#E5E7EB'],
                }}
            />

            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center font-bold">
                        Transaction success!
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="text-center text-gray-600">
                        tx: <Link href={`https://testnet.bkcscan.com/tx/${tx}`} className="text-blue-600">{tx.slice(0, 6)}...{tx.slice(-4)}</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}