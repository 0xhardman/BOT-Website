'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { sdk } from "@/lib/bitkubchain-sdk";
import { usdc } from "@/abi";
import { parseUnits } from "viem";
import Confetti, { ConfettiRef } from "@/components/ui/confetti";
import { useGenerateProof } from "@/hooks/api/useGenerateProof";
import { Input } from "@/components/ui/input";

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
    const [stage, setStage] = useState(0)


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
        {isOnTime != 'true' && <>
            {stage == 0 && <GenerateProof onSuccess={() => setStage(1)} />}
            {stage == 1 && <Button onClick={handleClaim} className="mt-4 w-full">Claim</Button>}
        </>}
    </div>
}

function GenerateProof({ onSuccess }: { onSuccess: () => void }) {
    const { trigger: generateProof, isMutating: isGeneratingProof } = useGenerateProof()
    const [email, setEmail] = useState('')
    const [emlFile, setEmlFile] = useState<File | null>(null)
    const [address, setAddress] = useState('')
    const handleGenerateProof = async () => {
        console.log('success')
        onSuccess()
        if (emlFile) {
            await generateProof({
                email,
                emlFile
            })

        }

    }
    return <Dialog>
        <DialogTrigger asChild>
            <Button className="mt-4 w-full">Generate Proof</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Generate Proof</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Please enter your email address to receive notifications about your trip.
            </DialogDescription>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
                type="file"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                        setEmlFile(file)
                    }
                }}
                accept=".eml"
            />
            <Button type="submit" onClick={handleGenerateProof}>Submit</Button>
        </DialogContent>
    </Dialog>
}