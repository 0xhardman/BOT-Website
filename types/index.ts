export interface PlanDetail {
    pId: string;
    owner: string;
    token0: string;
    token1: string;
    recipient: string;
    amountPerTime: string;
    balance: string;
    frequency: number;
    status: string;
    investmentHistory: InvestmentHistory[];
    investmentToken0Amount: string;
    investmentToken1Amount: string;
}

export interface InvestmentHistory {
    txHash: string;
    from: string;
    amountIn: string;
    amountOut: string;
    blockNumber: number;
    blockTimestamp: number;
}

export interface Token {
    icon: string
    symbol: string
    address: `0x${string}`
    decimals: number
}

export interface PriceData { usdt: number, usdc: number, weth: number, wbtc: number }

export interface CycleOption {
    id: number,
    period: string,
    blocks: string,
    duration: number
}