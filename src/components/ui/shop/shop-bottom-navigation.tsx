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

const ShopBottomNavigation = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const theme = useTheme(); // Get current theme

  return (
    // Fixed h-14 height to match the bottom navigation height
    <div
      className="fixed bottom-0 left-0 w-full h-14 p-2 shadow-lg z-[999] flex items-center"
      style={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "white",
        color:
          theme.palette.mode === "dark" ? theme.palette.text.primary : "black",
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

      {/* Dialog for Desktop */}
      {isDesktop && (
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
            <OrdersForm />
          </DialogContent>
        </Dialog>
      )}

      {/* Drawer for Mobile */}
      {!isDesktop && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent
            style={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            <DrawerHeader className="text-left">
              <DrawerTitle style={{ color: theme.palette.text.primary }}>
                Order Details
              </DrawerTitle>
              <DrawerDescription
                style={{ color: theme.palette.text.secondary }}
              >
                Review your order details and proceed with the purchase.
              </DrawerDescription>
            </DrawerHeader>
            <OrdersForm className="px-4" />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  style={{
                    borderColor: theme.palette.text.primary,
                    color: theme.palette.text.primary,
                  }}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default ShopBottomNavigation;
