import { useMagicTokenStore } from "@/store/magicTokenStore";
import { LAMPORTS_PER_SOL, ParsedTransactionWithMeta } from "@solana/web3.js";
import { MoveDownLeftIcon, MoveUpRightIcon } from "lucide-react";

export default function TransactionEntry({ tx }: { tx: (ParsedTransactionWithMeta & { signature: string }) | null }) {
    const { publicAddress } = useMagicTokenStore();

    const fromAddress = tx?.transaction?.message.accountKeys[0].pubkey.toBase58();
    const toAddress = tx?.transaction?.message.accountKeys[1].pubkey.toBase58();
    const amount = (tx?.meta!.postBalances[1]! - tx?.meta!.preBalances[1]!) / LAMPORTS_PER_SOL;

    return (
        <div className="p-4 bg-neutral-500/20 rounded-md text-white flex justify-between w-full items-center overflow-hidden">
            <div className="flex flex-col max-w-[75%]">
                <div>{new Date(tx?.blockTime! * 1000).toLocaleString()}</div>

                {publicAddress === fromAddress ? (
                    <div className="flex items-center space-x-2">
                        <MoveUpRightIcon size={16} />
                        <span className="text-sm max-w-[90%] overflow-x-hidden text-ellipsis">{toAddress}</span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <MoveDownLeftIcon size={16} />

                        <span className="text-sm max-w-[90%] overflow-x-hidden text-ellipsis">{fromAddress}</span>
                    </div>
                )}
            </div>

            <div className={`flex w-full justify-end ${publicAddress === fromAddress ? "text-red-400" : "text-green-400"}`}>
                {publicAddress === fromAddress ? <span>- {amount} SOL</span> : <span>+ {amount} SOL</span>}
            </div>
        </div>
    );
}
