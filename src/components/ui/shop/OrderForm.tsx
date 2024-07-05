"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { ShopItem } from "@/utils/types/shop_types";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import USDCIcon from "@/assets/usdc-icon.png"; // Placeholder path; replace with actual path
import EURCIcon from "@/assets/eurc-icon.png"; // Placeholder path; replace with actual path
import SOLIcon from "@/assets/sol-icon.png"; // Placeholder path; replace with actual path

interface OrdersFormProps {
  className?: string;
  selectedItem: ShopItem;
}

const OrdersForm: React.FC<OrdersFormProps> = ({ className, selectedItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { price, name, image } = selectedItem; // Destructure selectedItem
  const shipping = 1.5;
  const totalPrice = price * quantity + shipping;

  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  }, []);

  const incrementQuantity = useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, []);

  const handlePaymentMethodChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentMethod(event.target.value);
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt="Product Image"
          width={80}
          height={80}
          className="rounded"
        />
        <div className="flex flex-col gap-2">
          <Label htmlFor="productName">{name}</Label>
          <Typography variant="body1" className="text-black-700 font-semibold">
            S${price ?? "-"}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="quantity">Quantity</Label>
        <div className="flex items-center gap-2">
          <Button onClick={decrementQuantity} disabled={quantity <= 1}>
            -
          </Button>
          <Input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="w-16 text-center"
          />
          <Button onClick={incrementQuantity}>+</Button>
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
      {/* Payment Methods Section */}
      <div className="mt-4">
        <Typography variant="h6" className="font-bold">
          Payment Methods
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Radio
                checked={paymentMethod === "USDC"}
                onChange={handlePaymentMethodChange}
                value="USDC"
              />
            }
            label={
              <div className="flex items-center gap-2">
                <Image src={USDCIcon} alt="USDC" width={24} height={24} />
                <span>USDC</span>
              </div>
            }
          />
          <FormControlLabel
            control={
              <Radio
                checked={paymentMethod === "EURC"}
                onChange={handlePaymentMethodChange}
                value="EURC"
              />
            }
            label={
              <div className="flex items-center gap-2">
                <Image src={EURCIcon} alt="EURC" width={24} height={24} />
                <span>EURC</span>
              </div>
            }
          />
          <FormControlLabel
            control={
              <Radio
                checked={paymentMethod === "SOL"}
                onChange={handlePaymentMethodChange}
                value="SOL"
              />
            }
            label={
              <div className="flex items-center gap-2">
                <Image src={SOLIcon} alt="SOL" width={24} height={24} />
                <span>SOL</span>
              </div>
            }
          />
        </FormGroup>
      </div>

      <Button
        type="submit"
        className="bg-red-500 text-white hover:bg-red-600 mt-4"
      >
        Place Order
      </Button>
    </form>
  );
};

export default OrdersForm;
