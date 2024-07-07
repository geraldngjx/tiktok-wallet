import { SolanaContext } from "@/providers/SolanaProvider";
// import { getPythProgramKeyForCluster, PythConnection, PythHttpClient } from "@pythnetwork/client";
import { useContext } from "react";

export function useSolanaPriceQuery() {
    const { connection } = useContext(SolanaContext);
    return {
        queryKey: ["solanaPrice"],
        queryFn: async () => {
            // const pythClient = new PythHttpClient(connection!, getPythProgramKeyForCluster("devnet"));
            // const data = await pythClient.getData();

            const res = await fetch("https://api.raydium.io/v2/main/price").then((res) => res.json());
            return res["So11111111111111111111111111111111111111112"];
        },
    };
}
