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
            const address = await sdk.getUserWalletAddress()
            console.log(address)
            const res1 = await sdk.approveToken(usdc.address, parseUnits("0.1", 6).toString(), bot.address)
            // const res2 = await sdk.sendCustomTx(bot.address, "startTrip(string,uint256,uint256,address)", [
            //     randomBytes(32).toString('hex'), // _tripId: 随机生成的trip ID
            //     Math.floor(Date.now() / 1000).toString(), // _startTime: 当前时间戳
            //     parseUnits("0.1", 6).toString(), // _value: 0.1 USDC
            //     "0xYourBitkubNextAddress" // bitkubNext_: 需要替换为实际的BitKubNext地址
            // ])
            // console.log(res2)
            router.push('/insurance/detail')
        } catch (error) {
            console.log(error)
        }
    }
    return <Button className="w-full mt-8" onClick={handlePay}> Pay</Button>
}