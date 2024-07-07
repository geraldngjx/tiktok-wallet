"use client";

import { ReactNode } from "react";
import MagicProvider from "./MagicProvider";
import SolanaProvider from "./SolanaProvider";
import SupabaseBrowserProvider from "./SupabaseBrowserProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ShopProvider } from "./ShopProvider";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ReactQueryProvider>
            <SupabaseBrowserProvider>
                <SolanaProvider>
                    <MagicProvider>
                        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
                            {/* ShopProvider to manage shop state */}
                            <ShopProvider>{children}</ShopProvider>
                        </ThemeProvider>
                    </MagicProvider>
                </SolanaProvider>
            </SupabaseBrowserProvider>
        </ReactQueryProvider>
    );
}
