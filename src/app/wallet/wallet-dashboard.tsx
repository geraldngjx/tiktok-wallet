"use client";

import { Separator } from "@/components/ui/separator";
import TransactionList from "@/components/wallet/transactionList";
import { withAuthMagic } from "@/lib/hoc/withAuth";
import Core from "./core";
import { Button } from "@/components/ui/button";
import { BellIcon, CircleDollarSignIcon, RefreshCwIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEURCTokenBalanceQuery, useSolanaTokenBalanceQuery, useUSDCTokenBalanceQuery } from "../hooks/useTokenBalanceQuery";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { SolanaContext } from "@/providers/SolanaProvider";
import { useAccountBalanceStore } from "@/store/accountBalanceStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

function WalletDashboard() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [balanceToDisplay, setBalanceToDisplay] = useState<"stableCoinsOnly" | "cryptoOnly" | "both">("stableCoinsOnly");
    const [convertToFiat, setConvertToFiat] = useState(false);

    const { publicAddress } = useMagicTokenStore();
    const { setSolanaBalance, setUsdcBalance, setEurcBalance } = useAccountBalanceStore();

    const { connection } = useContext(SolanaContext);

    const {
        data: solanaBalance,
        isFetching,
        refetch,
    } = useQuery({
        ...useSolanaTokenBalanceQuery({ publicAddress }),
        enabled: !!connection && !!publicAddress,
        placeholderData: keepPreviousData,
    });

    const {
        data: usdcBalance,
        isFetching: isFetchingUSDCBalance,
        refetch: refetchUSDCBalance,
    } = useQuery({
        ...useUSDCTokenBalanceQuery({ publicAddress }),
        enabled: !!connection && !!publicAddress,
        placeholderData: keepPreviousData,
    });

    const {
        data: eurcBalance,
        isFetching: isFetchingEURCBalance,
        refetch: refetchEURCBalance,
    } = useQuery({
        ...useEURCTokenBalanceQuery({ publicAddress }),
        enabled: !!connection && !!publicAddress,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (solanaBalance) {
            setSolanaBalance(solanaBalance);
        }
        if (usdcBalance) {
            setUsdcBalance(usdcBalance);
        }
        if (eurcBalance) {
            setEurcBalance(eurcBalance);
        }
    }, [solanaBalance, usdcBalance, eurcBalance, setSolanaBalance, setUsdcBalance, setEurcBalance]);

    return (
        <div className="flex flex-col h-full w-full bg-[#010101]">
            <div className="w-full flex justify-between p-4">
                <div className="flex items-center space-x-2">
                    <Select
                        defaultValue="stableCoinsOnly"
                        onValueChange={(value: "stableCoinsOnly" | "cryptoOnly" | "both") => setBalanceToDisplay(value)}
                    >
                        <SelectTrigger className="w-fit" chevron>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem className="pl-0" value="stableCoinsOnly">
                                    Stable coins only
                                </SelectItem>
                                <SelectItem className="pl-0" value="cryptoOnly">
                                    Crypto only
                                </SelectItem>
                                {/* <SelectItem className="pl-0" value="both">
                                    Both
                                </SelectItem> */}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {balanceToDisplay !== "stableCoinsOnly" && (
                        <Toggle className="bg-[#0f172a] hover:bg-[#0f172a]/90  border border-input" onClick={() => setConvertToFiat(!convertToFiat)}>
                            <CircleDollarSignIcon color="white" size={18} />
                        </Toggle>
                    )}
                </div>

                <div className="space-x-3">
                    <Button
                        size="icon"
                        className="rounded-full size-10 z-50 bg-[#0f172a] hover:bg-[#0f172a]/90"
                        onClick={() => {
                            setIsRefreshing(true);
                        }}
                    >
                        <RefreshCwIcon size={20} color="white" className={isRefreshing ? "animate-spin" : "animate-none"} />
                    </Button>

                    <Button size="icon" className="rounded-full size-10 z-50 bg-[#0f172a] hover:bg-[#0f172a]/90">
                        <BellIcon color="white" size={20} />
                    </Button>
                </div>
            </div>

            <Core isRefreshing={isRefreshing} setIsRefreshing={setIsRefreshing} balanceToDisplay={balanceToDisplay} convertToFiat={convertToFiat} />

            <Separator className="bg-neutral-500" />

            <TransactionList isRefreshing={isRefreshing} setIsRefreshing={setIsRefreshing} />
        </div>
    );
}

export default WalletDashboard;
