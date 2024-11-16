import { Token } from "@/types";
import { erc20Abi } from "viem";

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "11155111")

const addressConfig = {
    11155111: {
        usdc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    },
    25425: {
        usdc: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    },
    10: {
        usdc: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    },

}
const addresses = addressConfig[CHAIN_ID as keyof typeof addressConfig] || addressConfig[11155111];

export const usdc = {
    address: addresses.usdc as `0x${string}`,
    abi: erc20Abi,
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
