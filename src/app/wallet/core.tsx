"use client";

import Meteors from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { BellIcon, MoveDownLeftIcon, MoveUpRightIcon, RefreshCwIcon, ScanLineIcon } from "lucide-react";
import Link from "next/link";
import More from "./more";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { useMagic } from "@/providers/MagicProvider";
import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export default function Core() {
    const { token, setToken, publicAddress, setPublicAddress } = useMagicTokenStore();

    const { magic, connection } = useMagic();

    const [balance, setBalance] = useState("...");
    const [copied, setCopied] = useState("Copy");
    const [isRefreshing, setIsRefreshing] = useState(false);

    // const [publicAddress, setPublicAddress] = useState(localStorage.getItem("user"));

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
                    }
                } catch (e) {
                    console.log("error in fetching address: " + e);
                }
            }
        };
        setTimeout(() => checkLoginandGetBalance(), 5000);
    }, [magic?.user, setPublicAddress]);

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
    }, [connection, publicAddress]);

    const refresh = useCallback(async () => {
        setIsRefreshing(true);
        await getBalance();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
    }, [getBalance]);

    useEffect(() => {
        if (connection) {
            refresh();
        }
    }, [connection, refresh]);

    useEffect(() => {
        setBalance("...");
    }, [magic]);

    return (
        <section className="h-[35%] flex flex-col p-4">
            {/* <Ripple /> */}

            <Meteors />

            <div className="z-50">
                <div className="w-full flex justify-end space-x-3">
                    <Button size="icon" className="rounded-full size-10" onClick={refresh}>
                        <RefreshCwIcon size={20} className={isRefreshing ? "animate-spin" : "animate-none"} />
                    </Button>

                    <Button size="icon" className="rounded-full size-10 ">
                        <BellIcon size={20} />
                    </Button>
                </div>

                <div className="text-white w-full flex flex-col h-full justify-center items-center px-4 space-y-8">
                    <div className="flex flex-col space-y-2 justify-center items-center">
                        <h1>Your balance</h1>
                        <span className="text-5xl font-semibold">{balance} SOL</span>
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
