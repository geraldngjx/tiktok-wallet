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