"use client";

import { ReactNode } from "react";
import MagicProvider from "./MagicProvider";
import SolanaProvider from "./SolanaProvider";
import SupabaseBrowserProvider from "./SupabaseBrowserProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ReactQueryProvider>
            <SupabaseBrowserProvider>
                <MagicProvider>
                    <SolanaProvider>
                        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
                            {children}
                        </ThemeProvider>
                    </SolanaProvider>
                </MagicProvider>
            </SupabaseBrowserProvider>
        </ReactQueryProvider>
    );
}
