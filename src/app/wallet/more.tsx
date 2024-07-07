"use client";

import Globe from "@/components/magicui/globe";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useMagic } from "@/providers/MagicProvider";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { logout } from "@/utils/common";
import { ChevronRightIcon, EllipsisIcon, LogOutIcon, ReceiptIcon, ScrollTextIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

export default function More() {
    const { token, setToken } = useMagicTokenStore();

    const { magic, connection } = useMagic();

    const disconnect = useCallback(async () => {
        if (magic) {
            await logout(setToken, magic);
        }
    }, [magic, setToken]);

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className="flex flex-col space-y-1 justify-center items-center">
                    <Button size="icon" className="rounded-full size-12 bg-[#0f172a] hover:bg-[#0f172a]/90">
                        <EllipsisIcon size={22} color="white" />
                    </Button>
                    <span className="text-sm">More</span>
                </div>
            </DrawerTrigger>

            <DrawerContent className="px-6 min-h-[60vh] bg-neutral-900 border-0">
                <DialogTitle className="hidden">More</DialogTitle>

                <div className="flex flex-col w-full space-y-2 mt-8">
                    <Link
                        href="/wallet/account"
                        className="h-12 bg-transparent flex rounded-lg items-center justify-start text-white space-x-4 w-full"
                    >
                        <WalletIcon strokeWidth={1} />
                        <span>Account details</span>

                        <ChevronRightIcon className="right-4 absolute" />
                    </Link>

                    <Separator className="bg-muted/20" />

                    <div className="h-12 bg-transparent flex rounded-lg items-center justify-start text-white space-x-4 w-full">
                        <ScrollTextIcon strokeWidth={1} />
                        <span>View statements</span>

                        <ChevronRightIcon className="right-4 absolute" />
                    </div>

                    <div className="h-12 bg-transparent flex rounded-lg items-center justify-start text-white space-x-4 w-full">
                        <ReceiptIcon strokeWidth={1} />
                        <span>Tax report</span>

                        <ChevronRightIcon className="right-4 absolute" />
                    </div>

                    <Separator className="bg-muted/20" />

                    <div
                        className="h-12 flex rounded-lg items-center justify-start text-red-600 space-x-4 w-full hover:bg-neutral-900/80"
                        onClick={disconnect}
                    >
                        <LogOutIcon strokeWidth={1} />
                        <span>Log out</span>
                    </div>
                </div>

                <p className="text-center text-slate-600 text-sm mt-8">
                    by{" "}
                    <a href="https://devpost.com/software/bytesecure" target="_blank" className="underline">
                        ByteSecure
                    </a>
                </p>

                <Globe className="top-[350px]" />
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </DrawerContent>
        </Drawer>
    );
}
