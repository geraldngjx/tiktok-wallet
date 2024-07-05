"use client";

import { useTiktokWalletUserEmail } from "@/app/hooks/useTiktokWalletUserEmail";
import { useTransactionQuery, useTransactionStatusQuery } from "@/app/hooks/useTransactionsQuery";
import ShineBorder from "@/components/magicui/shine-border";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getNetworkName } from "@/lib/network";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { getIconByCurrency } from "@/utils/currencyIcon";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon, Disc3Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Page({ params }: { params: { signature: string } }) {
    const { publicAddress } = useMagicTokenStore();

    const searchParams = useSearchParams();
    const amount = searchParams.get("amount")!;
    const currency = amount.split(" ")[1];

    const { data: tx, isPending: isPendingTx } = useQuery({ ...useTransactionQuery({ signature: params.signature }) });

    const fromAddress = tx?.transaction?.message.accountKeys[0]?.pubkey.toBase58();
    const toAddress = tx?.transaction?.message.accountKeys[1]?.pubkey.toBase58();

    const { data: email, isPending: isPendingEmail } = useQuery({
        ...useTiktokWalletUserEmail({ publicAddress: publicAddress === fromAddress ? toAddress! : fromAddress! }),
    });

    console.log(tx);

    const { data: statusData, isPending: isPendingStatus } = useQuery({ ...useTransactionStatusQuery({ signature: params.signature }) });
    const { confirmationStatus: status } = statusData?.value || {};

    if (!fromAddress || !toAddress) return null;

    return (
        <div className="flex flex-col justify-center items-center w-full h-full px-4">
            {isPendingTx || isPendingStatus || isPendingEmail ? (
                <Disc3Icon className="animate-spin w-10 h-10 text-white" />
            ) : (
                <>
                    <div className="flex flex-col h-full w-full items-center space-y-10">
                        <div className="flex h-full flex-col justify-center items-center">
                            {currency !== "SOL" ? (
                                getIconByCurrency(currency)
                            ) : (
                                <div className="bg-gray-900 scale-90 h-full aspect-square flex rounded-full items-center justify-center">
                                    <Image src="/solana.svg" width={60} height={60} alt="Solana" />
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

                                <div className="flex w-full justify-end h-full items-center space-x-2 truncate">
                                    {email && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Badge className="rounded-full size-4 p-0 flex items-center justify-center bg-[#ff0050] mt-1">
                                                        <svg
                                                            className="h-full aspect-auto"
                                                            fill="#000000"
                                                            width="12px"
                                                            height="12px"
                                                            viewBox="0 0 512 512"
                                                            id="icons"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
                                                        </svg>
                                                    </Badge>
                                                </TooltipTrigger>
                                                <TooltipContent className="flex items-center space-x-2 justify-center w-fit h-fit">
                                                    <CheckCircle2Icon size={16} className="text-green-400" />
                                                    <p className="mt-[2px]">TikTok Wallet user</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}

                                    <p className="text-white text-ellipsis truncate">
                                        {email ?? (publicAddress === fromAddress ? toAddress : fromAddress)}
                                    </p>
                                </div>
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
                            <Link target="_blank" href={`https://solscan.io/tx/${params.signature}?cluster=devnet`}>
                                <Button className="rounded-full z-50 w-full">View on Block Explorer</Button>
                            </Link>
                        </ShineBorder>
                    </div>
                </>
            )}
        </div>
    );
}
