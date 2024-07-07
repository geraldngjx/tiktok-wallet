"use client";

import { getNetworkUrl } from "@/lib/network";
import { OAuthExtension } from "@magic-ext/oauth";
import { SolanaExtension } from "@magic-ext/solana";
import { Connection } from "@solana/web3.js";
import { Magic as MagicBase } from "magic-sdk";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

export type Magic = MagicBase<OAuthExtension[] & SolanaExtension[]>;

type MagicContextType = {
    magic: Magic | null;
    connection: Connection | null;
};

const MagicContext = createContext<MagicContextType>({
    magic: null,
    connection: null,
});

export const useMagic = () => useContext(MagicContext);

const MagicProvider = ({ children }: { children: ReactNode }) => {
    const [magic, setMagic] = useState<Magic | null>(null);
    const [connection, setConnection] = useState<Connection | null>(null);

    // const { publicAddress, setPublicAddress, setEmail } = useMagicTokenStore();

    // const supabase = useContext(SupabaseBrowserContext);

    // const saveToSupabase = useCallback(
    //     async ({ email, publicAddress }: { email: string; publicAddress: string }) => {
    //         try {
    //             const { data: user } = await supabase.from("users").select("*").eq("email", email).single();
    //             if (user) {
    //                 // user already exists
    //                 return;
    //             } else {
    //                 const res = await supabase.from("users").insert([{ email, publicAddress }]).select();
    //             }
    //         } catch (e) {
    //             console.log("error in saving to supabase: " + e);
    //         }
    //     },
    //     [supabase]
    // );

    // useEffect(() => {
    //     const checkLoginandGetBalance = async () => {
    //         const isLoggedIn = await magic?.user.isLoggedIn();
    //         if (isLoggedIn) {
    //             try {
    //                 const metadata = await magic?.user.getInfo();
    //                 if (metadata) {
    //                     localStorage.setItem("user", metadata?.publicAddress!);
    //                     setPublicAddress(metadata?.publicAddress!);

    //                     if (metadata.email) {
    //                         setEmail(metadata.email);
    //                         await saveToSupabase({ email: metadata.email, publicAddress: metadata.publicAddress! });
    //                     }
    //                 }
    //             } catch (e) {
    //                 console.log("error in fetching address: " + e);
    //             }
    //         }
    //     };
    //     // setTimeout(() => checkLoginandGetBalance(), 5000);
    //     checkLoginandGetBalance();
    // }, [magic?.user, saveToSupabase, setEmail, setPublicAddress]);

    // const {
    //     data: usdcBalance,
    //     isFetching: isFetchingUSDCBalance,
    //     refetch: refetchUSDCBalance,
    // } = useQuery({
    //     ...useUSDCTokenBalanceQuery({ publicAddress }),
    //     enabled: !!connection && !!publicAddress,
    //     placeholderData: keepPreviousData,
    // });

    // const {
    //     data: eurcBalance,
    //     isFetching: isFetchingEURCBalance,
    //     refetch: refetchEURCBalance,
    // } = useQuery({
    //     ...useEURCTokenBalanceQuery({ publicAddress }),
    //     enabled: !!connection && !!publicAddress,
    //     placeholderData: keepPreviousData,
    // });

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
            const magic = new MagicBase(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
                extensions: [
                    new OAuthExtension(),
                    new SolanaExtension({
                        rpcUrl: getNetworkUrl(),
                    }),
                ],
            });
            const connection = new Connection(getNetworkUrl());
            setMagic(magic);
            setConnection(connection);
        }
    }, []);

    const value = useMemo(() => {
        return {
            magic,
            connection,
        };
    }, [magic, connection]);

    return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>;
};

export default MagicProvider;
