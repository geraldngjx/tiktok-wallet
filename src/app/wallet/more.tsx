"use client";

import Globe from "@/components/magicui/globe";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useMagic } from "@/providers/MagicProvider";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { logout } from "@/utils/common";
import { ChevronRightIcon, EllipsisIcon, LogOutIcon, ScrollTextIcon, WalletIcon } from "lucide-react";
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
            <DrawerTrigger className="flex flex-col space-y-1 justify-center items-center">
                <Button size="icon" className="rounded-full size-12">
                    <EllipsisIcon size={22} />
                </Button>
                <span className="text-sm">More</span>
            </DrawerTrigger>

            <DrawerContent className="px-6 min-h-[50vh] bg-neutral-900 border-0">
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

                    <Separator className="bg-muted/20" />

                    <div
                        className="h-12 bg-transparent flex rounded-lg items-center justify-start text-destructive space-x-4 w-full"
                        onClick={disconnect}
                    >
                        <LogOutIcon strokeWidth={1} />
                        <span>Log out</span>
                    </div>
                </div>

                <Globe className="top-64" />
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </DrawerContent>
        </Drawer>
    );
}
