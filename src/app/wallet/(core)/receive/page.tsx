"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { withAuthMagic } from "@/lib/hoc/withAuth";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import QRCode from "react-qr-code";
import ShineBorder from "@/components/magicui/shine-border";
import { getIconByCurrency } from "@/utils/currencyIcon";
import { isEmpty } from "lodash";
import { useQuery } from "@tanstack/react-query";
import useMagicUserQuery from "@/app/hooks/useMagicUserQuery";
import { Disc3Icon } from "lucide-react";
import dayjs from "dayjs";

function Page() {
    const [open, setOpen] = useState(false);

    const { data: magicUser, status } = useQuery({
        ...useMagicUserQuery(),
        staleTime: 0,
    });

    const [time, setTime] = useState(dayjs());

    const [amount, setAmount] = useState("");
    const [acceptedCurrencies, setAcceptedCurrencies] = useState(["Solana", "EURC", "USDC"]);

    const [qrCodeValue, setQrCodeValue] = useState("");

    useEffect(() => {
        if (status === "success" && magicUser) {
            setQrCodeValue(encodeURIComponent(`byteSecure=true&email=${magicUser.email}&time=${new Date().getTime()}`.replaceAll("+", "%2B")));

            setTime(dayjs());
        }
    }, [magicUser, status]);

    return (
        <div className="flex flex-col w-full h-full space-y-32 justify-center items-center p-4" vaul-drawer-wrapper="">
            {status !== "success" ? (
                <Disc3Icon className="animate-spin w-10 h-10" />
            ) : (
                <>
                    <ShineBorder
                        className="text-center min-w-10 min-h-10 size-52 p-2"
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                        borderWidth={4}
                        borderRadius={2}
                    >
                        <QRCode style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={qrCodeValue} viewBox={`0 0 256 256`} />
                    </ShineBorder>

                    <p className="text-center text-slate-700">
                        This QR code is valid until {time.add(10, "minute").format("DD MMM YYYY, H:mm:ss A")}
                    </p>

                    <Drawer
                        open={open}
                        onOpenChange={(open) => {
                            if (!open) {
                                setAmount("");
                                setAcceptedCurrencies(["Solana", "EURC", "USDC"]);
                            }
                            setOpen(open);
                        }}
                    >
                        <DrawerTrigger asChild>
                            <Button className="rounded-full">Request payment</Button>
                        </DrawerTrigger>

                        <DrawerContent className="px-6 h-fit min-h-[40vh] bg-neutral-900 border-0">
                            <DialogTitle className="hidden">Configure</DialogTitle>
                            <DialogDescription className="hidden" />

                            <div className="flex w-full h-[50vh] flex-col justify-between items-center px-20 py-10">
                                <div className="space-y-2">
                                    <Label className="text-lg ml-1 font-medium text-slate-500">Accepted currencies:</Label>
                                    <ToggleGroup
                                        type="multiple"
                                        className="space-x-2"
                                        defaultValue={["Solana", "EURC", "USDC"]}
                                        value={acceptedCurrencies}
                                        onValueChange={(values) => setAcceptedCurrencies(values)}
                                    >
                                        <ToggleGroupItem className="rounded-full pl-1 pr-2" value="Solana">
                                            {getIconByCurrency("Solana")}Solana
                                        </ToggleGroupItem>
                                        <ToggleGroupItem className="rounded-full pl-0 pr-2" value="USDC">
                                            {getIconByCurrency("USDC")}USDC
                                        </ToggleGroupItem>
                                        <ToggleGroupItem className="rounded-full pl-0 pr-2" value="EURC">
                                            {getIconByCurrency("EURC")}EURC
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                </div>

                                <Input
                                    placeholder="0.00"
                                    type="number"
                                    className="h-14 w-40 text-6xl font-bold text-center border-0 focus-visible:ring-0 focus-visible:placeholder:opacity-0 caret-slate-500 px-0"
                                    onChange={(e) => setAmount(e.target.value)}
                                />

                                <Button
                                    className="rounded-full w-full"
                                    disabled={amount === "" || isEmpty(acceptedCurrencies)}
                                    onClick={() => {
                                        setOpen(false);
                                        setTime(dayjs());
                                        setQrCodeValue(
                                            encodeURIComponent(
                                                `byteSecure=true&email=${magicUser?.email}&amount=${amount}&currencies=${acceptedCurrencies.join(
                                                    ","
                                                )}&time=${new Date().getTime()}`.replaceAll("+", "%2B")
                                            )
                                        );
                                    }}
                                >
                                    Regenerate QR code
                                </Button>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </>
            )}
        </div>
    );
}

export default withAuthMagic(Page);
