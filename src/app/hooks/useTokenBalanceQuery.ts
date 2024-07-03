import { SolanaDevnetTokenAddress } from "@/constants/tokenAddress";
import { SolanaContext } from "@/providers/SolanaProvider";
import { PublicKey } from "@solana/web3.js";
import { useContext } from "react";

export const useUSDCTokenBalanceQuery = ({ publicAddress }: { publicAddress: string }) => {
    const { connection } = useContext(SolanaContext);

    return {
        queryKey: ["getUSDCTokenBalanceQuery", publicAddress],
        queryFn: async () => {
            const pubKey = new PublicKey(publicAddress);

            const balance = await connection
                ?.getParsedTokenAccountsByOwner(pubKey, {
                    mint: new PublicKey(SolanaDevnetTokenAddress.USDC),
                })
                .then((res) => {
                    return res.value[0].account.data.parsed.info.tokenAmount.uiAmountString;
                });

            return balance;
        },
    };
};

export const useEURCTokenBalanceQuery = ({ publicAddress }: { publicAddress: string }) => {
    const { connection } = useContext(SolanaContext);

    return {
        queryKey: ["getEURCTokenBalanceQuery", publicAddress],
        queryFn: async () => {
            const pubKey = new PublicKey(publicAddress);

            const balance = await connection
                ?.getParsedTokenAccountsByOwner(pubKey, {
                    mint: new PublicKey(SolanaDevnetTokenAddress.EURC),
                })
                .then((res) => {
                    return res.value[0].account.data.parsed.info.tokenAmount.uiAmountString;
                });

            return balance;
        },
    };
};
