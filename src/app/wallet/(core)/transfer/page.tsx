"use client";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { useEffect, useState } from "react";
import Login from "@/app/wallet/login/login";
import Transfer from "./transfer-page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function WalletTransferRoute() {
  const { token, setToken } = useMagicTokenStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [storedQueryParams, setStoredQueryParams] =
    useState<URLSearchParams | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token") ?? "";
    if (token !== localToken) {
      setToken(localToken);
    }
  }, [token, setToken]);

  useEffect(() => {
    if (!token) {
      // Save query parameters when the user is not authenticated
      const params = new URLSearchParams(searchParams.toString());
      setStoredQueryParams(params);
    } else if (storedQueryParams) {
      // Restore query parameters when the user is authenticated
      const newUrl = `${pathname}?${storedQueryParams.toString()}`;
      router.replace(newUrl);
      setStoredQueryParams(null); // Clear stored params after restoring
    }
  }, [token, pathname, router, searchParams, storedQueryParams]);

  return (
    <div
      className="h-full flex w-full items-center justify-center bg-[#010101] overflow-hidden"
      vaul-drawer-wrapper=""
    >
      {process.env.NEXT_PUBLIC_MAGIC_API_KEY ? (
        token.length > 0 ? (
          <Transfer />
        ) : (
          <Login />
        )
      ) : (
        <div>Missing Magic API Key</div>
      )}
    </div>
  );
}
