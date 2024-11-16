'use client';
import { usdc } from "@/abi";
import { Button } from "@/components/ui/button";
import { useTaxiTime } from "@/hooks/api/use-taxi-time";
import { useRouter, useSearchParams } from "next/navigation";
import { parseUnits } from "viem";
import { useWriteContract } from "wagmi";

export default function EstData() {
    const router = useRouter();
    const { writeContractAsync } = useWriteContract()
    const searchParams = useSearchParams();
    // http://localhost:3000/insurance?originLongitude=100.5583005&originLatitude=13.7247806&placeId=ChIJ3UPIL_6e4jARVH4S0xM70xw
    const origin = searchParams?.get('origin') ?? '';
    const destination = searchParams?.get('destination') ?? '';
    const { data, isLoading, error } = useTaxiTime({
        origin: origin,
        destination: destination
    })
    if (isLoading) return <div>Loading...</div>
    const handlePay = async () => {
        try {
            await writeContractAsync({
                ...usdc,
                functionName: "transfer",
                args: ['0xCC968F87F7b7Cd5e3493cF87A7A6D2CaCC4E3d50', parseUnits("20", 6)]
            })
            router.push('/insurance/detail')

        } catch (error) {
            console.log(error)
        }
    }
    const {
        distance = 0,
        duration = 0,
        durationInTraffic = 0,
        origin: originName = "",
        destination: destName = ""
    } = data
    return < div className="py-8 px-4" >
        <div className="flex flex-col gap-1">
            <div>Est. time:</div>
            <div className="border p-4 text-center text-4xl font-bold">
                {Math.floor(durationInTraffic / 60 / 60)}:{Math.floor((durationInTraffic / 60) % 60)}:{Math.floor((durationInTraffic % 60) % 60)}
            </div>
            <div className="text-center">Arrive at {(new Date(new Date().getTime() + durationInTraffic * 1000)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
        </div>
        <div className="mt-8" >
            <h4 className="mt-4 text-center text-lg font-bold">Purchase an Insurance</h4>
            <div className="text-center mt-4">
                <span>Arrive latest time: <div className="text-center">{new Date(new Date().getTime() + durationInTraffic * 1100).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</div></span>
                <div>From: {originName}</div>
                <div>To: {destName}</div>
                <div>Distance: {(distance / 1000).toFixed(2)} KM</div>
                <div>Baht: 20</div>
            </div>
        </div>
        <Button className="w-full mt-8" onClick={handlePay}> Pay</Button>
    </div >
}