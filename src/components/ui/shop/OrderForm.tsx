"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const OrdersForm = ({ className }: React.ComponentProps<"form">) => {
  const [quantity, setQuantity] = useState(1);
  const price = 100; // Example price
  const shipping = 1.5;
  const totalPrice = price * quantity + shipping;

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="flex items-center gap-4">
        <Image
          src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80" // Replace with your image path
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
            // onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Input
            type="number"
            id="quantity"
            value={quantity}
            // onChange={(e) => setQuantity(Number(e.target.value))}
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

export default OrdersForm;
