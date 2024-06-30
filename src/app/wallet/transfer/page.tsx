"use client";
import {
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState } from "react";
import Image from "next/image";

interface TransferParams {
  amount: number;
  recipient: string;
}

const TransferPage: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const transfer = async ({ amount, recipient }: TransferParams) => {
    // Mock transfer function
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve();
        } else {
          reject(new Error("Transfer failed"));
        }
      }, 1000);
    });
  };

  const handleTransfer = async () => {
    setLoading(true);
    setError("");

    try {
      await transfer({ amount, recipient });
      setAmount(0);
      setRecipient("");
    } catch (e: any) {
      setError(e.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 p-8">
          <Image
            src="/tiktok_logo_circle.png"
            alt="Tiktok Logo"
            width={40}
            height={40}
          />
          <Typography component="h1" variant="h5">
            Transfer Amount
          </Typography>
        </div>

        <div className="flex flex-col gap-4">
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
          <Button variant="contained" color="success">
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TransferPage;
