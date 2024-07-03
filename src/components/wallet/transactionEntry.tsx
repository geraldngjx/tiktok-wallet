import { useMagicTokenStore } from "@/store/magicTokenStore";
import { getTxBalance } from "@/utils/getTxBalance";
import { LAMPORTS_PER_SOL, ParsedTransactionWithMeta } from "@solana/web3.js";
import { MoveDownLeftIcon, MoveUpRightIcon } from "lucide-react";

export default function TransactionEntry({ tx }: { tx: (ParsedTransactionWithMeta & { signature: string }) | null }) {
    const { publicAddress } = useMagicTokenStore();

    const fromAddress = tx?.transaction?.message.accountKeys[0].pubkey.toBase58();
    const toAddress = tx?.transaction?.message.accountKeys[1].pubkey.toBase58();
    const solanaAmount = (tx?.meta!.postBalances[1]! - tx?.meta!.preBalances[1]!) / LAMPORTS_PER_SOL;

    const usdcAmount = getTxBalance({ stableCoin: "usdc", tx: tx!, publicAddress: publicAddress! });
    const eurcAmount = getTxBalance({ stableCoin: "eurc", tx: tx!, publicAddress: publicAddress! });

    let amount = "";

    if (solanaAmount > 0) {
        amount = `${solanaAmount.toFixed(1)} SOL`;
    } else if (usdcAmount > 0) {
        amount = `${usdcAmount.toFixed(1)} USDC`;
    } else if (eurcAmount > 0) {
        amount = `${eurcAmount.toFixed(1)} EURC`;
    }

    return (
        <div className="p-4 bg-neutral-500/20 rounded-md text-white flex justify-between w-full items-center overflow-hidden">
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
        </div>
    );
}
