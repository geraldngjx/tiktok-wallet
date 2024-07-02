"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { ReactNode, createContext } from "react";

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const SupabaseBrowserContext = createContext<SupabaseClient>(supabase);

export default function SupabaseBrowserProvider({ children }: { children: ReactNode }) {
    return <SupabaseBrowserContext.Provider value={supabase}>{children}</SupabaseBrowserContext.Provider>;
}
