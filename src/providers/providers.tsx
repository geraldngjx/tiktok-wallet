"use client";

import { ReactNode } from "react";
import MagicProvider from "./MagicProvider";
import SolanaProvider from "./SolanaProvider";
import SupabaseBrowserProvider from "./SupabaseBrowserProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { ShopProvider } from "./ShopProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <SupabaseBrowserProvider>
        <MagicProvider>
          <SolanaProvider>
            {/* ShopProvider to manage shop state */}
            <ShopProvider>{children}</ShopProvider>
          </SolanaProvider>
        </MagicProvider>
      </SupabaseBrowserProvider>
    </ReactQueryProvider>
  );
}
