import { SolanaDevnetTokenAddress } from "@/constants/tokenAddress";
import { SolanaContext } from "@/providers/SolanaProvider";
import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { useContext } from "react";
import { isUndefined, orderBy, uniq, uniqBy } from "lodash";

export const useTransactionsQuery = ({ publicAddress }: { publicAddress: string }) => {
    const { connection } = useContext(SolanaContext);

    return {
        queryKey: ["getTransactions", publicAddress],
        queryFn: async () => {
            const pubKey = new PublicKey(publicAddress);
            // const signatures = await connection?.getSignaturesForAddress(pubKey, { limit: 100 }).then((res) => res);

            // const usdcOwnerAccount = await connection
            //     ?.getParsedTokenAccountsByOwner(pubKey, {
            //         mint: new PublicKey(SolanaDevnetTokenAddress.USDC),
            //     })
            //     .then((res) => res.value[0].pubkey);

            // const usdcTxSignatures =
            //     usdcOwnerAccount && (await connection?.getSignaturesForAddress(usdcOwnerAccount, { limit: 100 }).then((res) => res));

            // const eurcOwnerAccount = await connection
            //     ?.getParsedTokenAccountsByOwner(pubKey, {
            //         mint: new PublicKey(SolanaDevnetTokenAddress.EURC),
            //     })
            //     .then((res) => res.value[0].pubkey);

            // const eurcTxSignatures =
            //     eurcOwnerAccount && (await connection?.getSignaturesForAddress(eurcOwnerAccount, { limit: 100 }).then((res) => res));

            const stableCoinsOwnerAccounts = await Promise.all([
                await connection
                    ?.getParsedTokenAccountsByOwner(pubKey, {
                        mint: new PublicKey(SolanaDevnetTokenAddress.USDC),
                    })
                    .then((res) => res.value[0].pubkey),
                await connection
                    ?.getParsedTokenAccountsByOwner(pubKey, {
                        mint: new PublicKey(SolanaDevnetTokenAddress.EURC),
                    })
                    .then((res) => res.value[0].pubkey),
            ]);

            const aggregatedSignatures = await Promise.all([
                await connection?.getSignaturesForAddress(pubKey, { limit: 100 }).then((res) => res),
                stableCoinsOwnerAccounts[0] &&
                    (await connection?.getSignaturesForAddress(stableCoinsOwnerAccounts[0], { limit: 100 }).then((res) => res)),
                stableCoinsOwnerAccounts[1] &&
                    (await connection?.getSignaturesForAddress(stableCoinsOwnerAccounts[1], { limit: 100 }).then((res) => res)),
            ]).then((res) => {
                return orderBy(uniqBy(res.flat(), "signature"), ["blockTime"], ["desc"])
                    .filter((tx) => !isUndefined(tx))
                    .map((tx) => tx!.signature);
            });

            if (aggregatedSignatures && aggregatedSignatures.length > 0) {
                const txs = await Promise.all(
                    aggregatedSignatures.map((signature) =>
                        connection?.getParsedTransaction(signature, {
                            maxSupportedTransactionVersion: 10,
                        })
                    )
                );

                if (txs) {
                    return txs.map((tx, i) => ({ ...tx, signature: aggregatedSignatures[i] } as ParsedTransactionWithMeta & { signature: string }));
                }
            }
            return [];
        },
    };
};

export const useUSDCTokenTransactionQuery = ({ publicAddress }: { publicAddress: string }) => {
    const { connection } = useContext(SolanaContext);

    return {
        queryKey: ["getUSDCTokenTransactionQuery", publicAddress],
        queryFn: async () => {
            const pubKey = new PublicKey("4vqHV141LFRPUmXwzhKuPxHKajhBHnR4hP9hZ6K2w9eY");

            const signatures = await connection?.getSignaturesForAddress(pubKey, { limit: 10 }).then((res) => res.map((tx) => tx.signature));

            if (signatures && signatures.length > 0) {
                const txs = await Promise.all(
                    signatures.map((signature) =>
                        connection?.getParsedTransaction(signature, {
                            maxSupportedTransactionVersion: 10,
                        })
                    )
                );

                // const txs = await connection?.getParsedTransactions(signatures);

                console.log("here txs: ", txs);
                if (txs) {
                    console.log(txs);
                    return txs.map((tx, i) => ({ ...tx, signature: signatures[i] } as ParsedTransactionWithMeta & { signature: string }));
                }
            }
            return [];
        },
    };
};
