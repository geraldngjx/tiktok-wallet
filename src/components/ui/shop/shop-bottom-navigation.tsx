"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatBubbleOutline, Storefront } from "@mui/icons-material";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import OrdersForm from "@/components/ui/shop/OrderForm";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ShopItem } from "@/utils/types/shop_types";
import { Typography } from "@mui/material";
import { PaymentMethods } from "@/utils/enums/wallet_enums";

interface ShopBottomNavigationProps {
  selectedItem: ShopItem | null;
}

const ShopBottomNavigation: React.FC<ShopBottomNavigationProps> = ({
  selectedItem,
}) => {
  const [open, setOpen] = useState(false);
  const [quantitySelected, setQuantitySelected] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number | undefined>(
    selectedItem?.price
  );
  const [selectedCurrency, setSelectedCurrency] = useState<PaymentMethods>(
    PaymentMethods.USDC
  ); // Default to USDC
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const theme = useTheme();

  const bottomNavbarHeight = 56; // Height of the bottom navbar

  return (
    <div>
      {!open && (
        <div
          className="fixed bottom-0 left-0 w-full h-14 p-2 shadow-lg z-[999] flex items-center border-t border-gray-300"
          style={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "white",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : "black",
          }}
        >
          {/* Icons on the left */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="p-0"
              style={{ color: theme.palette.text.primary }}
            >
              <Storefront />
            </Button>
            <Button
              variant="ghost"
              className="p-0"
              style={{ color: theme.palette.text.primary }}
            >
              <ChatBubbleOutline />
            </Button>
          </div>

          {/* Full-width Buy Now Button */}
          <div className="flex-grow items-center w-full ml-4">
            <Button
              variant="outline"
              className="w-full text-center"
              style={{
                borderColor: theme.palette.error.main,
                color: theme.palette.error.main,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : "white",
              }}
              onClick={() => setOpen(true)}
            >
              Buy Now
            </Button>
          </div>
        </div>
      )}

      {/* Dialog for Desktop */}
      {isDesktop && selectedItem && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="sm:max-w-[425px]"
            style={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: theme.palette.text.primary }}>
                Order Details
              </DialogTitle>
              <DialogDescription
                style={{ color: theme.palette.text.secondary }}
              >
                Review your order details and proceed with the purchase.
              </DialogDescription>
            </DialogHeader>
            <OrdersForm selectedItem={selectedItem} />
          </DialogContent>
        </Dialog>
      )}

      {/* Drawer for Mobile */}
      {!isDesktop && selectedItem && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent
            style={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              paddingBottom: `${bottomNavbarHeight}px`, // Adjust the drawer content height to account for the bottom navbar
            }}
          >
            <DrawerHeader className="text-left">
              <DrawerTitle style={{ color: theme.palette.text.primary }}>
                Order Summary
              </DrawerTitle>
              <DrawerDescription
                style={{ color: theme.palette.text.secondary }}
              >
                Review your order details and proceed with the purchase.
              </DrawerDescription>
            </DrawerHeader>
            <OrdersForm className="px-4" selectedItem={selectedItem} />
            <DrawerFooter className="pt-8"></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default ShopBottomNavigation;
