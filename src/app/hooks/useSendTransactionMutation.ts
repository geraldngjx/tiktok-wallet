import { useToast } from "@/components/ui/use-toast";
import { useMagic } from "@/providers/MagicProvider";
import { SolanaContext } from "@/providers/SolanaProvider";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useContext } from "react";

export function useSendTransactionMutation({ setSignature }: { setSignature: Dispatch<SetStateAction<string>> }) {
    const { connection } = useContext(SolanaContext);
    const { magic } = useMagic();
    const { publicAddress } = useMagicTokenStore();

    const { toast } = useToast();
    return useMutation({
        mutationKey: ["sendTransactionMutation"],
        mutationFn: async ({ currency, toAddress, amount }: { currency: "Solana" | "USDC" | "EURC"; toAddress: string; amount: number }) => {
            const fromPublicKey = new PublicKey(publicAddress);
            const toPublicKey = new PublicKey(toAddress);

            if (!PublicKey.isOnCurve(toPublicKey.toBuffer())) {
                toast({
                    title: "Invalid user address",
                    style: {
                        top: "50px",
                        color: "red",
                    },
                });
                return;
            }
            if (isNaN(Number(amount))) {
                toast({
                    title: "Invalid amount",
                    style: {
                        top: "50px",
                        color: "red",
                    },
                });
                return;
            }

            try {
                const hash = await connection?.getLatestBlockhash();
                if (!hash) return;

                const transaction = new Transaction({
                    feePayer: fromPublicKey,
                    ...hash,
                });

                switch (currency) {
                    case "Solana":
                        const lamportsAmount = Number(amount) * LAMPORTS_PER_SOL;
                        console.log("amount: " + lamportsAmount);
                        const transfer = SystemProgram.transfer({
                            fromPubkey: fromPublicKey,
                            toPubkey: toPublicKey,
                            lamports: lamportsAmount,
                        });
                        transaction.add(transfer);
                        break;
                    case "USDC":
                        // USDC transfer instruction
                        break;
                    case "EURC":
                        // EURC transfer instruction
                        break;
                    default:
                        throw new Error("Invalid currency");
                }

                const signedTransaction = await magic?.solana.signTransaction(transaction, {
                    requireAllSignatures: false,
                    verifySignatures: true,
                });

                const signature = await connection?.sendRawTransaction(Buffer.from(signedTransaction?.rawTransaction as unknown as string, "base64"));

                if (!signature) {
                    throw new Error("Transaction failed");
                }

                setSignature(signature);
            } catch (e: any) {
                toast({
                    title: "Transaction failed",
                    description: e.message,
                    style: {
                        top: "50px",
                        color: "red",
                    },
                });
                console.log(e);
            }
        },
    });
}
