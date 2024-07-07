"use client";

import { create } from "zustand";

type State = {
    solanaBalance: string;
    usdcBalance: string;
    eurcBalance: string;

    isLoadingSolanaBalance: boolean;
    isLoadingUsdcBalance: boolean;
    isLoadingEurcBalance: boolean;
};

type Action = {
    setSolanaBalance: (balance: string) => void;
    setUsdcBalance: (balance: string) => void;
    setEurcBalance: (balance: string) => void;

    setIsLoadingSolanaBalance: (isLoading: boolean) => void;
    setIsLoadingUsdcBalance: (isLoading: boolean) => void;
    setIsLoadingEurcBalance: (isLoading: boolean) => void;
};

export const useAccountBalanceStore = create<State & Action>((set, get) => ({
    solanaBalance: "0",
    usdcBalance: "0",
    eurcBalance: "0",
    setSolanaBalance: (balance) => set({ solanaBalance: balance }),
    setUsdcBalance: (balance) => set({ usdcBalance: balance }),
    setEurcBalance: (balance) => set({ eurcBalance: balance }),

    isLoadingSolanaBalance: false,
    isLoadingUsdcBalance: false,
    isLoadingEurcBalance: false,
    setIsLoadingSolanaBalance: (isLoading) => set({ isLoadingSolanaBalance: isLoading }),
    setIsLoadingUsdcBalance: (isLoading) => set({ isLoadingUsdcBalance: isLoading }),
    setIsLoadingEurcBalance: (isLoading) => set({ isLoadingEurcBalance: isLoading }),
}));
