import { Token } from "@/types";
import { erc20Abi } from "viem";
import { BOTPlatformABI } from "./BOTPlatform";

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "25925")

const addressConfig = {
    11155111: {
        usdc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        bot: "0x0000000000000000000000000000000000000000",
    },
    25925: {
        usdc: "0x34084dAc1976BA7030d543A4eB998bca1b5538f8",
        bot: "0x55853c384FEa9712F998A8d84B3eF953AB165BDc",
    },

}
const addresses = addressConfig[CHAIN_ID as keyof typeof addressConfig] || addressConfig[25925];
console.log(addresses)

export const usdc = {
    address: addresses.usdc as `0x${string}`,
    abi: erc20Abi,
    chainId: CHAIN_ID
}

export const bot = {
    address: addresses.bot as `0x${string}`,
    abi: BOTPlatformABI,
    chainId: CHAIN_ID
}

export const special_token: { [key: string]: Token } = {
    usdc: {
        address: addresses.usdc as `0x${string}`,
        decimals: 6,
        icon: "/usdc.png",
        symbol: "USDC"
    },

} 
