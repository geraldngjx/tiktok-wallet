import { Typography, useTheme } from "@mui/material";
import React from "react";
import { Button } from "../button";
import { PaymentMethods } from "@/utils/enums/wallet_enums";

interface OrderFormSubmitButton {
  totalQuantity: number;
  totalPrice: number;
  paymentMethod: PaymentMethods;
}

export default function OrderFormSubmitButton({
  totalQuantity,
  totalPrice,
  paymentMethod,
}: OrderFormSubmitButton) {
  const theme = useTheme();
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-24 p-2 shadow-lg z-[999] flex items-center border-t border-gray-300"
      style={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "white",
        color:
          theme.palette.mode === "dark" ? theme.palette.text.primary : "black",
      }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2">
          <Typography variant="body1" fontWeight={700}>
            Total ({totalQuantity} {totalQuantity > 1 ? "items" : "item"}):
          </Typography>
          <Typography className="ml-auto" variant="body1" fontWeight={700}>
            {paymentMethod == PaymentMethods.SOL
              ? totalPrice.toFixed(4)
              : totalPrice.toFixed(2)}{" "}
            {paymentMethod}
          </Typography>
        </div>
        <Button
          type="submit"
          className="w-full bg-red-500 text-white hover:bg-red-600"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}