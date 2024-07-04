"use client";

import { create } from "zustand";

type State = {
    token: string;
    publicAddress: string;
};

type Action = {
    setToken: (did: State["token"]) => void;
    setPublicAddress: (address: State["publicAddress"]) => void;
};

export const useMagicTokenStore = create<State & Action>((set, get) => ({
    token: "",
    setToken: (token) => set({ token }),
    publicAddress: "",
    setPublicAddress: (publicAddress) => set({ publicAddress }),
}));
