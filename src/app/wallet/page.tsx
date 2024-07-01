"use client";
import { Button, Card } from "@mui/material";
import Balance from "@/components/ui/wallet/balance";
import TransactionList from "@/components/ui/wallet/transactionList";
import {
  AccountCircle,
  QrCodeScanner,
  Send,
  Wallet,
} from "@mui/icons-material";
import { signout } from "@/lib/auth";
import withAuth from "@/lib/hoc/withAuth";
import Link from "next/link";

const WalletHome = () => {
  return (
    <div className="flex flex-col gap-4">
      <Balance />
      {/* Wallet Navigation Links */}
      <div>
        <Card className="flex mx-8 gap-4 justify-around items-center">
          {/* Each individual link */}
          <Link href="/wallet/topup" className="flex m-4 flex-col items-center">
            <Wallet />
            <div>Top-Up</div>
          </Link>
          <Link
            href="/wallet/transfer"
            className="flex m-4 flex-col items-center"
          >
            <Send />
            <div>Transfer</div>
          </Link>
          <Link href="/wallet/scan" className="flex m-4 flex-col items-center">
            <QrCodeScanner />
            <div>Scan To Pay</div>
          </Link>
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
      <Button onClick={() => signout()}>Sign Out</Button>
      {/* Use the gap utility to add space between the cards instead of adding margin vertically*/}
      <div className="flex flex-col gap-2">
        <TransactionList />
      </div>
    </div>
  );
};

export default withAuth(WalletHome);
