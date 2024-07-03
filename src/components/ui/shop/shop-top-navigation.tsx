"use client";

import { ChevronLeftIcon, SendIcon, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import {
  More,
  MoreHoriz,
  ShoppingCartCheckout,
  ShoppingCartOutlined,
} from "@mui/icons-material";

export default function ShopTopNavigation() {
  const router = useRouter();

  return (
    <div className="flex items-center w-full h-fit p-2 bg-white shadow-lg z-[999]">
      <Button variant="ghost" className="pl-2" onClick={() => router.back()}>
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" className="p-0">
          <SendIcon />
        </Button>
        <Button variant="ghost" className="p-0">
          <ShoppingCartOutlined />
        </Button>
        <Button variant="ghost" className="p-0">
          <MoreHoriz />
        </Button>
      </div>
    </div>
  );
}
