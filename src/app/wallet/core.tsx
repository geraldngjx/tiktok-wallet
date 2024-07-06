"use client";

import Meteors from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { useMagic } from "@/providers/MagicProvider";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { useAccountBalanceStore } from "@/store/accountBalanceStore";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { useQuery } from "@tanstack/react-query";
import { Disc3Icon, MoveDownLeftIcon, MoveUpRightIcon, ScanLineIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useContext, useEffect } from "react";
import { useSolanaTokenBalanceQuery } from "../hooks/useTokenBalanceQuery";
import More from "./more";

export default function Core({ isRefreshing, setIsRefreshing }: { isRefreshing: boolean; setIsRefreshing: Dispatch<SetStateAction<boolean>> }) {
    const { publicAddress, setPublicAddress, setEmail } = useMagicTokenStore();

    const { magic, connection } = useMagic();

    const supabase = useContext(SupabaseBrowserContext);

    const saveToSupabase = useCallback(
        async ({ email, publicAddress }: { email: string; publicAddress: string }) => {
            try {
                const { data: user } = await supabase.from("users").select("*").eq("email", email).single();
                if (user) {
                    // user already exists
                    return;
                } else {
                    const res = await supabase.from("users").insert([{ email, publicAddress }]).select();
                }
            } catch (e) {
                console.log("error in saving to supabase: " + e);
            }
        },
        [supabase]
    );

    useEffect(() => {
        const checkLoginandGetBalance = async () => {
            const isLoggedIn = await magic?.user.isLoggedIn();
            if (isLoggedIn) {
                try {
                    const metadata = await magic?.user.getInfo();
                    if (metadata) {
                        localStorage.setItem("user", metadata?.publicAddress!);
                        setPublicAddress(metadata?.publicAddress!);

                        if (metadata.email) {
                            setEmail(metadata.email);
                            await saveToSupabase({ email: metadata.email, publicAddress: metadata.publicAddress! });
                        }
                    }
                } catch (e) {
                    console.log("error in fetching address: " + e);
                }
            }
        };
        setTimeout(() => checkLoginandGetBalance(), 5000);
    }, [magic?.user, saveToSupabase, setEmail, setPublicAddress]);

    const { data: solanaBalance, isFetching, refetch } = useQuery({ ...useSolanaTokenBalanceQuery({ publicAddress }) });

    const refresh = useCallback(async () => {
        await refetch();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    }, [refetch, setIsRefreshing]);

    useEffect(() => {
        if (isRefreshing) {
            refresh();
        }
    }, [isRefreshing, refresh, setIsRefreshing]);

    useEffect(() => {
        if (connection) {
            refresh();
        }
    }, [connection, refresh]);

    return (
        <section className="h-fit flex flex-col p-4 mb-4">
            <Meteors />

            <div className="z-50">
                <div className="text-white w-full flex flex-col h-full justify-center items-center px-4 space-y-4">
                    <div className="flex flex-col space-y-3 justify-center items-center">
                        <h1 className="font-medium">Your balance</h1>

                        <span className="text-5xl font-semibold flex items-center text-center min-h-20">
                            {isRefreshing || isFetching ? <Disc3Icon className="animate-spin mr-2" size={40} /> : `${solanaBalance} SOL`}
                        </span>
                    </div>

                    <div className="flex items-center justify-center space-x-6 w-full">
                        <Link href="/wallet/scan" className="flex flex-col space-y-1 justify-center items-center">
                            <Button size="icon" className="rounded-full size-12 bg-[#0f172a] hover:bg-[#0f172a]/90">
                                <ScanLineIcon color="white" size={22} />
                            </Button>
                            <span className="text-sm">Scan</span>
                        </Link>

                        <Link href="/wallet/transfer" className="flex flex-col space-y-1 justify-center items-center">
                            <Button size="icon" className="rounded-full size-12 bg-[#0f172a] hover:bg-[#0f172a]/90">
                                <MoveUpRightIcon color="white" size={22} />
                            </Button>
                            <span className="text-sm">Send</span>
                        </Link>

                        <Link href="/wallet/receive" className="flex flex-col space-y-1 justify-center items-center">
                            <Button size="icon" className="rounded-full size-12 bg-[#0f172a] hover:bg-[#0f172a]/90">
                                <MoveDownLeftIcon color="white" size={22} />
                            </Button>
                            <span className="text-sm">Receive</span>
                        </Link>

                        <More />
                    </div>
                </div>
            </div>
        </section>
    );
}
