"use client";
import { useTransactionsQuery } from "@/app/hooks/useTransactionsQuery";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { SolanaContext } from "@/providers/SolanaProvider";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { useQuery } from "@tanstack/react-query";
import { Disc3Icon } from "lucide-react";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import TransactionEntry from "./transactionEntry";

export default function TransactionList({
    isRefreshing,
    setIsRefreshing,
}: {
    isRefreshing: boolean;
    setIsRefreshing: Dispatch<SetStateAction<boolean>>;
}) {
    const { connection } = useContext(SolanaContext);
    const { publicAddress } = useMagicTokenStore();

    const {
        data: txs,
        isFetching,
        refetch,
    } = useQuery({
        ...useTransactionsQuery({ publicAddress }),
        enabled: !!connection && !!publicAddress,
    });

    useEffect(() => {
        if (isRefreshing) {
            refetch();
            setIsRefreshing(false);
        }
    }, [isRefreshing, refetch, setIsRefreshing]);

    return (
        <section className="flex flex-col w-full p-4 relative h-[65%]">
            <DotPattern cx={1} cy={1} cr={1} className={cn("[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] bg-transparent")} />

            <div className="w-full text-white overflow-y-auto">
                {isRefreshing || isFetching ? (
                    <div className="w-full mt-[50%] flex justify-center items-center overflow-hidden">
                        <Disc3Icon className="animate-spin" size={32} />
                    </div>
                ) : (
                    <div className="flex flex-col space-y-1 w-full">{txs && txs.map((tx, index) => <TransactionEntry tx={tx} key={index} />)}</div>
                )}
            </div>
        </section>
    );
}
