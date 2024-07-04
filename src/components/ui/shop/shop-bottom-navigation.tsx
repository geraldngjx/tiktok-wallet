"use client";

import { useState } from "react";
import { Button } from "../button";
import { ChatBubbleOutline, Storefront } from "@mui/icons-material";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { cn } from "@/lib/utils";
import { Label } from "../label";
import { Input } from "../input";
import Image from "next/image";

const ShopBottomNavigation = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="fixed bottom-0 left-0 w-full h-14 p-2 bg-white shadow-lg z-[999] flex items-center">
      {/* Icons on the left */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="p-0">
          <Storefront />
        </Button>
        <Button variant="ghost" className="p-0">
          <ChatBubbleOutline />
        </Button>
      </div>

      {/* Full-width Buy Now Button */}
      <div className="flex-grow items-center w-full ml-4">
        <Button
          variant="outline"
          className="w-full text-center border-red-500 text-red-500 hover:bg-red-50"
          onClick={() => setOpen(true)}
        >
          Buy Now
        </Button>
      </div>

      {/* Dialog for Desktop */}
      {isDesktop && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
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
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Order Details</DrawerTitle>
              <DrawerDescription>
                Review your order details and proceed with the purchase.
              </DrawerDescription>
            </DrawerHeader>
            <OrdersForm className="px-4" />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

const OrdersForm = ({ className }: React.ComponentProps<"form">) => {
  const [quantity, setQuantity] = useState(1);
  const price = 100; // Example price
  const shipping = 1.5;
  const totalPrice = price * quantity + shipping;

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="flex items-center gap-4">
        <Image
          src="/path-to-image.jpg" // Replace with your image path
          alt="Product Image"
          width={80}
          height={80}
          className="rounded"
        />
        <div className="flex flex-col gap-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            type="text"
            id="productName"
            defaultValue="Sample Product"
            disabled
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="quantity">Quantity</Label>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 text-center"
          />
          <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label>Subtotal</Label>
        <span>${price * quantity}</span>
      </div>
      <div className="flex items-center justify-between">
        <Label>Shipping</Label>
        <span>${shipping}</span>
      </div>
      <div className="flex items-center justify-between font-bold">
        <Label>Total</Label>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
        Place Order
      </Button>
    </form>
  );
};

export default ShopBottomNavigation;
