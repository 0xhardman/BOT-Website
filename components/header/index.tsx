"use client"
// import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { divide } from "lodash";
import BKCConnetBtn from "./BKCConnetBtn";
// import { useRouter, usePathname } from "next/navigation";

const NETWORK = process.env.NEXT_PUBLIC_NETWORK?.startsWith('BKC') ? 'BKC' : 'NORMAL'

export default function Header() {
    // const router = useRouter();
    // const pathname = usePathname();
    return <div className=" w-full backdrop-blur-sm rounded-b-2xl drop-shadow-sm border-b">
        <div className="flex justify-between py-4 px-2 container mx-auto ">
            <div className="h-10 flex items-center px-4 gap-2">
                <div className="border rounded-full w-10 h-10 text-2xl text-center">🚕</div>
                <div className="flex flex-col ">
                    <p>BOT</p>
                    <p className="text-xs">BangkokOnTime</p>
                </div>
            </div>
            {NETWORK == "NORMAL" ? < ConnectButton accountStatus="address" chainStatus="full" showBalance={false} /> :
                <BKCConnetBtn></BKCConnetBtn>
            }
        </div>
    </div>
}