import { useMagicTokenStore } from "@/store/magicTokenStore";
import { getTxBalance } from "@/utils/getTxBalance";
import { LAMPORTS_PER_SOL, ParsedTransactionWithMeta } from "@solana/web3.js";
import { MoveDownLeftIcon, MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function TransactionEntry({ tx }: { tx: (ParsedTransactionWithMeta & { signature: string }) | null }) {
    const { publicAddress } = useMagicTokenStore();

    const fromAddress = tx?.transaction?.message.accountKeys[0]?.pubkey.toBase58();
    const toAddress = tx?.transaction?.message.accountKeys[1]?.pubkey.toBase58();
    const solanaAmount = (tx?.meta!.postBalances[1]! - tx?.meta!.preBalances[1]!) / LAMPORTS_PER_SOL;

    const usdcAmount = getTxBalance({ stableCoin: "usdc", tx: tx!, publicAddress: publicAddress! });
    const eurcAmount = getTxBalance({ stableCoin: "eurc", tx: tx!, publicAddress: publicAddress! });

    if (!fromAddress || !toAddress) return null;

    // console.table({ "usdcAmount: ": usdcAmount, "eurcAmount: ": eurcAmount, "solanaAmount: ": solanaAmount });

    if (!fromAddress || !toAddress) return null;

    let amount = "";

    // if (solanaAmount > 0) {
    //     amount = `${solanaAmount.toFixed(1)} SOL`;
    // } else if (usdcAmount > 0) {
    //     amount = `${usdcAmount.toFixed(1)} USDC`;
    // } else if (eurcAmount > 0) {
    //     amount = `${eurcAmount.toFixed(1)} EURC`;
    // }

    const largestAmount = Math.max(solanaAmount, Math.abs(usdcAmount), Math.abs(eurcAmount));

    if (largestAmount === 0) return null;

    switch (largestAmount) {
        case solanaAmount:
            amount = `${solanaAmount} SOL`;
            break;
        case Math.abs(usdcAmount):
            amount = `${Math.abs(usdcAmount).toFixed(2)} USDC`;
            break;
        case Math.abs(eurcAmount):
            amount = `${Math.abs(eurcAmount).toFixed(2)} EURC`;
            break;
    }

    return (
        <Link
            href={`/wallet/transaction/${tx?.signature}`}
            className="p-4 bg-neutral-900/80 h-20 rounded-md text-white flex justify-between w-full items-center overflow-hidden"
        >
            <div className="flex flex-col max-w-[70%]">
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
                {publicAddress === fromAddress ? <span>- {amount}</span> : <span>+ {amount}</span>}
            </div>
        </Link>
    );
}
