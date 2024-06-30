import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import TransactionEntry from "./transactionEntry";
import { Separator } from "../separator";
import { Card } from "@mui/material";

const transactionList = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function TransactionList() {
  return (
    <Card className="mx-8">
      <ScrollArea className="h-64 rounded-md border">
        <div className="flex justify-between p-4">
          <h1>Recent Transactions</h1>
          <button className="text-primary">View All</button>
        </div>
        <Separator />
        <div className="flex flex-col">
          {transactionList.map((transaction) => (
            <>
              <TransactionEntry value={transaction} />
            </>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
