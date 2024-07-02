"use client";
import { Button, Card } from "@mui/material";
import Balance from "@/components/wallet/balance";
import TransactionList from "@/components/wallet/transactionList";
import { AccountCircle, QrCodeScanner, Send } from "@mui/icons-material";
import { signout } from "@/lib/auth";
import withAuth from "@/lib/hoc/withAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import WalletHome from "./wallet-dashboard";
import Login from "./login/login";

export default function Wallet() {
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token") ?? "");
    }, [setToken]);

    return (
        <div className="h-full flex w-full items-center justify-center overflow-hidden" vaul-drawer-wrapper="">
            {process.env.NEXT_PUBLIC_MAGIC_API_KEY ? (
                token.length > 0 ? (
                    <WalletHome token={token} setToken={setToken} />
                ) : (
                    <Login token={token} setToken={setToken} />
                )
            ) : (
                <div>Missing Magic API Key</div>
            )}
        </div>
    );
}

// export default withAuth(WalletHome);
