import { SolanaDevnetTokenAddress } from "@/constants/tokenAddress";
import { SolanaContext } from "@/providers/SolanaProvider";
import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { isEmpty, isNull, isUndefined, orderBy, uniqBy } from "lodash";
import { useContext } from "react";

export const useTransactionsQuery = ({ publicAddress }: { publicAddress: string }) => {
    const { connection } = useContext(SolanaContext);

    return {
        queryKey: ["getTransactions", publicAddress],
        queryFn: async () => {
            const pubKey = new PublicKey(publicAddress);

            const stableCoinsOwnerAccounts = await Promise.all([
                await connection
                    ?.getParsedTokenAccountsByOwner(pubKey, {
                        mint: new PublicKey(SolanaDevnetTokenAddress.USDC),
                    })
                    .then((res) => {
                        if (res && res.value && !isEmpty(res.value) && res.value[0].pubkey) {
                            return res.value[0].pubkey;
                        }
                        return null;
                    }),
                await connection
                    ?.getParsedTokenAccountsByOwner(pubKey, {
                        mint: new PublicKey(SolanaDevnetTokenAddress.EURC),
                    })
                    .then((res) => {
                        if (res && res.value && !isEmpty(res.value) && res.value[0].pubkey) {
                            return res.value[0].pubkey;
                        }
                        return null;
                    }),
            ]);

            const aggregatedSignatures = await Promise.all([
                await connection?.getSignaturesForAddress(pubKey, { limit: 100 }).then((res) => res),
                stableCoinsOwnerAccounts[0] &&
                    (await connection?.getSignaturesForAddress(stableCoinsOwnerAccounts[0], { limit: 100 }).then((res) => res)),
                stableCoinsOwnerAccounts[1] &&
                    (await connection?.getSignaturesForAddress(stableCoinsOwnerAccounts[1], { limit: 100 }).then((res) => res)),
            ])
                .then((res) => {
                    return orderBy(uniqBy(res.flat(), "signature"), ["blockTime"], ["desc"])
                        .filter((tx) => !isUndefined(tx) && !isNull(tx))
                        .map((tx) => tx!.signature);
                })
                .catch((e) => {
                    console.log(e);
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

export const useTransactionQuery = ({ signature }: { signature: string }) => {
    const { connection } = useContext(SolanaContext);

    return {
        queryKey: ["getTransaction", signature],
        queryFn: async () => {
            const tx = await connection?.getParsedTransaction(signature, {
                maxSupportedTransactionVersion: 10,
            });

            return tx;
        },
    };
};

export const useTransactionStatusQuery = ({ signature }: { signature: string }) => {
    const { connection } = useContext(SolanaContext);

    return {
        queryKey: ["getTransactionStatus", signature],
        queryFn: async () => {
            const status = await connection?.getSignatureStatus(signature, {
                searchTransactionHistory: true,
            });

            return status;
        },
    };
};
