import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { useContext } from "react";

export function useTiktokWalletUserEmail({ publicAddress }: { publicAddress: string }) {
    const supabase = useContext(SupabaseBrowserContext);

    return {
        queryKey: ["getTiktokWalletUserEmail", publicAddress],
        queryFn: async () => {
            const res = await supabase.from("users").select("email").eq("publicAddress", publicAddress).maybeSingle();

            const email = res.data?.email;

            return email as string;
        },
    };
}
