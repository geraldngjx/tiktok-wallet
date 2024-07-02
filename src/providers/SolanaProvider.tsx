"use client";

import { Connection, clusterApiUrl } from "@solana/web3.js";
import { ReactNode, createContext } from "react";

export const SolanaContext = createContext<{ connection: Connection | null }>({
    connection: null,
});

export default function SolanaProvider({ children }: { children: ReactNode }) {
    const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
    return <SolanaContext.Provider value={{ connection }}>{children}</SolanaContext.Provider>;
}
