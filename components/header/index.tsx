"use client"
// import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useRouter, usePathname } from "next/navigation";


export default function Header() {
    // const router = useRouter();
    // const pathname = usePathname();
    return <div className=" w-full backdrop-blur-sm rounded-b-2xl drop-shadow-sm border-b">
        <div className="flex justify-between py-4 px-2 container mx-auto ">
            <div className="h-10 flex items-center px-4 gap-2">
                <div className="bg-gray-500 rounded-full w-10 h-10"></div>
                <p>BOT</p>
            </div>
            <ConnectButton accountStatus="address" chainStatus="full" showBalance={false} />
        </div>
    </div>
}