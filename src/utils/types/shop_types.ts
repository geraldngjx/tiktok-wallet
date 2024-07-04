export interface ShopItem {
    id: string;
    image: string;
    price: string;
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