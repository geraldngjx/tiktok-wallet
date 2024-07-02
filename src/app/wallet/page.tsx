"use client";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { useEffect } from "react";
import Login from "./login/login";
import WalletHome from "./wallet-dashboard";

export default function Wallet() {
    const { token, setToken } = useMagicTokenStore();

    useEffect(() => {
        setToken(localStorage.getItem("token") ?? "");
    }, [setToken]);

    return (
        <div className="h-full flex w-full items-center justify-center bg-[#010101] overflow-hidden" vaul-drawer-wrapper="">
            {process.env.NEXT_PUBLIC_MAGIC_API_KEY ? token.length > 0 ? <WalletHome /> : <Login /> : <div>Missing Magic API Key</div>}
        </div>
    );
}
