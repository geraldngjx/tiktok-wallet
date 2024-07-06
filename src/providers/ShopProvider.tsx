import {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { ShopItem, Order, SupabaseOrder } from "@/utils/types/shop_types";

interface ShopState {
  all: ShopItem[];
  beauty: ShopItem[];
  household: ShopItem[];
  electronics: ShopItem[];
  accessories: ShopItem[];
  entertainment: ShopItem[];
  orders: SupabaseOrder[];
}

const initialState: ShopState = {
  all: [],
  beauty: [],
  household: [],
  electronics: [],
  accessories: [],
  entertainment: [],
  orders: [],
};

const shopReducer = (state: ShopState, action: any): ShopState => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        all: action.payload.all,
        beauty: action.payload.beauty,
        household: action.payload.household,
        electronics: action.payload.electronics,
        accessories: action.payload.accessories,
        entertainment: action.payload.entertainment,
      };
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};

export const ShopContext = createContext<{
  state: ShopState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const supabase = useContext(SupabaseBrowserContext);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from("shopitem").select("*");
      if (error) {
        console.error("Error fetching shop items:", error);
      } else {
        const categories = {
          all: data,
          beauty: data.filter((item: ShopItem) => item.category === "beauty"),
          household: data.filter(
            (item: ShopItem) => item.category === "household"
          ),
          electronics: data.filter(
            (item: ShopItem) => item.category === "electronics"
          ),
          accessories: data.filter(
            (item: ShopItem) => item.category === "accessories"
          ),
          entertainment: data.filter(
            (item: ShopItem) => item.category === "entertainment"
          ),
        };
        dispatch({ type: "SET_ITEMS", payload: categories });
      }
    };

    const fetchOrders = async () => {
      const { data, error } = await supabase.from("Orders").select("*");
      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        dispatch({ type: "SET_ORDERS", payload: data });
      }
    };

    fetchItems();
    fetchOrders();
  }, [supabase]);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};
