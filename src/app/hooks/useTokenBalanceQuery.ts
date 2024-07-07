import { SolanaDevnetTokenAddress } from "@/constants/tokenAddress";
import requestAirdrop from "@/lib/faucet";
import { aggregateGasFees } from "@/lib/solana";
import { useMagic } from "@/providers/MagicProvider";
import { SolanaContext } from "@/providers/SolanaProvider";
import { useAccountBalanceStore } from "@/store/accountBalanceStore";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useContext } from "react";

export const useSolanaTokenBalanceQuery = ({ publicAddress }: { publicAddress: string }) => {
    // const { connection } = useMagic();
    const { connection } = useContext(SolanaContext);
    const { setSolanaBalance } = useAccountBalanceStore();

    return {
        queryKey: ["getSolanaTokenBalanceQuery", publicAddress],
        queryFn: async () => {
            const pubKey = new PublicKey(publicAddress);

            const balance = connection && (await connection.getBalance(pubKey));

            console.log("user SOL balance", balance ?? 0 / LAMPORTS_PER_SOL);

            let gasLeftFromPaymaster = 0;
            try {
                const allGasFee = await aggregateGasFees(connection!, publicAddress);
                gasLeftFromPaymaster += allGasFee.amountLeft;
                console.log("Gas fee received from Paymaster: ", allGasFee.totalReceivedAmountFromPaymaster);
                console.log("Gas fee left from Paymaster: ", allGasFee.amountLeft);
                console.log("Total gas fee spent so far: ", allGasFee.totalGasFees);
            } catch (e) {
                console.log("error in aggregateGasFees", e);
            }

            console.log("Solana belongs to me: ", (balance! / LAMPORTS_PER_SOL - gasLeftFromPaymaster).toFixed(3));

            if (!balance || balance === 0 || balance / LAMPORTS_PER_SOL < 0.01) {
                try {
                    const res = await requestAirdrop({ publicAddress });

                    console.log("res", res);

                    if (res?.signature) {
                        setTimeout(() => {}, 2000);
                    }
                } catch (e) {
                    console.log("error requesting airdrop", e);
                }
            }

            const solanaBalance = !balance || balance === 0 ? "0" : (balance / LAMPORTS_PER_SOL - gasLeftFromPaymaster).toFixed(3);

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
