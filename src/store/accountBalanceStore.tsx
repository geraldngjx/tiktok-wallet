"use client";

import { create } from "zustand";

type State = {
    solanaBalance: string;
    usdcBalance: string;
    eurcBalance: string;
};

type Action = {
    setSolanaBalance: (balance: string) => void;
    setUsdcBalance: (balance: string) => void;
    setEurcBalance: (balance: string) => void;
};

export const useAccountBalanceStore = create<State & Action>((set, get) => ({
    solanaBalance: "0",
    usdcBalance: "0",
    eurcBalance: "0",
    setSolanaBalance: (balance) => set({ solanaBalance: balance }),
    setUsdcBalance: (balance) => set({ usdcBalance: balance }),
    setEurcBalance: (balance) => set({ eurcBalance: balance }),
}));
