"use client";

import { Separator } from "@/components/ui/separator";
import TransactionList from "@/components/wallet/transactionList";
import { withAuthMagic } from "@/lib/hoc/withAuth";
import Core from "./core";
import { Button } from "@/components/ui/button";
import { BellIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";

function WalletDashboard() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    return (
        <div className="flex flex-col h-full w-full bg-[#010101]">
            <div className="w-full flex justify-end space-x-3 p-4">
                <Button
                    size="icon"
                    className="rounded-full size-10"
                    onClick={() => {
                        setIsRefreshing(true);
                    }}
                >
                    <RefreshCwIcon size={20} className={isRefreshing ? "animate-spin" : "animate-none"} />
                </Button>

                <Button size="icon" className="rounded-full size-10 ">
                    <BellIcon size={20} />
                </Button>
            </div>

            <Core isRefreshing={isRefreshing} setIsRefreshing={setIsRefreshing} />

            <Separator className="bg-neutral-500" />

            <TransactionList isRefreshing={isRefreshing} setIsRefreshing={setIsRefreshing} />
        </div>
    );
}

export default withAuthMagic(WalletDashboard);
