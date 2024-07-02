"use client";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import TransactionEntry from "./transactionEntry";
import { useCallback, useContext, useEffect, useState } from "react";
import { SolanaContext } from "@/providers/SolanaProvider";
import {
  ConfirmedSignatureInfo,
  ParsedTransactionWithMeta,
  PublicKey,
} from "@solana/web3.js";
import { useMagicTokenStore } from "@/store/magicTokenStore";

export default function TransactionList() {
  const { connection } = useContext(SolanaContext);
  const { publicAddress } = useMagicTokenStore();

  const [txs, setTxs] = useState<
    ((ParsedTransactionWithMeta & { signature: string }) | null)[]
  >([]);

  const getTransactions = useCallback(
    async ({ address, numTx }: { address: string; numTx: number }) => {
      const pubKey = new PublicKey(address);
      const signatures = await connection
        ?.getSignaturesForAddress(pubKey, { limit: numTx })
        .then((res) => res.map((tx) => tx.signature));

      if (signatures && signatures.length > 0) {
        const txs = await connection?.getParsedTransactions(signatures);
        if (txs) {
          setTxs(
            txs.map(
              (tx, i) =>
                ({
                  ...tx,
                  signature: signatures[i],
                } as ParsedTransactionWithMeta & { signature: string })
            )
          );
          console.log(txs);
        }
      }
    },
    [connection]
  );

  useEffect(() => {
    if (publicAddress) {
      getTransactions({ address: publicAddress, numTx: 10 });
    }
  }, [getTransactions, publicAddress]);

  return (
    <section className="flex flex-col w-full p-4 relative h-[65%]">
      <DotPattern
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] bg-transparent"
        )}
      />

      <div className="w-full text-white overflow-y-auto">
        <div className="flex justify-between items-center p-4">
          <h1>Recent Transactions</h1>
          <Button variant="ghost" className="text-white">
            View All
          </Button>
        </div>

        {/* {JSON.stringify(txs)} */}

        <Separator />

        <div className="flex flex-col space-y-1 w-full">
          {txs.map((tx, index) => (
            <TransactionEntry tx={tx} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
