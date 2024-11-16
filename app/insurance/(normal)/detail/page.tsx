'use client';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef } from "react";
import { sdk } from "@/lib/bitkubchain-sdk";
import { usdc } from "@/abi";
import { parseUnits } from "viem";
import Confetti, { ConfettiRef } from "@/components/ui/confetti";

export default function InsuranceDetailPage() {
    return <Suspense>
        <Result></Result>
    </Suspense>
}

function Result() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isOnTime = searchParams?.get('isOnTime');
    const confettiRef = useRef<ConfettiRef>(null);

    const handleClaim = async () => {
        console.log('claim')
        const address = await sdk.getUserWalletAddress()
        await sdk.approveToken(usdc.address, parseUnits('1', 6).toString(), address)
        router.push('/insurance/claimed')
    }

    return <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
        <div className="text-center mb-8">
            {isOnTime == 'true' ? <h1 className="text-3xl font-bold text-gray-600 mb-2">Congratulations!</h1> :
                <h1 className="text-3xl font-bold text-gray-600 mb-2">Sorry</h1>}
            {isOnTime == 'true' ? <p className="text-lg text-gray-600">You arrived on time</p> : <p className="text-lg text-gray-600">Sorry About delay.</p>}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-gray-600 mb-2">Est. time</div>
                    <div className="text-xl font-semibold text-blue-600">00:15:40</div>
                </div>
                <div className={cn("text-center p-4 rounded-lg", isOnTime == 'true' ? "bg-green-50" : "bg-red-50")}>
                    <div className="text-gray-600 mb-2">Act. time</div>
                    {isOnTime == 'true' ? <div className="text-xl font-semibold text-green-600">00:13:21</div> : <div className="text-xl font-semibold text-red-600">00:19:21</div>}
                </div>
            </div>
        </div>
        {isOnTime != 'true' && <Button onClick={handleClaim} className="mt-4 w-full">Claim</Button>}
    </div>



}