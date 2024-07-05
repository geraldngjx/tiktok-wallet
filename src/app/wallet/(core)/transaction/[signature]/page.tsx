"use client";

import { useTransactionQuery, useTransactionStatusQuery } from "@/app/hooks/useTransactionsQuery";
import ShineBorder from "@/components/magicui/shine-border";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getNetworkName } from "@/lib/network";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { getIconByCurrency } from "@/utils/currencyIcon";
import { useQuery } from "@tanstack/react-query";
import { Disc3Icon } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { signature: string } }) {
    const { publicAddress } = useMagicTokenStore();

    const searchParams = useSearchParams();
    const amount = searchParams.get("amount")!;
    const currency = amount.split(" ")[1];

    const { data: tx, isPending: isPendingTx } = useQuery({ ...useTransactionQuery({ signature: params.signature }) });

    const fromAddress = tx?.transaction?.message.accountKeys[0]?.pubkey.toBase58();
    const toAddress = tx?.transaction?.message.accountKeys[1]?.pubkey.toBase58();

    console.log(tx);

    const { data: statusData, isPending: isPendingStatus } = useQuery({ ...useTransactionStatusQuery({ signature: params.signature }) });
    const { confirmationStatus: status } = statusData?.value || {};

    if (!fromAddress || !toAddress) return null;

    return (
        <div className="flex flex-col justify-center items-center w-full h-full px-4">
            {isPendingTx || isPendingStatus ? (
                <Disc3Icon className="animate-spin w-10 h-10 text-white" />
            ) : (
                <>
                    <div className="flex flex-col h-full w-full items-center space-y-10">
                        <div className="flex h-full flex-col justify-center items-center">
                            {currency !== "SOL" ? (
                                getIconByCurrency(currency)
                            ) : (
                                <div className="bg-gray-900 scale-90 h-full aspect-square flex rounded-full items-center justify-center">
                                    <Image src="/solana.svg" width={100} height={100} alt="Solana" />
                                </div>
                            )}

                            <div
                                className={`flex text-4xl font-bold justify-end ${publicAddress === fromAddress ? "text-red-400" : "text-green-400"}`}
                            >
                                {publicAddress === fromAddress ? <span>- {amount}</span> : <span>+ {amount}</span>}
                            </div>
                        </div>

                        <div className="w-full flex flex-col space-y-4 py-4 bg-gray-800 bg-opacity-60 rounded-xl">
                            <div className="w-full flex items-center justify-between px-4">
                                <span className="text-gray-500">Transaction time</span>
                                <span className="text-white">{new Date(tx?.blockTime! * 1000).toLocaleString()}</span>
                            </div>

                            <Separator className="bg-black" />

                            <div className="w-full flex items-center justify-between px-4">
                                <span className="text-gray-500">Status</span>
                                <span
                                    className={`${
                                        status
                                            ? status === "processed"
                                                ? "text-gray-500"
                                                : status === "confirmed"
                                                ? "text-blue-500"
                                                : status === "finalized"
                                                ? "text-green-500"
                                                : "text-white"
                                            : "text-white"
                                    } capitalize`}
                                >
                                    {status}
                                </span>
                            </div>

                            <Separator className="bg-black" />

                            <div className="w-full flex items-center justify-between px-4 space-x-10">
                                <span className="text-gray-500">{publicAddress === fromAddress ? "To" : "From"}</span>
                                <p className="text-white text-ellipsis truncate">{toAddress}</p>
                            </div>

                            <Separator className="bg-black" />

                            <div className="w-full flex items-center justify-between px-4">
                                <span className="text-gray-500">Network</span>
                                <span className="text-white">{getNetworkName()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="justify-end pb-8 flex h-full flex-col w-full">
                        <ShineBorder
                            className="text-center min-w-10 min-h-10 w-full h-12 p-1"
                            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            borderWidth={2}
                            borderRadius={100}
                        >
                            <Button className="rounded-full z-50 w-full">View on Block Explorer</Button>
                        </ShineBorder>
                    </div>
                </>
            )}
        </div>
    );
}
