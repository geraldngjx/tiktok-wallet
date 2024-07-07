"use client";

import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { withAuthMagic } from "@/lib/hoc/withAuth";
import { getNetworkName } from "@/lib/network";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { CopyIcon, Disc3Icon } from "lucide-react";
import Image from "next/image";
import { useMagic } from "@/providers/MagicProvider";

function Page() {
  const { toast } = useToast();
  const { magic } = useMagic();
  const { publicAddress, email } = useMagicTokenStore();

  const copy = useCallback(() => {
    if (publicAddress) {
      navigator.clipboard.writeText(publicAddress);
      toast({
        title: "Copied public address",
        style: {
          top: "50px",
        },
        duration: 2000,
      });
    }
  }, [publicAddress, toast]);

  return (
    <div className="flex flex-col space-y-4">
      <Image src="/solana.png" alt="Solana Logo" width={3840} height={2160} />

      <div className="flex w-full flex-col space-y-8 px-4">
        <div className="flex flex-col w-full space-y-1">
          <span className="font-semibold">Network status</span>

          <div className="flex items-center space-x-4">
            <span>Connected to {getNetworkName()}</span>
            <div className="bg-green-400 size-2 rounded-full animate-ping" />
          </div>
        </div>
        <div className="flex flex-col w-full space-y-1">
          <span className="font-semibold">Email</span>

          <span className="w-full break-all">
            {publicAddress?.length == 0 ? (
              <Disc3Icon
                color="white"
                className="animate-spin mt-2 stroke-1"
                size={40}
              />
            ) : (
              email
            )}
          </span>
        </div>

        <div className="flex flex-col w-full space-y-1">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Solana address</span>
            <Button
              size="icon"
              className="size-fit bg-[#0f172a] hover:bg-[#0f172a]/90"
              onClick={copy}
            >
              <CopyIcon size={14} color="white" />
            </Button>
          </div>
          <span className="w-full break-all">
            {publicAddress?.length == 0 ? (
              <Disc3Icon
                color="white"
                className="animate-spin mt-2 stroke-1"
                size={40}
              />
            ) : (
              publicAddress
            )}
          </span>
        </div>
        <Button
          variant="destructive"
          className="w-[90%] absolute bottom-20 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={async () => {
            try {
              await magic?.user.revealPrivateKey();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Reveal private key
        </Button>
      </div>
    </div>
  );
}

export default withAuthMagic(Page);
