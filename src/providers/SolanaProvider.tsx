"use client";

import { Network, getNetworkUrl } from "@/lib/network";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { ReactNode, createContext } from "react";

export const SolanaContext = createContext<{ connection: Connection | null }>({
    connection: null,
});

export default function SolanaProvider({ children }: { children: ReactNode }) {
    const rpcUrl = getNetworkUrl() || "https://solana-devnet.g.alchemy.com/v2/huCDT74XQJEq2Ed1AF8e1lDisWJulLHV";
    const connection = new Connection(rpcUrl, "confirmed");
    return <SolanaContext.Provider value={{ connection }}>{children}</SolanaContext.Provider>;
}
