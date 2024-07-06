import { SolanaDevnetTokenAddress } from "@/constants/tokenAddress";
import { useMagic } from "@/providers/MagicProvider";
import { SolanaContext } from "@/providers/SolanaProvider";
import { useAccountBalanceStore } from "@/store/accountBalanceStore";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useContext } from "react";

export const useSolanaTokenBalanceQuery = ({ publicAddress }: { publicAddress: string }) => {
    const { connection } = useMagic();
    const { setSolanaBalance } = useAccountBalanceStore();

    return {
        queryKey: ["getSolanaTokenBalanceQuery", publicAddress],
        queryFn: async () => {
            const pubKey = new PublicKey(publicAddress);

            const balance = connection && (await connection.getBalance(pubKey));

            // TODO: request airdrop if balance is 0
            // if (!balance || balance === 0) {
            //     console.log("requesting airdrop");

            //     try {
            //         const requestAirdropSignature = await solanaConnection?.requestAirdrop(pubKey, 1 * LAMPORTS_PER_SOL);
            //         console.log("requestAirdropSignature", requestAirdropSignature);
            //     } catch (e) {
            //         console.log("error requesting airdrop", e);
            //     }
            // }

            const solanaBalance = !balance || balance === 0 ? "0" : (balance / LAMPORTS_PER_SOL).toFixed(2);

            console.log("solanaBalance", solanaBalance);

            setSolanaBalance(solanaBalance);

            return solanaBalance;
        },
    };
};

export const useUSDCTokenBalanceQuery = ({ publicAddress }: { publicAddress: string }) => {
    const { connection } = useContext(SolanaContext);
    const { setUsdcBalance } = useAccountBalanceStore();

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

            setUsdcBalance(balance);

            return balance;
        },
    };
};

export const useEURCTokenBalanceQuery = ({ publicAddress }: { publicAddress: string }) => {
    const { connection } = useContext(SolanaContext);
    const { setEurcBalance } = useAccountBalanceStore();

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

            setEurcBalance(balance);

            return balance;
        },
    };
};
