import { PaymentMethods } from "@/utils/enums/wallet_enums";
import { CurrencyExchange } from "@mui/icons-material";

// Can include other local currencies in future
export function getTotalAmountInCurrencyFromSGD(
  amount: number,
  currency: PaymentMethods
) {
  // Pull from exchange?
  const exchangeRatesFromSGD: Record<PaymentMethods, number> = {
    USDC: 0.7415573694133842,
    EURC: 0.6856426662239425,
    Solana: 0.005487115400853194,
  };

  switch (currency) {
    case PaymentMethods.USDC:
      // To be discussed with Zihao
      return parseFloat(
        (amount * exchangeRatesFromSGD[PaymentMethods.USDC]).toFixed(2)
      );
    case PaymentMethods.EURC:
      return parseFloat(
        (amount * exchangeRatesFromSGD[PaymentMethods.EURC]).toFixed(2)
      );
    case PaymentMethods.SOL:
      return parseFloat(
        (amount * exchangeRatesFromSGD[PaymentMethods.SOL]).toFixed(4)
      );
  }
}

export function getTotalPrice(
  price: number,
  quantity: number,
  shipping: number
) {
  return price * quantity + shipping;
}

export function constructTransferUrl(
  email: string,
  amount: number,
  currencies: string[],
  transferNow: boolean,
  orderId: number,
): string {
  const urlParams = new URLSearchParams();

  urlParams.set("email", email);
  urlParams.set("amount", amount.toString());
  urlParams.set("currencies", currencies.join(","));
  urlParams.set("now", transferNow.toString());
  urlParams.set("orderId", orderId.toString());
  urlParams.set("memo", "Payment for order #" + orderId.toString());

  return `/wallet/transfer?${urlParams.toString()}`.replaceAll("+", "%2B");
}
