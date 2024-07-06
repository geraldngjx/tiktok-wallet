import { PaymentMethods } from "../enums/wallet_enums";

export interface ShopItem {
  id: number;
  image: string;
  price: number;
  name: string;
  rating: number;
  deals: ShopItemDeal[];
  description: string;
}

export interface ShopState {
  items: ShopItem[];
  selectedItem: ShopItem | null;
}

export type ShopAction =
  | { type: "SET_ITEMS"; payload: ShopItem[] }
  // String is the id of the selected item
  | { type: "SELECT_ITEM"; payload: string };

export interface ShopItemDeal {
  description: string;
}

export interface Order {
  id: number;
  itemName: string;
  itemQuantity: number;
  itemImage: string;
  totalPrice: number;
  currency: PaymentMethods;
  merchantEmail: string;
  status: boolean;
  createdAt?: string;
}

export interface SupabaseOrder {
    id: number;
    item_id: number;
    item_name: string;
    item_quantity: number;
    item_image: string;
    total_price: number;
    currency: PaymentMethods;
    merchant_email: string;
    status: boolean;
    created_at: string;
}
