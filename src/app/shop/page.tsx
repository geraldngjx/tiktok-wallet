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
import { useContext, useState } from "react";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import ShopItemPanel from "@/components/ui/shop/ShopItemPanel";
import { ShopContext } from "@/providers/ShopProvider";
import { ShopItem } from "@/utils/types/shop_types";
import Link from "next/link";
import { AnimatedList } from "@/components/magicui/animated-list";

// Constants for the layout calculations
const NAVBAR_HEIGHT = 56;
const OTHER_ELEMENTS_HEIGHT = 100;
const TAB_LABELS_HEIGHT = 80;

export default function Shop() {
  const [value, setValue] = useState("all");
  const { state } = useContext(ShopContext);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleItemClick = (item: ShopItem) => {
    console.log("Selected item:", item);
  };

  const renderShopItems = (items: ShopItem[]) => (
    <Grid container spacing={1}>
      {items.map((item, index) => (
        <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
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
  );

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
          <BottomNavigationAction
            component={Link}
            href="/shop/orders"
            label="Orders"
            icon={<Menu />}
          />
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
                  color: value === "all" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="all"
              />
              <Tab
                label="Beauty"
                sx={{
                  color: value === "beauty" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="beauty"
              />
              <Tab
                label="Household"
                sx={{
                  color: value === "household" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="household"
              />
              <Tab
                label="Electronics"
                sx={{
                  color: value === "electronics" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="electronics"
              />
              <Tab
                label="Accessories"
                sx={{
                  color: value === "accessories" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="accessories"
              />
              <Tab
                label="Entertainment"
                sx={{
                  color: value === "entertainment" ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="entertainment"
              />
            </TabList>
          </Box>
          <TabPanel
            value="all"
            sx={{
              overflowY: "auto",
              height: `calc(100vh - ${
                NAVBAR_HEIGHT + OTHER_ELEMENTS_HEIGHT + TAB_LABELS_HEIGHT
              }px)`,
              padding: 1,
            }}
          >
            {renderShopItems(state.all)}
          </TabPanel>
          <TabPanel
            value="beauty"
            sx={{
              overflowY: "auto",
              height: `calc(100vh - ${
                NAVBAR_HEIGHT + OTHER_ELEMENTS_HEIGHT + TAB_LABELS_HEIGHT
              }px)`,
              padding: 1,
            }}
          >
            {renderShopItems(state.beauty)}
          </TabPanel>
          <TabPanel
            value="household"
            sx={{
              overflowY: "auto",
              height: `calc(100vh - ${
                NAVBAR_HEIGHT + OTHER_ELEMENTS_HEIGHT + TAB_LABELS_HEIGHT
              }px)`,
              padding: 1,
            }}
          >
            {renderShopItems(state.household)}
          </TabPanel>
          <TabPanel
            value="electronics"
            sx={{
              overflowY: "auto",
              height: `calc(100vh - ${
                NAVBAR_HEIGHT + OTHER_ELEMENTS_HEIGHT + TAB_LABELS_HEIGHT
              }px)`,
              padding: 1,
            }}
          >
            {renderShopItems(state.electronics)}
          </TabPanel>
          <TabPanel
            value="accessories"
            sx={{
              overflowY: "auto",
              height: `calc(100vh - ${
                NAVBAR_HEIGHT + OTHER_ELEMENTS_HEIGHT + TAB_LABELS_HEIGHT
              }px)`,
              padding: 1,
            }}
          >
            {renderShopItems(state.accessories)}
          </TabPanel>
          <TabPanel
            value="entertainment"
            sx={{
              overflowY: "auto",
              height: `calc(100vh - ${
                NAVBAR_HEIGHT + OTHER_ELEMENTS_HEIGHT + TAB_LABELS_HEIGHT
              }px)`,
              padding: 1,
            }}
          >
            {renderShopItems(state.entertainment)}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
