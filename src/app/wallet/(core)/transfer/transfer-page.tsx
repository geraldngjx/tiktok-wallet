import { useSendTransactionMutation } from "@/app/hooks/useSendTransactionMutation";
import ShineBorder, { TColorProp } from "@/components/magicui/shine-border";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { getIconByCurrency } from "@/utils/currencyIcon";
import { CURRENCY } from "@/utils/types/currency";
import { debounce, isEmpty } from "lodash";
import { ChevronRightIcon, Disc3Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import TransactionSuccess from "./success";

import { AutoComplete } from "@/components/ui/autocomplete";
import { Input } from "@/components/ui/input";
import { useAccountBalanceStore } from "@/store/accountBalanceStore";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export default function Transfer() {
    const searchParams = useSearchParams();

    const { solanaBalance, usdcBalance, eurcBalance, isLoadingEurcBalance, isLoadingSolanaBalance, isLoadingUsdcBalance } = useAccountBalanceStore();

    const supabase = useContext(SupabaseBrowserContext);

    const [ringColor, setRingColor] = useState(["#2775CA", "#fff"]);

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
    const [recipient, setRecipient] = useState({
        email: "",
        toAddress: "",
    });

    const [availableCurrencies, setAvailableCurrencies] = useState<[CURRENCY.SOLANA, CURRENCY.USDC, CURRENCY.EURC]>([
        CURRENCY.SOLANA,
        CURRENCY.USDC,
        CURRENCY.EURC,
    ]);

    const [currency, setCurrency] = useState<CURRENCY>(availableCurrencies.includes(CURRENCY.USDC) ? CURRENCY.USDC : availableCurrencies[0]);

    const [amount, setAmount] = useState("");

    const [memo, setMemo] = useState("");

    const [loading, setLoading] = useState(false);

    const [signature, setSignature] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const searchEmail = useCallback(
        debounce(async ({ email }: { email: string }) => {
            try {
                setLoading(true);
                const { data: users } = await supabase.rpc("search_users", {
                    prefix: email,
                });

                setSearchResults(users);
            } catch (e) {
                console.log("error in saving to supabase: " + e);
            }
            setLoading(false);
        }, 300),
        [supabase]
    );

    useEffect(() => {
        if (input !== "") {
            console.log("searching email", input);
            searchEmail({ email: input });
        } else {
            setSearchResults([]);
        }
    }, [input, searchEmail]);

    useEffect(() => {
        switch (currency) {
            case "Solana":
                setRingColor(["#9945FF", "#14F195"]);
                break;
            case "USDC":
                setRingColor(["#2775CA", "#fff"]);
                break;
            case "EURC":
                setRingColor(["#2775CA", "#fff"]);
                break;
            default:
                break;
        }
    }, [currency]);

    useEffect(() => {
        const getScanDetails = async () => {
            if (searchParams.has("email")) {
                try {
                    z.string().email().parse(searchParams.get("email")!);

                    const { data: users } = await supabase.rpc("search_users", {
                        prefix: searchParams.get("email"),
                    });

                    setInput(searchParams.get("email")!);

                    setRecipient({
                        email: searchParams.get("email")!,
                        toAddress: users[0].publicAddress,
                    });
                } catch (e) {
                    console.log(e);
                    return;
                }
            }

            if (searchParams.has("amount")) {
                try {
                    z.number().parse(parseFloat(searchParams.get("amount")!));

                    setAmount(searchParams.get("amount")!);
                } catch (e) {
                    console.log(e);
                }
            }

            if (searchParams.has("currencies")) {
                try {
                    const currencies = searchParams.get("currencies")?.split(",");

                    z.array(z.enum(["Solana", "USDC", "EURC"])).parse(currencies);

                    setAvailableCurrencies(currencies as [CURRENCY.SOLANA, CURRENCY.USDC, CURRENCY.EURC]);
                    setCurrency(currencies?.includes(CURRENCY.USDC) ? CURRENCY.USDC : (currencies![0] as CURRENCY));
                } catch (e) {
                    console.log(e);
                }
            }
        };

        getScanDetails();
    }, [searchParams, supabase]);

    const { mutateAsync: sendTransaction, error, isError, isSuccess, isPending } = useSendTransactionMutation({ setSignature });

    const checkIsInsufficientBalance = useCallback(
        (currency: CURRENCY) => {
            switch (currency) {
                case CURRENCY.SOLANA:
                    return parseFloat(solanaBalance) < parseFloat(amount);
                case CURRENCY.USDC:
                    return parseFloat(usdcBalance) < parseFloat(amount);
                case CURRENCY.EURC:
                    return parseFloat(eurcBalance) < parseFloat(amount);
                default:
                    return false;
            }
        },
        [solanaBalance, usdcBalance, eurcBalance, amount]
    );

    const isInsufficientBalance = useMemo(() => {
        return checkIsInsufficientBalance(currency);
    }, [checkIsInsufficientBalance, currency]);

    useEffect(() => {
        if (recipient.toAddress !== "" && searchParams.has("now") && searchParams.get("now") === "true" && searchParams.get("orderId")) {
            const orderId = parseInt(searchParams.get("orderId")!);

            if (!isInsufficientBalance) {
                try {
                    sendTransaction({
                        currency,
                        toAddress: recipient.toAddress,
                        amount: parseFloat(amount),
                        memo: memo !== "" ? memo : undefined,
                        orderId,
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }, [amount, currency, isInsufficientBalance, memo, recipient.toAddress, searchParams, sendTransaction]);

    return (
        <div className="flex flex-col w-full h-full items-center p-4">
            {isEmpty(recipient.toAddress) && isLoadingEurcBalance && isLoadingSolanaBalance && isLoadingUsdcBalance ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Disc3Icon className="animate-spin text-gray-400" size={24} />
                </div>
            ) : isSuccess && !isError && !error ? (
                <TransactionSuccess signature={signature} toEmail={recipient.email} amount={amount} currency={currency} />
            ) : (
                <>
                    <div className="h-fit w-full">
                        <AutoComplete
                            options={searchResults.map((result) => ({
                                label: result.email,
                                value: result.publicAddress,
                            }))}
                            inputValue={input}
                            setInputValue={setInput}
                            value={{
                                label: recipient.email,
                                value: recipient.toAddress,
                            }}
                            onValueChange={(value) => {
                                setRecipient(
                                    value.value === recipient.toAddress
                                        ? {
                                              email: "",
                                              toAddress: "",
                                          }
                                        : {
                                              email: value.label,
                                              toAddress: value.value,
                                          }
                                );
                            }}
                            emptyMessage="No results"
                            placeholder="Search user"
                            isLoading={loading}
                            disabled={isPending || (searchParams.has("email") && searchParams.get("email") !== undefined)}
                        />
                    </div>

                    {!isEmpty(recipient.toAddress) ? (
                        <div className="flex h-[80%] mt-8 w-[80vw] py-40 items-center justify-between flex-col absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-0">
                            <div className={`flex items-center w-full flex-col space-y-4 space-x-1 justify-center ${isPending && "grayscale"}`}>
                                <Input
                                    placeholder="0.00"
                                    type="number"
                                    className="h-20 min-h-20 min-w-40 max-w-full text-6xl font-bold text-center border-0 focus-visible:ring-0 focus-visible:placeholder:opacity-0 caret-slate-500"
                                    disabled={isPending || (searchParams.has("amount") && searchParams.get("amount") !== undefined)}
                                    value={amount}
                                    onKeyDown={(e) => {
                                        if (e.key === "e" || e.key === "-" || e.key === "+") {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => setAmount(e.target.value)}
                                />

                                <Select defaultValue="USDC" value={currency} onValueChange={(value: CURRENCY) => setCurrency(value)}>
                                    <ShineBorder
                                        className="text-center min-w-[60%] w-[60%] p-0 px-[3px] h-[86px] text-2xl font-bold capitalize"
                                        color={ringColor as TColorProp}
                                        borderWidth={2}
                                    >
                                        <SelectTrigger className="w-full h-20 border-0 flex flex-row justify-center items-center text-white focus:ring-0 focus:ring-offset-0 focus:border-0">
                                            <div className="w-full items-center flex px-2 justify-between">
                                                <SelectValue placeholder="Currency" />

                                                <span
                                                    className={cn(
                                                        "ml-auto text-xl",
                                                        isInsufficientBalance ? "text-red-400" : "text-muted-foreground"
                                                    )}
                                                >
                                                    {currency === "Solana"
                                                        ? solanaBalance
                                                        : currency === "USDC"
                                                        ? usdcBalance
                                                        : currency === "EURC"
                                                        ? eurcBalance
                                                        : undefined}
                                                </span>
                                            </div>
                                        </SelectTrigger>
                                    </ShineBorder>

                                    <SelectContent className="w-full" side="bottom">
                                        {availableCurrencies.map((currency) => (
                                            <SelectItem
                                                key={currency}
                                                value={currency}
                                                className="w-full min-w-[80px] px-0 flex justify-center items-center"
                                                balance={
                                                    currency === "Solana"
                                                        ? solanaBalance
                                                        : currency === "USDC"
                                                        ? usdcBalance
                                                        : currency === "EURC"
                                                        ? eurcBalance
                                                        : undefined
                                                }
                                                isInsufficientBalance={checkIsInsufficientBalance(currency)}
                                            >
                                                <>
                                                    {getIconByCurrency(currency as "Solana" | "USDC" | "EURC")} <span>{currency}</span>
                                                </>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {isInsufficientBalance ? (
                                <div className="flex flex-col justify-center items-center h-full">
                                    <span className="text-red-400 text-xl font-semibold">Insufficient balance</span>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center space-y-10">
                                    <Input
                                        placeholder="Add a note (Optional)"
                                        className="h-14 max-w-80 text-xl text-center border-0 focus-visible:ring-0 focus-visible:placeholder:opacity-0 caret-slate-500"
                                        onChange={(e) => setMemo(e.target.value)}
                                    />

                                    {recipient.toAddress && currency && (
                                        <ShineBorder
                                            className="text-center min-w-12 min-h-12 w-18 h-18 p-1"
                                            color={ringColor as TColorProp}
                                            borderWidth={4}
                                            borderRadius={100}
                                        >
                                            <Button
                                                className="size-16 rounded-full bg-background disabled:bg-background"
                                                onClick={async () => {
                                                    try {
                                                        await sendTransaction({
                                                            currency,
                                                            toAddress: recipient.toAddress,
                                                            amount: parseFloat(amount),
                                                            memo: memo !== "" ? memo : undefined,
                                                        });
                                                    } catch (e) {
                                                        console.log(e);
                                                    }
                                                }}
                                                disabled={
                                                    isPending ||
                                                    amount === "" ||
                                                    parseFloat(amount) <= 0 ||
                                                    recipient.toAddress === "" ||
                                                    isInsufficientBalance
                                                }
                                            >
                                                {isPending ? (
                                                    <Disc3Icon className="animate-spin text-gray-400" size={24} />
                                                ) : (
                                                    <ChevronRightIcon size={24} color="white" />
                                                )}
                                            </Button>
                                        </ShineBorder>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <span className="text-gray-500 line-clamp-1 w-full text-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                                Send transaction by selecting a recipient
                            </span>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
