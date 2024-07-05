"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { ShopItem } from "@/utils/types/shop_types";
import Typography from "@mui/material/Typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentMethods } from "@/utils/enums/wallet_enums";
import { getTotalAmountInCurrencyFromSGD, getTotalPrice } from "@/utils/wallet";
import OrderFormSubmitButton from "@/components/ui/shop/OrderFormSubmitButton";

interface OrdersFormProps {
  className?: string;
  selectedItem: ShopItem;
}

const SHIPPING_COST = 1.5;

const OrdersForm: React.FC<OrdersFormProps> = ({ className, selectedItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.USDC
  );
  const { price, name, image } = selectedItem;

  const totalPriceInSGD = getTotalPrice(price, quantity, SHIPPING_COST);

  const totalPriceInPaymentMethodCurrency = getTotalAmountInCurrencyFromSGD(
    totalPriceInSGD,
    paymentMethod
  );

  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  }, []);

  const incrementQuantity = useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, []);

  const handlePaymentMethodChange = useCallback((value: PaymentMethods) => {
    setPaymentMethod(value);
  }, []);

  return (
    <div className={cn("grid items-start gap-4", className)}>
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
        <span>S${price * quantity}</span>
      </div>
      <div className="flex items-center justify-between">
        <Label>Shipping</Label>
        <span>S${SHIPPING_COST}</span>
      </div>
      <div className="flex items-center justify-between font-bold">
        <Label>Total (SGD)</Label>
        <span>S${totalPriceInSGD.toFixed(2)}</span>
      </div>

      {/* Payment Methods Section */}
      <div className="mt-4">
        <Typography variant="body1" className="font-bold">
          Payment Method
        </Typography>
        <RadioGroup
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
          className="flex flex-col gap-2 mt-2"
        >
          <div className="flex items-center gap-2">
            <Label
              htmlFor="USDC"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image src="/usdc.png" alt="USDC" width={24} height={24} />
              USDC
            </Label>
            <RadioGroupItem
              value={PaymentMethods.USDC}
              id="USDC"
              className={cn(
                "w-4 h-4 border dark:border-gray-600 ml-auto",
                paymentMethod === PaymentMethods.USDC
                  ? "bg-blue-500"
                  : "bg-gray-300"
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Label
              htmlFor="EURC"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image src="/eurc.png" alt="EURC" width={24} height={24} />
              EURC
            </Label>
            <RadioGroupItem
              value={PaymentMethods.EURC}
              id="EURC"
              className={cn(
                "w-4 h-4 border dark:border-gray-600 ml-auto",
                paymentMethod === PaymentMethods.EURC
                  ? "bg-blue-500"
                  : "bg-gray-300"
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Label
              htmlFor="SOL"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src="/solana_payment.png"
                alt="SOL"
                width={24}
                height={24}
              />
              SOL
            </Label>
            <RadioGroupItem
              value={PaymentMethods.SOL}
              id="SOL"
              className={cn(
                "w-4 h-4 border dark:border-gray-600 ml-auto",
                paymentMethod === PaymentMethods.SOL
                  ? "bg-blue-500"
                  : "bg-gray-300"
              )}
            />
          </div>
        </RadioGroup>
        <OrderFormSubmitButton
          totalQuantity={quantity}
          totalPrice={totalPriceInPaymentMethodCurrency}
          paymentMethod={paymentMethod}
        />
      </div>
    </div>
  );
};

export default OrdersForm;
