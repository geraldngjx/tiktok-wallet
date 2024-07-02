"use client";

import { ReactNode } from "react";
import MagicProvider from "./MagicProvider";
import SolanaProvider from "./SolanaProvider";
import SupabaseBrowserProvider from "./SupabaseBrowserProvider";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SupabaseBrowserProvider>
            <MagicProvider>
                <SolanaProvider>{children}</SolanaProvider>
            </MagicProvider>
        </SupabaseBrowserProvider>
    );
}
