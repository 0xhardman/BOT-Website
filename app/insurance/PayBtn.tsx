import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { parseUnits } from "viem";
import { useWriteContract } from "wagmi";
import { usdc } from "@/abi";
import { sdk } from "@/lib/bitkubchain-sdk";

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
        try {
            const res = await sdk.transfer20("0xCC968F87F7b7Cd5e3493cF87A7A6D2CaCC4E3d50", "0xCC968F87F7b7Cd5e3493cF87A7A6D2CaCC4E3d50", parseUnits("20", 6))
        } catch (error) {
            console.log(error)
        }
    }
    return <Button className="w-full mt-8" onClick={handlePay}> Pay</Button>
}