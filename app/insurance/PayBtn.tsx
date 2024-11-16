import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { parseUnits } from "viem";
import { useWriteContract } from "wagmi";
import { bot, usdc } from "@/abi";
import { sdk } from "@/lib/bitkubchain-sdk";
import { buffer } from "stream/consumers";
import { randomBytes } from "crypto";

const NETWORK = process.env.NEXT_PUBLIC_NETWORK?.startsWith('BKC') ? 'BKC' : 'NORMAL'

export default function PayBtn() {
    const router = useRouter();
    const { writeContractAsync } = useWriteContract()
    const handlePay = NETWORK == "NORMAL" ? async () => {
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
    } : async () => {
        console.log(bot.address)
        try {
            console.log('click')
            const res = await sdk.transferNative("0xCC968F87F7b7Cd5e3493cF87A7A6D2CaCC4E3d50", parseUnits("0.1", 2))
            // const res = await sdk.sendCustomTx(
            //     bot.address,
            //     "function startTrip(string _tripId,uint256 _startTime,uint256 _value,address _bitkubNext)",
            //     ["12a3", new Date().getTime().toString(), '0xCC968F87F7b7Cd5e3493cF87A7A6D2CaCC4E3d50', parseUnits("20", 18).toString()]
            // )
        } catch (error) {
            console.log(error)
        }
    }
    return <Button className="w-full mt-8" onClick={handlePay}> Pay</Button>
}