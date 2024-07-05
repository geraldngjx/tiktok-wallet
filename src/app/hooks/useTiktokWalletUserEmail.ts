import { SolanaContext } from "@/providers/SolanaProvider";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { AccountLayout } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { useContext } from "react";

export function useTiktokWalletUserEmail({ publicAddress }: { publicAddress: string }) {
    const supabase = useContext(SupabaseBrowserContext);
    const { connection } = useContext(SolanaContext);

    return {
        queryKey: ["getTiktokWalletUserEmail", publicAddress],
        queryFn: async () => {
            const res = await supabase.from("users").select("email").eq("publicAddress", publicAddress).maybeSingle();

            const email: string | undefined = res.data?.email;

            if (email) {
                return email;
            }

            // If the user's email is not found in the database, try to get it from the token account owner
            try {
                const accountInfo = await connection!.getAccountInfo(new PublicKey(publicAddress));

                if (accountInfo === null) {
                    throw new Error("Token account not found");
                }

                const data = Buffer.from(accountInfo.data);

                const accountData = AccountLayout.decode(data);

                const ownerPubkey = new PublicKey(accountData.owner).toBase58();

                const res = await supabase.from("users").select("email").eq("publicAddress", ownerPubkey).maybeSingle();

                const email: string | undefined = res.data?.email;

                if (email) {
                    return email;
                }

                return null;
            } catch (error) {
                return null;
            }
        },
    };
}
