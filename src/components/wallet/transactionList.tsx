"use client";
import { useTransactionsQuery } from "@/app/hooks/useTransactionsQuery";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { SolanaContext } from "@/providers/SolanaProvider";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Disc3Icon } from "lucide-react";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import TransactionEntry from "./transactionEntry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEURCTokenBalanceQuery, useUSDCTokenBalanceQuery } from "@/app/hooks/useTokenBalanceQuery";
import Image from "next/image";

export default function TransactionList({
    isRefreshing,
    setIsRefreshing,
}: {
    isRefreshing: boolean;
    setIsRefreshing: Dispatch<SetStateAction<boolean>>;
}) {
    const { connection } = useContext(SolanaContext);
    const { publicAddress, balance } = useMagicTokenStore();

    const {
        data: txs,
        isFetching,
        refetch,
    } = useQuery({
        ...useTransactionsQuery({ publicAddress }),
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
        if (isRefreshing) {
            refetch();
            refetchUSDCBalance();
            refetchEURCBalance();
            setIsRefreshing(false);
        }
    }, [isRefreshing, refetch, refetchEURCBalance, refetchUSDCBalance, setIsRefreshing]);

    return (
        <section className="flex flex-col w-full px-4 pt-12 relative h-full">
            <Tabs defaultValue="transactionsHistory" className="overflow-y-hidden">
                <TabsList className="bg-gray-900 z-50 h-10 absolute left-4 right-4 top-2">
                    <TabsTrigger
                        className="w-full bg-transparent data-[state=active]:bg-gray-950 data-[state=active]:text-white"
                        value="transactionsHistory"
                    >
                        Transaction History
                    </TabsTrigger>
                    <TabsTrigger className="w-full bg-transparent data-[state=active]:bg-gray-950 data-[state=active]:text-white" value="assets">
                        My Assets
                    </TabsTrigger>
                </TabsList>
                <DotPattern
                    cx={1}
                    cy={1}
                    cr={1}
                    className={cn("[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] bg-transparent z-0")}
                />
                <TabsContent value="transactionsHistory" className="h-full w-full text-white overflow-y-auto">
                    {isRefreshing || isFetching ? (
                        <div className="w-full mt-[50%] flex justify-center items-center overflow-hidden">
                            <Disc3Icon className="animate-spin" size={32} />
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-1 w-full h-full mb-12">
                            {txs && txs.map((tx, index) => <TransactionEntry tx={tx} key={index} />)}
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="assets" className="h-full w-full text-white overflow-y-hidden">
                    {isRefreshing || isFetching || isFetchingEURCBalance || isFetchingUSDCBalance ? (
                        <div className="w-full mt-[50%] flex justify-center items-center overflow-hidden">
                            <Disc3Icon className="animate-spin" size={32} />
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-1 w-full font-semibold text-md">
                            {balance && (
                                <div className="p-4 bg-neutral-900/80 rounded-md text-white flex justify-between w-full items-center overflow-hidden h-20">
                                    <div className="flex h-[80%] w-fit items-center space-x-2">
                                        <div className="bg-black h-full aspect-square flex rounded-full items-center justify-center">
                                            <Image src="/solana.svg" width={20} height={20} alt="Solana" />
                                        </div>

                                        <span>Solana</span>
                                    </div>

                                    {<span>{balance} SOL</span>}
                                </div>
                            )}

                            {usdcBalance && (
                                <div className="p-4 bg-neutral-900/80 rounded-md text-white flex justify-between w-full items-center overflow-hidden h-20">
                                    <div className="flex h-[80%] w-fit items-center space-x-2">
                                        <svg
                                            className="h-full aspect-square"
                                            viewBox="0 0 30 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            data-testid="icon-usdc"
                                            focusable="false"
                                            role="img"
                                        >
                                            <path
                                                d="M15 30c8.313 0 15-6.688 15-15 0-8.313-6.688-15-15-15C6.687 0 0 6.687 0 15c0 8.313 6.687 15 15 15Z"
                                                fill="#2775CA"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clip-rule="evenodd"
                                                d="M6.3 11.624c-1.812 4.812.688 10.25 5.563 12 .188.125.375.375.375.562v.875c0 .125 0 .188-.062.25-.063.25-.313.375-.563.25a11.244 11.244 0 0 1-7.312-7.312C2.426 12.31 5.676 5.999 11.613 4.124c.063-.063.188-.063.25-.063.25.063.375.25.375.5v.875c0 .313-.125.5-.375.625C9.301 7 7.238 9 6.301 11.624zm11.626-7.25c.062-.25.312-.375.562-.25a11.335 11.335 0 0 1 7.313 7.375c1.875 5.937-1.375 12.25-7.313 14.125-.062.062-.187.062-.25.062-.25-.062-.375-.25-.375-.5v-.875c0-.312.125-.5.375-.625 2.563-.937 4.625-2.937 5.563-5.562 1.812-4.813-.688-10.25-5.563-12-.187-.125-.375-.375-.375-.625v-.875c0-.125 0-.188.063-.25z"
                                                fill="#fff"
                                            ></path>
                                            <path
                                                d="M19.294 16.985c0-2.187-1.312-2.937-3.937-3.25-1.875-.25-2.25-.75-2.25-1.625s.625-1.437 1.875-1.437c1.125 0 1.75.375 2.062 1.312a.47.47 0 0 0 .438.313h1c.25 0 .437-.188.437-.438v-.062a3.122 3.122 0 0 0-2.812-2.563v-1.5c0-.25-.188-.437-.5-.5h-.938c-.25 0-.437.188-.5.5v1.438c-1.875.25-3.062 1.5-3.062 3.062 0 2.063 1.25 2.875 3.875 3.188 1.75.312 2.312.687 2.312 1.687s-.875 1.688-2.062 1.688c-1.625 0-2.188-.688-2.375-1.625-.063-.25-.25-.375-.438-.375h-1.062a.427.427 0 0 0-.438.437v.063c.25 1.562 1.25 2.687 3.313 3v1.5c0 .25.187.437.5.5h.937c.25 0 .438-.188.5-.5v-1.5c1.875-.313 3.125-1.625 3.125-3.313z"
                                                fill="#fff"
                                            ></path>
                                        </svg>
                                        <span>USDC</span>
                                    </div>

                                    {<span>${usdcBalance}</span>}
                                </div>
                            )}

                            {eurcBalance && (
                                <div className="p-4 bg-neutral-900/80 rounded-md text-white flex justify-between w-full items-center overflow-hidden h-20">
                                    <div className="flex h-[80%] w-fit items-center space-x-2">
                                        <svg
                                            className="h-full aspect-square"
                                            viewBox="0 0 224 224"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            data-testid="icon-eurc"
                                            focusable="false"
                                            role="img"
                                        >
                                            <g clipPath="url(#clip0_1176_2535)">
                                                <path
                                                    fillRule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M111.788 0c61.739 0 111.788 50.05 111.788 111.788 0 61.739-50.049 111.788-111.788 111.788S0 173.527 0 111.788 50.05 0 111.788 0Z"
                                                    fill="#2775CA"
                                                ></path>
                                                <path
                                                    fillRule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M137.331 33.074c-2.521-.806-4.582.69-4.582 3.337v6.509c0 1.774 1.337 3.794 3.003 4.404 26.757 9.8 45.904 35.519 45.904 65.629 0 30.11-19.147 55.827-45.904 65.628-1.827.669-3.003 2.459-3.003 4.405v6.508c0 2.647 2.061 4.143 4.582 3.338 33.813-10.804 58.298-42.482 58.298-79.879 0-37.397-24.485-69.076-58.298-79.88ZM90.828 36.411c0-2.647-2.061-4.143-4.582-3.337-33.814 10.803-58.299 42.481-58.299 79.879s24.485 69.075 58.299 79.879c2.52.805 4.582-.691 4.582-3.338v-6.508c0-1.775-1.338-3.795-3.004-4.405-26.756-9.801-45.904-35.519-45.904-65.628 0-30.11 19.148-55.828 45.904-65.629 1.666-.61 3.004-2.63 3.004-4.404V36.41Z"
                                                    fill="#fff"
                                                ></path>
                                                <path
                                                    d="m140.376 134.769-6.395-2.857a2.873 2.873 0 0 0-3.75 1.343c-3.018 6.125-8.034 10.029-14.661 10.029-5.999 0-10.811-2.938-14.499-8.875-1.442-2.297-2.587-4.861-3.46-7.67h17.173a2.886 2.886 0 0 0 2.575-1.585l4.097-5.53c.969-1.919-.425-4.185-2.574-4.185H95.679a64.488 64.488 0 0 1-.107-3.653 56.656 56.656 0 0 1 .086-3.649h19.126a2.885 2.885 0 0 0 2.575-1.584l4.097-5.53c.969-1.919-.425-4.185-2.574-4.185H97.591c3.114-10.153 9.615-16.805 17.979-16.674 6.374 0 11.322 3.49 14.496 9.204.711 1.281 2.312 1.772 3.652 1.18l6.428-2.837c1.538-.68 2.192-2.54 1.378-4.01-5.934-10.716-14.585-16.099-25.954-16.099-10.374 0-18.686 4.125-24.998 12.312-3.69 4.822-6.257 10.48-7.781 16.924h-9.338a2.884 2.884 0 0 0-2.575 1.584l-4.097 5.53c-.97 1.919.425 4.185 2.575 4.185h11.892a75.655 75.655 0 0 0-.113 3.649 65.511 65.511 0 0 0 .067 3.653h-7.749a2.885 2.885 0 0 0-2.575 1.584l-4.097 5.53c-.97 1.919.425 4.186 2.575 4.186h13.407c4.24 17.526 16.448 29.478 32.807 29.231 11.615 0 20.369-5.774 26.213-17.271.744-1.464.092-3.26-1.407-3.93Z"
                                                    fill="#fff"
                                                ></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1176_2535">
                                                    <path fill="#fff" d="M0 0h223.576v223.576H0z"></path>
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span>EURC</span>
                                    </div>
                                    {<span>€{eurcBalance}</span>}
                                </div>
                            )}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </section>
    );
}
