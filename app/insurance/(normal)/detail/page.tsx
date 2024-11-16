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
import { bot, usdc } from "@/abi";
import { parseUnits } from "viem";
import Confetti, { ConfettiRef } from "@/components/ui/confetti";
import { useGenerateProof } from "@/hooks/api/useGenerateProof";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function InsuranceDetailPage() {
    return <Suspense>
        <Result></Result>
    </Suspense>
}

function Result() {
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()
    const isOnTime = searchParams?.get('isOnTime');
    const startTime = Number(searchParams?.get('startTime') ?? '0');
    const endTime = Number(searchParams?.get('endTime') ?? '0');
    const stopTime = Number(searchParams?.get('stopTime') ?? '0');
    const confettiRef = useRef<ConfettiRef>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [stage, setStage] = useState(0)


    const handleClaim = async () => {
        console.log('claim')
        // setIsLoading(true)
        const address = await sdk.getUserWalletAddress()
        await sdk.approveToken(usdc.address, parseUnits('1', 6).toString(), address)
        const res2 = await sdk.sendCustomTx(
            bot.address, "claim(address bitkubNext_)", [])
        while (true) {
            const waitRes = await sdk.getTransactionDetails(res2.queueID);
            console.log("waitRes", waitRes)

            if (waitRes.status === "MINED") {
                toast({
                    title: 'Success',
                    description: 'Trip started',
                })
                // setIsLoading(false)

                break;
            }
        }
        router.push('/insurance/claimed')
    }

    function formatTime(time: number) {
        const timeInSeconds = Math.floor(time / 1000)
        const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
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
                    <div className="text-xl font-semibold text-blue-600">{formatTime(endTime - startTime)}</div>
                </div>
                <div className={cn("text-center p-4 rounded-lg", isOnTime == 'true' ? "bg-green-50" : "bg-red-50")}>
                    <div className="text-gray-600 mb-2">Act. time</div>
                    {isOnTime == 'true' ? <div className="text-xl font-semibold text-green-600">{formatTime(stopTime - startTime)}</div> : <div className="text-xl font-semibold text-red-600">{formatTime(stopTime - startTime)}</div>}
                </div>
            </div>
        </div>
        {isOnTime != 'true' && <>
            {stage == 0 && <GenerateProof onSuccess={() => setStage(1)} />}
            {stage == 1 && <Button onClick={handleClaim} className="mt-4 w-full" disabled={isLoading}>{"claim"}</Button>}
        </>}
    </div>
}

function GenerateProof({ onSuccess }: { onSuccess: () => void }) {
    const { trigger: generateProof, isMutating: isGeneratingProof } = useGenerateProof()
    const [email, setEmail] = useState('')
    const { toast } = useToast()
    const [emlFile, setEmlFile] = useState<File | null>(null)
    const [address, setAddress] = useState('')
    const handleGenerateProof = async () => {
        console.log('success')
        onSuccess()
        try {
            if (emlFile) {
                await generateProof({
                    email,
                    emlFile
                })
            }
        } catch (error) {
            // toast({
            //     title: 'Error',
            //     description: 'Something went wrong',
            // })
            console.error(error)
        } finally {
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast({
                title: 'Success',
                description: 'Proof generated',
            })
            onSuccess()
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