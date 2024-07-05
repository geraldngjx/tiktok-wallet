"use client";

import { useMagic } from "@/providers/MagicProvider";

export default function useMagicUserQuery() {
    const { magic } = useMagic();

    return {
        queryKey: ["useMagicUserQuery"],
        queryFn: async () => {
            const metadata = await magic?.user.getInfo();

            return metadata;
        },
    };
}
