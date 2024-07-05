import { useTiktokWalletUserEmail } from "@/app/hooks/useTiktokWalletUserEmail";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { getTxBalance } from "@/utils/getTxBalance";
import { LAMPORTS_PER_SOL, ParsedTransactionWithMeta } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { MoveDownLeftIcon, MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function TransactionEntry({ tx }: { tx: (ParsedTransactionWithMeta & { signature: string }) | null }) {
    const { publicAddress } = useMagicTokenStore();

    const fromAddress = tx?.transaction?.message.accountKeys[0]?.pubkey.toBase58();
    const toAddress = tx?.transaction?.message.accountKeys[1]?.pubkey.toBase58();

    const { data: email } = useQuery({ ...useTiktokWalletUserEmail({ publicAddress: publicAddress === fromAddress ? toAddress! : fromAddress! }) });

    // console.table(tx);

    const solanaAmount = (tx?.meta!.postBalances[1]! - tx?.meta!.preBalances[1]!) / LAMPORTS_PER_SOL;

    const usdcAmount = getTxBalance({ stableCoin: "usdc", tx: tx!, publicAddress: publicAddress! });
    const eurcAmount = getTxBalance({ stableCoin: "eurc", tx: tx!, publicAddress: publicAddress! });

    if (!fromAddress || !toAddress) return null;

    // console.table({ "usdcAmount: ": usdcAmount, "eurcAmount: ": eurcAmount, "solanaAmount: ": solanaAmount });

    if (!fromAddress || !toAddress) return null;

    let amount = "";

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
            href={`/wallet/transaction/${tx?.signature}?amount=${amount}`}
            className="p-4 bg-neutral-900/80 h-20 rounded-md text-white flex justify-between w-full items-center overflow-hidden"
        >
            <div className="flex flex-col max-w-[70%] space-y-2">
                <div className="w-full flex items-center space-x-4">
                    <div className="w-full flex items-center space-x-2">
                        {publicAddress === fromAddress ? <MoveUpRightIcon size={16} /> : <MoveDownLeftIcon size={16} />}

                        <span>{new Date(tx?.blockTime! * 1000).toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {email && (
                        <Badge className="rounded-full size-4 p-0 flex items-center justify-center bg-[#ff0050]">
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
                    )}
                    <span className="text-sm max-w-[90%] overflow-x-hidden text-ellipsis">
                        {email ?? (publicAddress === fromAddress ? toAddress : fromAddress)}
                    </span>
                </div>
            </div>

            <div className={`flex w-full justify-end ${publicAddress === fromAddress ? "text-red-400" : "text-green-400"}`}>
                {publicAddress === fromAddress ? <span>- {amount}</span> : <span>+ {amount}</span>}
            </div>
        </Link>
    );
}
