export enum Network {
    SOLANA_DEVNET = "solana-devnet",
    SOLANA_MAINNET_BETA = "solana-mainnet",
    SOLANA_TESTNET = "solana-testnet",
}

export const getNetworkUrl = () => {
    switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
        case Network.SOLANA_DEVNET:
            return process.env.NEXT_PUBLIC_ALCHEMY_SOLANA_DEVNET_RPC as string;
        case Network.SOLANA_MAINNET_BETA:
            return "https://solana-mainnet.g.alchemy.com/v2/9nCoa06gjvDwYyTdV5ruBp2Qe4_wZnaO";
        case Network.SOLANA_TESTNET:
            return "https://api.testnet.solana.com";
        default:
            throw new Error("Network not supported");
    }
};

export const getNetworkName = () => {
    switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
        case Network.SOLANA_DEVNET:
            return "Solana (Devnet)";
        case Network.SOLANA_MAINNET_BETA:
            return "Solana (Mainnet Beta)";
        case Network.SOLANA_TESTNET:
            return "Solana (Testnet)";
        default:
            throw new Error("Network not supported");
    }
};

export const getBlockExplorer = (address: string) => {
    switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
        case Network.SOLANA_DEVNET:
            return `https://explorer.solana.com/address/${address}?cluster=devnet`;
        case Network.SOLANA_MAINNET_BETA:
            return `https://explorer.solana.com/address/${address}`;
        case Network.SOLANA_TESTNET:
            return `https://explorer.solana.com/address/${address}?cluster=testnet`;
        default:
            throw new Error("Network not supported");
    }
};
