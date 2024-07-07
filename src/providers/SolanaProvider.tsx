"use client";

import { Network, getNetworkUrl } from "@/lib/network";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { ReactNode, createContext, useMemo } from "react";

export const SolanaContext = createContext<{ connection: Connection | null }>({
    connection: null,
});

export default function SolanaProvider({ children }: { children: ReactNode }) {
    const rpcUrl = getNetworkUrl() || "https://solana-devnet.g.alchemy.com/v2/huCDT74XQJEq2Ed1AF8e1lDisWJulLHV";

    const value = useMemo(() => {
        return new Connection(rpcUrl, "confirmed");
    }, [rpcUrl]);

    return <SolanaContext.Provider value={{ connection: value }}>{children}</SolanaContext.Provider>;
}
