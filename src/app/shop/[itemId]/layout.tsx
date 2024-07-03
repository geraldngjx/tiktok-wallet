import ShopBottomNavigation from "@/components/ui/shop/shop-bottom-navigation";
import ShopTopNavigation from "@/components/ui/shop/shop-top-navigation";
import { ReactNode } from "react";

export default function ShopItemLayout({ children }: { children: ReactNode }) {
  return (
    // Use h-screen here because shop layout already factor in navbar height
    <div className="flex flex-col w-full h-screen">
      <ShopTopNavigation />
      {children}
      <ShopBottomNavigation />
    </div>
  );
}
