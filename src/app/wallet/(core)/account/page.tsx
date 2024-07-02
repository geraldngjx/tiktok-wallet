"use client";

import { useCallback, useState } from "react";

import { getNetworkName } from "@/lib/network";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { withAuthMagic } from "@/lib/hoc/withAuth";

function Page() {
    const [copied, setCopied] = useState("Copy");

    const { publicAddress } = useMagicTokenStore();

    const copy = useCallback(() => {
        if (publicAddress && copied === "Copy") {
            setCopied("Copied!");
            navigator.clipboard.writeText(publicAddress);
            setTimeout(() => {
                setCopied("Copy");
            }, 1000);
        }
    }, [copied, publicAddress]);

    return (
        <div className="flex flex-col space-y-4">
            <Image src="/solana.png" alt="Solana Logo" width={3840} height={2160} />

            <div className="flex w-full flex-col space-y-8 px-4">
                <div className="flex flex-col w-full space-y-1">
                    <span className="font-semibold">Network status</span>

                    <div className="flex items-center space-x-4">
                        <span>Connected to {getNetworkName()}</span>
                        <div className="bg-green-400 size-2 rounded-full animate-ping" />
                    </div>
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold">Solana address</span>
                        {copied === "Copied!" ? (
                            copied
                        ) : (
                            <Button size="icon" className="size-4" onClick={copy}>
                                <CopyIcon size={14} />
                            </Button>
                        )}
                    </div>
                    <span className="w-full break-all">{publicAddress?.length == 0 ? <CircularProgress /> : publicAddress}</span>
                </div>
            </div>
        </div>
    );
}

export default withAuthMagic(Page);
