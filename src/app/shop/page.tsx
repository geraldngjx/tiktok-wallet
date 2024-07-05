"use client";

import {
  Bookmark,
  History,
  Menu,
  MessageSharp,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Grid,
  Tab,
  TextField,
} from "@mui/material";
import { Ticket } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import ShopItemPanel from "@/components/ui/shop/ShopItemPanel";
import { ShopContext } from "@/providers/ShopProvider";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { ShopItem } from "@/utils/types/shop_types";

// Constants for the layout calculations
const NAVBAR_HEIGHT = 56;
const OTHER_ELEMENTS_HEIGHT = 100;
const TAB_LABELS_HEIGHT = 80;

export default function Shop() {
  const [value, setValue] = useState("0");
  const { state, dispatch } = useContext(ShopContext);
  const supabase = useContext(SupabaseBrowserContext);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from("shopitem").select("*");
      console.log("data", data, "error", error);
      if (error) {
        console.error("Error fetching shop items:", error);
      } else {
        dispatch({ type: "SET_ITEMS", payload: data });
      }
    };

    fetchItems();
  }, [supabase, dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleItemClick = (item: ShopItem) => {
    dispatch({ type: "SELECT_ITEM", payload: item.id });
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 m-4 rounded-md border-solid items-center">
        <TextField
          id="outlined-size-small"
          placeholder="Tiktok Shop"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "red",
              },
              "&:hover fieldset": {
                borderColor: "darkred",
              },
              "&.Mui-focused fieldset": {
                borderColor: "red",
              },
            },
          }}
          className="flex-1"
          variant="outlined"
        />
        <div className="w-4">
          <ShoppingCartCheckout sx={{ color: "black" }} />
        </div>
      </div>
      <Box>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Orders" icon={<Menu />} />
          <BottomNavigationAction label="Coupons" icon={<Ticket />} />
          <BottomNavigationAction label="Messages" icon={<MessageSharp />} />
          <BottomNavigationAction label="Favorites" icon={<Bookmark />} />
          <BottomNavigationAction label="History" icon={<History />} />
        </BottomNavigation>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          height: `calc(100vh - ${NAVBAR_HEIGHT + OTHER_ELEMENTS_HEIGHT}px)`,
        }}
      >
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              TabIndicatorProps={{
                sx: {
                  backgroundColor: "black",
                },
              }}
            >
              <Tab
                label="All"
                sx={{
                  color: value === "0" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="0"
              />
              <Tab
                label="Beauty"
                sx={{
                  color: value === "1" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="1"
              />
              <Tab
                label="Toys"
                sx={{
                  color: value === "2" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="2"
              />
              <Tab
                label="Jewelry"
                sx={{
                  color: value === "3" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="3"
              />
              <Tab
                label="Food"
                sx={{
                  color: value === "4" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="4"
              />
              <Tab
                label="Household"
                sx={{
                  color: value === "5" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="5"
              />
              <Tab
                label="Entertainment"
                sx={{
                  color: value === "6" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="6"
              />
              <Tab
                label="Accessories"
                sx={{
                  color: value === "7" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="7"
              />
            </TabList>
          </Box>
          <TabPanel
            value="0"
            sx={{
              overflowY: "auto",
              height: `calc(100vh - ${
                NAVBAR_HEIGHT + OTHER_ELEMENTS_HEIGHT + TAB_LABELS_HEIGHT
              }px)`,
              // Padding from the edge of screen (align with Tiktok Shop)
              padding: 1,
            }}
          >
            {/* Spacing between ShopItem Card */}
            <Grid container spacing={1}>
              {state.items?.map((item, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                  <ShopItemPanel
                    id={item.id}
                    image={item.image}
                    price={item.price}
                    name={item.name}
                    rating={item.rating}
                    onClick={() => handleItemClick(item)}
                  />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
