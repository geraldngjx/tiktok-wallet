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
import { useState } from "react";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import ShopItem from "@/components/ui/shop/ShopItem";

// Constants for the layout calculations
const NAVBAR_HEIGHT = 56;
const OTHER_ELEMENTS_HEIGHT = 100;
const TAB_LABELS_HEIGHT = 80;

const images = [
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
];

const mockShopItems = images.slice(0, 10).map((image, index) => ({
  image: image,
  price: `$${(index + 1) * 10}.99`,
  name: `5ML Mini Bottle Refillable Perfume Spray With Spray Scent Pump Empty Cosmetic Containers ${
    index + 1
  }`,
  rating: 4.0 + (index % 2) * 0.5,
  deals: `${(index + 1) * 10}% off when you buy 2 or more!`,
  description: `This is a description for item ${index + 1}.`,
  reviews: [
    {
      icon: "mdi:star",
      rating: 5,
      description: "Excellent product! Worth every penny.",
    },
    {
      icon: "mdi:star",
      rating: 4,
      description: "Good quality but a bit expensive.",
    },
    {
      icon: "mdi:star",
      rating: 4,
      description: "Great value for money.",
    },
  ],
  id: index.toString(), // Unique id for each item
}));

export default function Shop() {
  const [value, setValue] = useState("0");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 m-4 rounded-md border-solid items-center">
        <TextField
          id="outlined-size-small"
          placeholder="Tiktok Shop"
          size="small"
          className="flex-1"
        />
        <div className="w-4">
          <ShoppingCartCheckout />
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
              {mockShopItems.map((item, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                  <ShopItem
                    id={item.id}
                    image={item.image}
                    price={item.price}
                    name={item.name}
                    rating={item.rating}
                    deals={item.deals}
                    description={item.description}
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
