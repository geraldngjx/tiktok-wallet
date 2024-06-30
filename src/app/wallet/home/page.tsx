"use client";
import { Card } from "@mui/material";
import Balance from "@/components/ui/walletHome/balance";
import TransactionList from "@/components/ui/walletHome/transactionList";
import {
  AccountCircle,
  QrCodeScanner,
  Send,
  Wallet,
} from "@mui/icons-material";

export default function WalletHome() {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <div className="flex flex-col gap-4">
      <Balance />
      {/* Wallet Navigation Links */}
      <div>
        <Card className="flex mx-8 gap-4 justify-around items-center">
          {/* Each individual link */}
          <div className="flex m-4 flex-col items-center">
            <Wallet />
            <div>Top-Up</div>
          </div>
          <div className="flex m-4 flex-col items-center">
            <Send />
            <div>Transfer</div>
          </div>
          <div className="flex m-4 flex-col items-center">
            <QrCodeScanner />
            <div>Scan To Pay</div>
          </div>
        </Card>
      </div>
      {/* Use the gap utility to add space between the cards instead of adding margin vertically*/}
      <div className="flex flex-col gap-2">
        <h1 className="mx-8">Recent Recipients</h1>
        <Card className="flex mx-8 gap-4 justify-around items-center">
          {/* Each individual link */}
          <div className="flex m-4 flex-col items-center">
            <AccountCircle />
            <div>Tom</div>
          </div>
          <div className="flex m-4 flex-col items-center">
            <AccountCircle />
            <div>Alice</div>
          </div>
          <div className="flex m-4 flex-col items-center">
            <AccountCircle />
            <div>Tracy</div>
          </div>
        </Card>
      </div>
      {/* Use the gap utility to add space between the cards instead of adding margin vertically*/}
      <div className="flex flex-col gap-2">
        <TransactionList />
      </div>
    </div>
  );
}
