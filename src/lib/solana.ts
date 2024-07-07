import { SolanaDevnetMyPaymasterAddress, SolanaDevnetProgramAddress } from "@/constants/tokenAddress";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function aggregateGasFees(connection: Connection, publicAddress: string) {
    try {
        const publicKey = new PublicKey(publicAddress);
        const paymasterPublicKey = new PublicKey(SolanaDevnetMyPaymasterAddress.PAYMASTER);

        const signatures = await connection?.getSignaturesForAddress(publicKey).then((res) => res);

        let totalGasFees = 0;
        let totalReceivedAmountFromPaymaster = 0;

        for (const signatureInfo of signatures) {
            const { signature } = signatureInfo;
            const transaction = await connection.getParsedTransaction(signature, {
                maxSupportedTransactionVersion: 10,
            });

            if (transaction && transaction.meta) {
                // aggregate gas fees
                for (const instruction of transaction.transaction.message.instructions) {
                    if (instruction.programId.toBase58() === SolanaDevnetProgramAddress.SYSTEM) {
                        // @ts-ignore
                        const { source } = instruction.parsed.info;
                        if (
                            // @ts-ignore
                            instruction.parsed.type === "transfer" &&
                            new PublicKey(source).equals(publicKey)
                        ) {
                            totalGasFees += transaction.meta.fee;
                        }
                    }
                    // @ts-ignore
                    if (instruction.program === "spl-token") {
                        // @ts-ignore
                        const { authority } = instruction.parsed.info;
                        if (
                            // @ts-ignore
                            instruction.parsed.type === "transfer" &&
                            new PublicKey(authority).equals(publicKey)
                        ) {
                            totalGasFees += transaction.meta.fee;
                        }
                    }
                }

                // aggregate received amount from paymaster
                for (const instruction of transaction.transaction.message.instructions) {
                    if (instruction.programId.toBase58() === SolanaDevnetProgramAddress.SYSTEM) {
                        // @ts-ignore
                        const { source, destination, lamports } = instruction.parsed.info;
                        if (
                            // @ts-ignore
                            instruction.parsed.type === "transfer" &&
                            new PublicKey(source).equals(paymasterPublicKey) &&
                            new PublicKey(destination).equals(publicKey)
                        ) {
                            totalReceivedAmountFromPaymaster += lamports;
                        }
                    }
                }
            }
        }

        return {
            totalGasFees: totalGasFees / LAMPORTS_PER_SOL,
            totalReceivedAmountFromPaymaster: totalReceivedAmountFromPaymaster / LAMPORTS_PER_SOL,
            amountLeft: (totalReceivedAmountFromPaymaster - totalGasFees) / LAMPORTS_PER_SOL,
        };
    } catch (error) {
        console.log("Error aggregating gas fees:", error);
        throw error;
    }
}
