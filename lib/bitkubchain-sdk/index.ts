import { Network, initializeSDK } from '@bitkub-chain/sdk.js'
export const sdk = initializeSDK(
    "6738559b5f754e001cbcaef5", // Client ID
    "sdk-4c237520-032e-4cc4-b681-a44786380f9a", // Project ID
    process.env.NEXT_PUBLIC_NETWORK === 'testnet' ? Network.BKC_TESTNET : Network.BKC_MAINNET,
);