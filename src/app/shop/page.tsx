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
  Card,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Ticket } from "lucide-react";
import { useState } from "react";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

export default function Shop() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 m-4 rounded-md border-solid items-center">
        {/* Can use Aceternity UI "Placeholder and Vanish Input" */}
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
      <Box>
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
                  color: value === 0 ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="0"
              />
              <Tab
                label="Beauty"
                sx={{
                  color: value === 1 ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="1"
              />
              <Tab
                label="Toys"
                sx={{
                  color: value === 2 ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="2"
              />
              <Tab
                label="Jewelry"
                sx={{
                  color: value === 3 ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="3"
              />
              <Tab
                label="Food"
                sx={{
                  color: value === 4 ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="4"
              />
              <Tab
                label="Household"
                sx={{
                  color: value === 5 ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="5"
              />
              <Tab
                label="Entertainment"
                sx={{
                  color: value === 6 ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="6"
              />
              <Tab
                label="Accessories"
                sx={{
                  color: value === 7 ? "black" : "grey",
                  "&.Mui-selected": { color: "black" },
                }}
                value="7"
              />
            </TabList>
          </Box>
          <TabPanel value="0">Item Zero</TabPanel>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
