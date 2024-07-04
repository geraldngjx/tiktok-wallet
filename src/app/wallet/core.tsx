"use client";

import Meteors from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { useMagic } from "@/providers/MagicProvider";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Disc3Icon, MoveDownLeftIcon, MoveUpRightIcon, ScanLineIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import More from "./more";

export default function Core({ isRefreshing, setIsRefreshing }: { isRefreshing: boolean; setIsRefreshing: Dispatch<SetStateAction<boolean>> }) {
    const { balance, setBalance, publicAddress, setPublicAddress } = useMagicTokenStore();

    const { magic, connection } = useMagic();

    const supabase = useContext(SupabaseBrowserContext);

    const saveToSupabase = useCallback(
        async ({ email, publicAddress }: { email: string; publicAddress: string }) => {
            try {
                const { data: user } = await supabase.from("user").select("*").eq("email", email).single();
                if (user) {
                    // user already exists
                    return;
                } else {
                    const res = await supabase.from("user").insert([{ email, publicAddress }]).select();
                    console.log("SUPABASE: ", res);
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
                        setPublicAddress(metadata?.publicAddress!);

                        if (metadata.email) {
                            await saveToSupabase({ email: metadata.email, publicAddress: metadata.publicAddress! });
                        }
                    }
                } catch (e) {
                    console.log("error in fetching address: " + e);
                }
            }
        };
        setTimeout(() => checkLoginandGetBalance(), 5000);
    }, [magic?.user, saveToSupabase, setPublicAddress]);

    const getBalance = useCallback(async () => {
        if (publicAddress && connection) {
            const balance = await connection.getBalance(new PublicKey(publicAddress));
            if (balance == 0) {
                setBalance("0");
            } else {
                setBalance((balance / LAMPORTS_PER_SOL).toString());
            }
            console.log("BALANCE: ", balance);
        }
    }, [connection, publicAddress, setBalance]);

    const refresh = useCallback(async () => {
        await getBalance();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
    }, [getBalance, setIsRefreshing]);

    useEffect(() => {
        if (isRefreshing) {
            refresh();
        }
    }, [getBalance, isRefreshing, refresh, setIsRefreshing]);

    useEffect(() => {
        if (connection) {
            refresh();
        }
    }, [connection, refresh]);

    useEffect(() => {
        setBalance("...");
    }, [magic, setBalance]);

    return (
        <section className="h-fit flex flex-col p-4 mb-4">
            {/* <Ripple /> */}

            <Meteors />

            <div className="z-50">
                {/* <div className="w-full flex justify-end space-x-3">
                    <Button size="icon" className="rounded-full size-10" onClick={refresh}>
                        <RefreshCwIcon size={20} className={isRefreshing ? "animate-spin" : "animate-none"} />
                    </Button>

                    <Button size="icon" className="rounded-full size-10 ">
                        <BellIcon size={20} />
                    </Button>
                </div> */}

                <div className="text-white w-full flex flex-col h-full justify-center items-center px-4 space-y-8">
                    <div className="flex flex-col space-y-2 justify-center items-center">
                        <h1>Your balance</h1>

                        <span className="text-5xl font-semibold flex items-center">
                            {isRefreshing ? <Disc3Icon className="animate-spin mr-2" size={40} /> : balance} SOL
                        </span>
                    </div>

                    <div className="flex items-center justify-center space-x-6 w-full">
                        <div className="flex flex-col space-y-1 justify-center items-center">
                            <Button size="icon" className="rounded-full size-12">
                                <ScanLineIcon size={22} />
                            </Button>
                            <span className="text-sm">Scan</span>
                        </div>

                        <Link href="/wallet/transfer" className="flex flex-col space-y-1 justify-center items-center">
                            <Button size="icon" className="rounded-full size-12">
                                <MoveUpRightIcon size={22} />
                            </Button>
                            <span className="text-sm">Send</span>
                        </Link>

                        <Link href="/wallet/topup" className="flex flex-col space-y-1 justify-center items-center">
                            <Button size="icon" className="rounded-full size-12">
                                <MoveDownLeftIcon size={22} />
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
