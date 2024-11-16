import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { parseUnits } from "viem";
import { useWriteContract } from "wagmi";
import { bot, usdc } from "@/abi";
import { sdk } from "@/lib/bitkubchain-sdk";
import { buffer } from "stream/consumers";
import { randomBytes } from "crypto";
import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { useRegisterEmail } from "@/hooks/api/useRegisterEmail";
import { useStoreSecret } from "@/hooks/useNillionApi";

const NETWORK = process.env.NEXT_PUBLIC_NETWORK?.startsWith('BKC') ? 'BKC' : 'NORMAL'

export default function PayBtn({ durationInTraffic }: { durationInTraffic: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams?.get('origin') ?? '';
    const destination = searchParams?.get('destination') ?? '';
    const [stage, setStage] = useState(-1)
    const { trigger: triggerUpload, isMutating: isUploading } = useStoreSecret()

    const { writeContractAsync } = useWriteContract()
    useEffect(() => {
        if (stage == -1) {
            return
        }
        if (stage == 0)
            (async () => {
                try {
                    const destArr = destination.split(',')
                    console.log(Number(destArr[0]) * 10000000)
                    await triggerUpload({
                        secretName: 'destLongitude',
                        secretValue: Number(destArr[0]) * 10000000,
                    })
                    await triggerUpload({
                        secretName: 'destLatitude',
                        secretValue: Number(destArr[1]) * 10000000,
                    })
                } catch (error) {
                    console.log(error)
                } finally {
                    setStage(stage + 1)
                }

            })()
        if (stage == 1)
            (async () => {
                try {
                    const originArr = origin.split(',')
                    await triggerUpload({
                        secretName: 'originLongitude',
                        secretValue: Number(originArr[0]) * 10000000,
                    })
                    await triggerUpload({
                        secretName: 'originLatitude',
                        secretValue: Number(originArr[1]) * 10000000,
                    })
                } catch (error) {
                    console.log(error)
                } finally {
                    setStage(stage + 1)
                }
            })()
        if (stage >= 2) {
            router.push(`/insurance/check?destination=${destination}&endTime=${new Date(new Date().getTime() + durationInTraffic * 1100).getTime()}&startTime=${new Date().getTime()}`)
        }
    }, [stage])
    const handlePay = NETWORK == "NORMAL" ? async () => {
        try {
            await writeContractAsync({
                ...usdc,
                functionName: "transfer",
                args: ['0xCC968F87F7b7Cd5e3493cF87A7A6D2CaCC4E3d50', parseUnits("20", 6)]
            })
            setStage(0)
        } catch (error) {
            console.log(error)
        }
    } : async () => {
        console.log(bot.address)
        try {
            console.log('click')
            const address = await sdk.getUserWalletAddress()
            console.log(address)
            // const res1 = await sdk.approveToken(usdc.address, parseUnits("500000000000", 6).toString(), bot.address)
            // console.log("res1", res1)
            //
            // while (true) {
            //     const waitRes = await sdk.getTransactionDetails(res1.queueID);
            //     console.log("waitRes", waitRes)
            //
            //     if (waitRes.status === "MINED") {
            //         break;
            //     }
            // }

            const res2 = await sdk.sendCustomTx(
                bot.address, "startTrip(string _tripId, uint256 _startTime, uint256 _value, address bitkubNext_)", [
                randomBytes(32).toString('hex'), // _tripId:
                Math.floor(Date.now() / 1000).toString(), // _startTime:
                parseUnits("5", 6).toString(), // _value: 5 USDC
                // address
                // "0xYourBitkubNextAddress" // bitkubNext_:
            ])
            console.log("res2", res2)
            router.push('/insurance/detail')
        } catch (error) {
            console.log(error)
        } finally {
            setStage(0)
        }
    }
    return <>
        {stage < 0 ? <Button className="w-full mt-8" onClick={handlePay}> Pay</Button> :
            <Uploading stage={stage} />}
    </>
}

function Uploading({ stage }: { stage: number }) {

    return <div className="mt-4 space-y-4">
        <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <div className="flex items-center gap-2">

                {
                    stage < 1 ? <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                        <span className="text-sm text-gray-600">Uploading current location to Nillion...</span>
                    </>
                        :
                        <>
                            <CircleCheck className="text-green-600 text-xs" />
                            <span className="text-sm text-gray-600">Uploaded current location to Nillion</span>
                        </>
                }
            </div>
            <div className="flex items-center gap-2">
                {
                    stage < 2 ? <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                        <span className="text-sm text-gray-600 transition-opacity delay-2000 duration-500">Uploading destination location to Nillion...</span>
                    </>
                        :
                        <>
                            <CircleCheck className="text-green-600 text-xs" />
                            <span className="text-sm text-gray-600">Uploaded destination location to Nillion</span>
                        </>
                }
            </div>
        </div>
    </div>
}
