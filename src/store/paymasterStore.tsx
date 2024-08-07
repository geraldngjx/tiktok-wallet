"use client";

import { create } from "zustand";

type State = {
    enabled: boolean;
};

type Action = {
    setEnabled: (enabled: boolean) => void;
};

export const useIsPaymasterEnabledStore = create<State & Action>((set, get) => ({
    enabled: true,
    setEnabled: (enabled) => set({ enabled }),
}));
