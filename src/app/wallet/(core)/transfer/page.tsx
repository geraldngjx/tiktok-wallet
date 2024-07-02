"use client";

import { Input } from "@/components/ui/input";
import { withAuthMagic } from "@/lib/hoc/withAuth";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { CircularProgress, debounce } from "@mui/material";
import { useCallback, useContext, useState } from "react";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useMagic } from "@/providers/MagicProvider";
import { SolanaContext } from "@/providers/SolanaProvider";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

function Transfer() {
    const supabase = useContext(SupabaseBrowserContext);

    const { publicAddress } = useMagicTokenStore();
    const { magic } = useMagic();
    const { toast } = useToast();

    const { connection } = useContext(SolanaContext);

    const [searchResults, setSearchResults] = useState<
        {
            id: string;
            email: string;
            publicAddress: string;
            created_at: string;
        }[]
    >([]);

    const [open, setOpen] = useState(false);
    const [toAddress, setToAddress] = useState("");

    const [toAddressError, setToAddressError] = useState(false);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [disabled, setDisabled] = useState(!toAddress || !amount);
    const [transactionLoading, setTransactionLoadingLoading] = useState(false);
    const [hash, setHash] = useState("");

    const searchEmail = useCallback(
        async ({ email }: { email: string }) => {
            try {
                setLoading(true);
                const { data: users } = await supabase.rpc("search_users", { prefix: email });
                setSearchResults(users);
            } catch (e) {
                console.log("error in saving to supabase: " + e);
            }
            setLoading(false);
        },
        [supabase]
    );

    const onInputChange = debounce((value: string) => {
        if (value !== "") {
            searchEmail({ email: value });
        } else {
            setSearchResults([]);
        }
    }, 300);

    const sendTransaction = useCallback(async () => {
        const userPublicKey = new PublicKey(publicAddress as string);
        const receiverPublicKey = new PublicKey(toAddress as string);
        if (!PublicKey.isOnCurve(receiverPublicKey.toBuffer())) {
            return setToAddressError(true);
        }
        if (isNaN(Number(amount))) {
            return setAmountError(true);
        }
        setDisabled(true);

        try {
            setTransactionLoadingLoading(true);
            const hash = await connection?.getLatestBlockhash();
            if (!hash) return;

            const transaction = new Transaction({
                feePayer: userPublicKey,
                ...hash,
            });

            const lamportsAmount = Number(amount) * LAMPORTS_PER_SOL;

            console.log("amount: " + lamportsAmount);

            const transfer = SystemProgram.transfer({
                fromPubkey: userPublicKey,
                toPubkey: receiverPublicKey,
                lamports: lamportsAmount,
            });

            transaction.add(transfer);

            const signedTransaction = await magic?.solana.signTransaction(transaction, {
                requireAllSignatures: false,
                verifySignatures: true,
            });

            const signature = await connection?.sendRawTransaction(Buffer.from(signedTransaction?.rawTransaction as unknown as string, "base64"));

            setHash(signature ?? "");
            toast({
                title: `Transaction successful sig: ${signature}`,
            });
            setTransactionLoadingLoading(false);
            setDisabled(false);
            setToAddress("");
            setAmount("");
        } catch (e: any) {
            setTransactionLoadingLoading(false);
            setDisabled(false);
            setToAddress("");
            setAmount("");
            toast({ title: "Transaction failed" });
            console.log(e);
        }
    }, [publicAddress, toAddress, amount, connection, magic?.solana, toast]);

    return (
        <div className="flex flex-col w-full h-full space-y-10 items-center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button role="combobox" aria-expanded={open} className="w-[80vw] justify-between">
                        {toAddress !== "" ? searchResults.find((result) => result.publicAddress === toAddress)?.email : "Select recipient"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[80vw] border-0">
                    <Command className="bg-[#010101]">
                        <Input
                            placeholder="Search user"
                            className="h-9 bg-black border-0 text-white"
                            onChange={(e) => onInputChange(e.target.value)}
                        />

                        <CommandList className="bg-black text-white border-black drop-shadow-xl">
                            <CommandEmpty>No user found.</CommandEmpty>
                            <CommandGroup className="bg-black text-white border-black">
                                {searchResults.map((result) => (
                                    <CommandItem
                                        className="bg-black data-[selected=true]:bg-black/80 data-[selected=true]:text-white text-white border-black space-x-2"
                                        key={result.id}
                                        value={result.publicAddress}
                                        onSelect={(currentValue) => {
                                            setToAddress(currentValue === toAddress ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <Avatar>
                                            <AvatarFallback className="bg-slate-900">{result.email.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <span>{result.email}</span>
                                        <CheckIcon
                                            className={cn("ml-auto h-4 w-4", toAddress === result.publicAddress ? "opacity-100" : "opacity-0")}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <Input placeholder="Amount" className="h-10 w-20 bg-transparent text-white" onChange={(e) => setAmount(e.target.value)} />

            <Button
                onClick={async () => {
                    await sendTransaction();
                }}
            >
                {transactionLoading ? (
                    <div className="w-full loading-container">
                        <CircularProgress />
                    </div>
                ) : (
                    "Send"
                )}
            </Button>

            {hash ? <>{hash}</> : null}
        </div>
    );
}

export default withAuthMagic(Transfer);
