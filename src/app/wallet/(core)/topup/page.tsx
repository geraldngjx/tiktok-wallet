"use client";
import { login } from "@/lib/auth";
import withAuth from "@/lib/hoc/withAuth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, Card, FormControl, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

export default function TopUpPage() {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const topUp = async (amount: number) => {
        // Mock top-up function
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve();
                } else {
                    reject(new Error("Top-up failed"));
                }
            }, 1000);
        });
    };

    const handleTopUp = async () => {
        setLoading(true);
        setError("");

        try {
            await topUp(amount);
            setAmount(0);
        } catch (e: any) {
            setError(e.message);
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="w-full max-w-sm">
                <div className="flex flex-col items-center gap-2 p-8">
                    <Image src="/tiktok_logo_circle.png" alt="Tiktok Logo" width={40} height={40} />
                    <Typography component="h1" variant="h5">
                        Top-up Amount
                    </Typography>
                </div>

                <div className="flex flex-col gap-4">
                    <FormControl>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
}

// export default withAuth(TopUpPage);
