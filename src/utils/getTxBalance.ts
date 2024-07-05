import { SolanaDevnetTokenAddress } from "@/constants/tokenAddress";
import { ParsedTransactionWithMeta } from "@solana/web3.js";

export function getTxBalance({
    stableCoin,
    tx,
    publicAddress,
}: {
    stableCoin: "usdc" | "eurc";
    tx: ParsedTransactionWithMeta & { signature?: string };
    publicAddress: string;
}) {
    const meta = tx.meta;

    if (!meta?.preTokenBalances || !meta?.postTokenBalances) {
        return 0;
    }

    const tokenAddress = stableCoin === "usdc" ? SolanaDevnetTokenAddress.USDC : stableCoin === "eurc" ? SolanaDevnetTokenAddress.EURC : null;

    if (!tokenAddress) {
        return 0;
    }

    const preBalance = meta.preTokenBalances.find((balance) => balance.mint === tokenAddress && balance.owner === publicAddress)?.uiTokenAmount
        .uiAmountString;

    const postBalance = meta.postTokenBalances.find((balance) => balance.mint === tokenAddress && balance.owner === publicAddress)?.uiTokenAmount
        .uiAmountString;

    if (!preBalance && !postBalance) {
        return 0;
    }

    if (!preBalance && postBalance) {
        return parseFloat(postBalance);
    }

    if (preBalance && postBalance) {
        return parseFloat(postBalance) - parseFloat(preBalance);
    }

    return 0;
}
