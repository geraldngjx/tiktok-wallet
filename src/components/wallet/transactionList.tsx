import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import TransactionEntry from "./transactionEntry";
import { Separator } from "../ui/separator";
import { Card } from "@mui/material";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const transactionList = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function TransactionList() {
  return (
    <section className="flex flex-col p-4 relative h-[65%]">
      <DotPattern
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] bg-transparent",
        )}
      />

      <ScrollArea className="h-full text-white">
        <div className="flex justify-between items-center p-4">
          <h1>Recent Transactions</h1>
          <Button variant="ghost" className="text-white">
            View All
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col space-y-1">
          {transactionList.map((transaction, index) => (
            <TransactionEntry value={transaction} key={index} />
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
