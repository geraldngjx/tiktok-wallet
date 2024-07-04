import { ShopAction, ShopState } from "@/utils/types/shop_types";
import React, { createContext, useContext, useReducer, useState } from "react";

const initialShopState: ShopState = {
  items: [],
  selectedItem: null,
};

export const ShopContext = createContext<{
  state: ShopState;
  dispatch: React.Dispatch<ShopAction>;
}>({
  state: initialShopState,
  dispatch: () => null,
});

export const shopReducer = (
  state: ShopState,
  action: ShopAction
): ShopState => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "SELECT_ITEM":
      return {
        ...state,
        selectedItem:
          state.items?.find((item) => item.id === action.payload) || null,
      };
    default:
      return state;
  }
};

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(shopReducer, initialShopState);
  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
