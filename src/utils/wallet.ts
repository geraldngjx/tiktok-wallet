import { PaymentMethods } from "@/utils/enums/wallet_enums";
import { CurrencyExchange } from "@mui/icons-material";

// Can include other local currencies in future
export function getTotalAmountInCurrencyFromSGD(amount: number, currency: PaymentMethods) {
    // Pull from exchange?
    const exchangeRatesFromSGD: Record<string, number> = {
        USDC: 0.7415573694133842,
        EURC: 0.6856426662239425,
        SOL: 0.005487115400853194,
      };

    switch (currency) {
        case PaymentMethods.USDC:
            // To be discussed with Zihao
            return (amount * exchangeRatesFromSGD[PaymentMethods.USDC]);
        case PaymentMethods.EURC:
            return (amount * exchangeRatesFromSGD[PaymentMethods.EURC]);
        case PaymentMethods.SOL:
            return (amount * exchangeRatesFromSGD[PaymentMethods.SOL]);
    }
}

export function getTotalPrice(price: number, quantity: number, shipping: number) {
    return price * quantity + shipping;
}

export function constructTransferUrl(email: string, amount: number, currencies: string[], transferNow: boolean, orderId: number): string {
    const urlParams = new URLSearchParams();

    urlParams.set("email", email);
    urlParams.set("amount", amount.toString());
    urlParams.set("currencies", currencies.join(","));
    urlParams.set("now", transferNow.toString());
    urlParams.set("orderId", orderId.toString());

    return `/wallet/transfer?${urlParams.toString()}`.replaceAll("+", "%2B");
}