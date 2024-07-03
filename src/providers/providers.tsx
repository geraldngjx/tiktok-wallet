"use client";

import { ReactNode } from "react";
import MagicProvider from "./MagicProvider";
import SolanaProvider from "./SolanaProvider";
import SupabaseBrowserProvider from "./SupabaseBrowserProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ReactQueryProvider>
            <SupabaseBrowserProvider>
                <MagicProvider>
                    <SolanaProvider>{children}</SolanaProvider>
                </MagicProvider>
            </SupabaseBrowserProvider>
        </ReactQueryProvider>
    );
}
