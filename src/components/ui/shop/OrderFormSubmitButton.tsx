import { PaymentMethods } from "@/utils/enums/wallet_enums";
import { constructTransferUrl } from "@/utils/wallet";
import { Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { useContext } from "react";

interface OrderFormSubmitButton {
  itemId: number;
  itemName: string;
  itemImage: string;
  merchantEmail: string;
  totalQuantity: number;
  totalPrice: number;
  paymentMethod: PaymentMethods;
}

export default function OrderFormSubmitButton({
  itemId,
  itemName,
  itemImage,
  merchantEmail,
  totalQuantity,
  totalPrice,
  paymentMethod,
}: OrderFormSubmitButton) {
  const theme = useTheme();
  const router = useRouter();
  const supabase = useContext(SupabaseBrowserContext);

  const handleTransferRedirect = async () => {
    const currencies = [paymentMethod];
    const transferNow = true;

    // Create order entry in Supabase
    const { data, error } = await supabase
      .from("Orders")
      .insert([
        {
          item_id: itemId,
          item_name: itemName,
          item_quantity: totalQuantity,
          item_image: itemImage,
          total_price: totalPrice,
          currency: paymentMethod,
          merchant_email: merchantEmail,
          status: false,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Error creating order", error);
      return;
    }

    const transferUrl = constructTransferUrl(
      merchantEmail,
      totalPrice,
      currencies,
      transferNow,
      data.id
    );
    router.push(transferUrl);
  };

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
          onClick={handleTransferRedirect}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
