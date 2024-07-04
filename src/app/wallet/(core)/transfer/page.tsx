"use client";

import { Input } from "@/components/ui/input";
import { withAuthMagic } from "@/lib/hoc/withAuth";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { CircularProgress, debounce } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import ShineBorder from "@/components/magicui/shine-border";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useMagic } from "@/providers/MagicProvider";
import { SolanaContext } from "@/providers/SolanaProvider";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { isEmpty } from "lodash";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

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

    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const [toAddress, setToAddress] = useState("");
    const [currency, setCurrency] = useState("USDC");

    const [toAddressError, setToAddressError] = useState(false);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [disabled, setDisabled] = useState(!toAddress || !amount);
    const [transactionLoading, setTransactionLoadingLoading] = useState(false);
    const [hash, setHash] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const searchEmail = useCallback(
        debounce(async ({ email }: { email: string }) => {
            try {
                setLoading(true);
                const { data: users } = await supabase.rpc("search_users", { prefix: email });
                setSearchResults(users);
            } catch (e) {
                console.log("error in saving to supabase: " + e);
            }
            setLoading(false);
        }, 300),
        [supabase]
    );

    const onInputChange = debounce((value: string) => {
        if (value !== "") {
            searchEmail({ email: value });
        } else {
            setSearchResults([]);
        }
    }, 300);

    useEffect(() => {
        if (input !== "") {
            searchEmail({ email: input });
        } else {
            setSearchResults([]);
        }
    }, [input, searchEmail]);

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

    const getIconByCurrency = (currency: string) => {
        switch (currency) {
            case "Solana":
                return (
                    <div className="bg-black scale-90 h-full aspect-square flex rounded-full items-center justify-center">
                        <Image src="/solana.svg" width={20} height={20} alt="Solana" />
                    </div>
                );

            case "USDC":
                return (
                    <div className="h-full scale-75 aspect-square flex items-center justify-center">
                        <svg
                            className="h-full aspect-square"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            data-testid="icon-usdc"
                            focusable="false"
                            role="img"
                        >
                            <path
                                d="M15 30c8.313 0 15-6.688 15-15 0-8.313-6.688-15-15-15C6.687 0 0 6.687 0 15c0 8.313 6.687 15 15 15Z"
                                fill="#2775CA"
                            ></path>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.3 11.624c-1.812 4.812.688 10.25 5.563 12 .188.125.375.375.375.562v.875c0 .125 0 .188-.062.25-.063.25-.313.375-.563.25a11.244 11.244 0 0 1-7.312-7.312C2.426 12.31 5.676 5.999 11.613 4.124c.063-.063.188-.063.25-.063.25.063.375.25.375.5v.875c0 .313-.125.5-.375.625C9.301 7 7.238 9 6.301 11.624zm11.626-7.25c.062-.25.312-.375.562-.25a11.335 11.335 0 0 1 7.313 7.375c1.875 5.937-1.375 12.25-7.313 14.125-.062.062-.187.062-.25.062-.25-.062-.375-.25-.375-.5v-.875c0-.312.125-.5.375-.625 2.563-.937 4.625-2.937 5.563-5.562 1.812-4.813-.688-10.25-5.563-12-.187-.125-.375-.375-.375-.625v-.875c0-.125 0-.188.063-.25z"
                                fill="#fff"
                            ></path>
                            <path
                                d="M19.294 16.985c0-2.187-1.312-2.937-3.937-3.25-1.875-.25-2.25-.75-2.25-1.625s.625-1.437 1.875-1.437c1.125 0 1.75.375 2.062 1.312a.47.47 0 0 0 .438.313h1c.25 0 .437-.188.437-.438v-.062a3.122 3.122 0 0 0-2.812-2.563v-1.5c0-.25-.188-.437-.5-.5h-.938c-.25 0-.437.188-.5.5v1.438c-1.875.25-3.062 1.5-3.062 3.062 0 2.063 1.25 2.875 3.875 3.188 1.75.312 2.312.687 2.312 1.687s-.875 1.688-2.062 1.688c-1.625 0-2.188-.688-2.375-1.625-.063-.25-.25-.375-.438-.375h-1.062a.427.427 0 0 0-.438.437v.063c.25 1.562 1.25 2.687 3.313 3v1.5c0 .25.187.437.5.5h.937c.25 0 .438-.188.5-.5v-1.5c1.875-.313 3.125-1.625 3.125-3.313z"
                                fill="#fff"
                            ></path>
                        </svg>
                    </div>
                );

            case "EURC":
                return (
                    <div className="h-full scale-75 aspect-square flex items-center justify-center">
                        <svg
                            className="h-full aspect-square"
                            viewBox="0 0 224 224"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            data-testid="icon-eurc"
                            focusable="false"
                            role="img"
                        >
                            <g clipPath="url(#clip0_1176_2535)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M111.788 0c61.739 0 111.788 50.05 111.788 111.788 0 61.739-50.049 111.788-111.788 111.788S0 173.527 0 111.788 50.05 0 111.788 0Z"
                                    fill="#2775CA"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M137.331 33.074c-2.521-.806-4.582.69-4.582 3.337v6.509c0 1.774 1.337 3.794 3.003 4.404 26.757 9.8 45.904 35.519 45.904 65.629 0 30.11-19.147 55.827-45.904 65.628-1.827.669-3.003 2.459-3.003 4.405v6.508c0 2.647 2.061 4.143 4.582 3.338 33.813-10.804 58.298-42.482 58.298-79.879 0-37.397-24.485-69.076-58.298-79.88ZM90.828 36.411c0-2.647-2.061-4.143-4.582-3.337-33.814 10.803-58.299 42.481-58.299 79.879s24.485 69.075 58.299 79.879c2.52.805 4.582-.691 4.582-3.338v-6.508c0-1.775-1.338-3.795-3.004-4.405-26.756-9.801-45.904-35.519-45.904-65.628 0-30.11 19.148-55.828 45.904-65.629 1.666-.61 3.004-2.63 3.004-4.404V36.41Z"
                                    fill="#fff"
                                ></path>
                                <path
                                    d="m140.376 134.769-6.395-2.857a2.873 2.873 0 0 0-3.75 1.343c-3.018 6.125-8.034 10.029-14.661 10.029-5.999 0-10.811-2.938-14.499-8.875-1.442-2.297-2.587-4.861-3.46-7.67h17.173a2.886 2.886 0 0 0 2.575-1.585l4.097-5.53c.969-1.919-.425-4.185-2.574-4.185H95.679a64.488 64.488 0 0 1-.107-3.653 56.656 56.656 0 0 1 .086-3.649h19.126a2.885 2.885 0 0 0 2.575-1.584l4.097-5.53c.969-1.919-.425-4.185-2.574-4.185H97.591c3.114-10.153 9.615-16.805 17.979-16.674 6.374 0 11.322 3.49 14.496 9.204.711 1.281 2.312 1.772 3.652 1.18l6.428-2.837c1.538-.68 2.192-2.54 1.378-4.01-5.934-10.716-14.585-16.099-25.954-16.099-10.374 0-18.686 4.125-24.998 12.312-3.69 4.822-6.257 10.48-7.781 16.924h-9.338a2.884 2.884 0 0 0-2.575 1.584l-4.097 5.53c-.97 1.919.425 4.185 2.575 4.185h11.892a75.655 75.655 0 0 0-.113 3.649 65.511 65.511 0 0 0 .067 3.653h-7.749a2.885 2.885 0 0 0-2.575 1.584l-4.097 5.53c-.97 1.919.425 4.186 2.575 4.186h13.407c4.24 17.526 16.448 29.478 32.807 29.231 11.615 0 20.369-5.774 26.213-17.271.744-1.464.092-3.26-1.407-3.93Z"
                                    fill="#fff"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_1176_2535">
                                    <path fill="#fff" d="M0 0h223.576v223.576H0z"></path>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col w-full h-full space-y-10 items-center p-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[80vw] justify-between">
                        {toAddress !== "" ? searchResults.find((result) => result.publicAddress === toAddress)?.email : "Select recipient"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[80vw] border-0">
                    <Command>
                        <CommandInput placeholder="Search user..." value={input} onValueChange={setInput} />

                        <CommandList className="drop-shadow-xl">
                            {loading ? (
                                <CommandEmpty>Searching user...</CommandEmpty>
                            ) : (
                                <>
                                    <CommandEmpty>No user found.</CommandEmpty>
                                    <CommandGroup>
                                        {searchResults.map((result) => (
                                            <CommandItem
                                                className="space-x-2"
                                                key={result.id}
                                                value={result.publicAddress}
                                                onSelect={(currentValue) => {
                                                    setToAddress(currentValue === toAddress ? "" : currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Avatar>
                                                    <AvatarFallback>{result.email.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <span>{result.email}</span>
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        toAddress === result.publicAddress ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {!isEmpty(toAddress) ? (
                <div
                    // className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center"
                    className="flex h-[80%] py-48 items-center justify-between flex-col absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-0"
                >
                    <div className="flex items-center w-full justify-between">
                        <Input
                            placeholder="0.00"
                            className="h-14 w-40 text-6xl font-bold text-center border-0 focus-visible:ring-0 focus-visible:placeholder:opacity-0 caret-slate-500"
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <Select defaultValue="USDC" value={currency} onValueChange={(value) => setCurrency(value)}>
                            <ShineBorder
                                className="text-center min-w-[80px] p-0 pl-[3px] size-[86px] text-2xl font-bold capitalize"
                                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                borderWidth={2}
                            >
                                <SelectTrigger className="size-[80px] border-0 flex flex-row justify-center items-center text-white focus:ring-0 focus:ring-offset-0 focus:border-0">
                                    <SelectValue placeholder="Currency" />
                                </SelectTrigger>
                            </ShineBorder>

                            <SelectContent className="min-w-[80px] w-[80px]" side="bottom">
                                {["Solana", "USDC", "EURC"].map((currency) => (
                                    <SelectItem
                                        key={currency}
                                        value={currency}
                                        className="w-[80px] min-w-[80px] px-0 flex justify-center items-center"
                                    >
                                        {getIconByCurrency(currency)} <span>{currency}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {toAddress && currency && (
                        <ShineBorder
                            className="text-center min-w-12 min-h-12 w-18 h-18 p-[2px]"
                            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            borderWidth={2}
                            borderRadius={100}
                        >
                            <Button
                                className="size-16 rounded-full bg-gray-950"
                                variant="ghost"
                                onClick={async () => {
                                    await sendTransaction();
                                }}
                            >
                                {transactionLoading ? (
                                    <div className="w-full loading-container">
                                        <CircularProgress />
                                    </div>
                                ) : (
                                    <ChevronRightIcon size={24} />
                                )}
                            </Button>
                        </ShineBorder>
                    )}
                </div>
            ) : (
                <span className="text-gray-500 line-clamp-1 w-full text-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                    Send transaction by selecting a recipient
                </span>
            )}

            {hash ? <>{hash}</> : null}
        </div>
    );
}

export default withAuthMagic(Transfer);
