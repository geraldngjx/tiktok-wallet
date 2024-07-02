import Meteors from "@/components/magicui/meteors";
import Ripple from "@/components/magicui/ripple";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import {
  BellIcon,
  ChevronRightIcon,
  EllipsisIcon,
  MoveDownLeftIcon,
  MoveUpRightIcon,
  ScanLineIcon,
  ScrollTextIcon,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";

export default function Core() {
  return (
    <section className="h-[35%] flex flex-col p-4">
      {/* <Ripple /> */}

      <Meteors />

      <div className="z-50">
        <div className="w-full flex justify-end">
          <Button size="icon" className="rounded-full size-12 ">
            <BellIcon size={22} />
          </Button>
        </div>

        <div className="text-white w-full flex flex-col h-full justify-center items-center px-4 space-y-8">
          <div className="flex flex-col space-y-2 justify-center items-center">
            <h1>Your balance</h1>
            <span className="text-5xl font-semibold">0.00 SOL</span>
          </div>

          <div className="flex items-center justify-center space-x-6 w-full">
            <div className="flex flex-col space-y-1 justify-center items-center">
              <Button size="icon" className="rounded-full size-12">
                <ScanLineIcon size={22} />
              </Button>
              <span className="text-sm">Scan</span>
            </div>

            <Link
              href="/wallet/transfer"
              className="flex flex-col space-y-1 justify-center items-center"
            >
              <Button size="icon" className="rounded-full size-12">
                <MoveUpRightIcon size={22} />
              </Button>
              <span className="text-sm">Send</span>
            </Link>

            <Link
              href="/wallet/topup"
              className="flex flex-col space-y-1 justify-center items-center"
            >
              <Button size="icon" className="rounded-full size-12">
                <MoveDownLeftIcon size={22} />
              </Button>
              <span className="text-sm">Receive</span>
            </Link>

            <Drawer>
              <DrawerTrigger className="flex flex-col space-y-1 justify-center items-center">
                <Button size="icon" className="rounded-full size-12">
                  <EllipsisIcon size={22} />
                </Button>
                <span className="text-sm">More</span>
              </DrawerTrigger>

              <DrawerContent className="px-4 min-h-[50vh] bg-neutral-900 border-0">
                <div className="flex flex-col w-full space-y-2 mt-8">
                  <div className="h-12 bg-transparent flex rounded-lg items-center justify-start text-white space-x-4 w-full">
                    <WalletIcon strokeWidth={1} />
                    <span>Account details</span>

                    <ChevronRightIcon className="right-4 absolute" />
                  </div>

                  <Separator className="bg-muted/20" />

                  <div className="h-12 bg-transparent flex rounded-lg items-center justify-start text-white space-x-4 w-full">
                    <ScrollTextIcon strokeWidth={1} />
                    <span>View statements</span>

                    <ChevronRightIcon className="right-4 absolute" />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </section>
  );
}
