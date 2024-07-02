"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function TopNavigation() {
    const router = useRouter();

    return (
        <div className="flex items-center w-full h-fit p-2 bg-transparent">
            <Button variant="ghost" className="pl-2" onClick={() => router.back()}>
                <ChevronLeftIcon />
                <span>Back</span>
            </Button>
        </div>
    );
}
