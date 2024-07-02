"use client";

import CustomVideoIcon from "@/components/ui/bottomNavigation/customVideoIcon";
import { PersonOutline } from "@mui/icons-material";
import Home from "@mui/icons-material/Home";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import Wallet from "@mui/icons-material/Wallet";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";

const BOTTOM_NAVBAR_HEIGHT = "56px"; // Adjust to match the height of BottomNavigation

export default function BottomNavbar() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
        backgroundColor: "black",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: BOTTOM_NAVBAR_HEIGHT,
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ backgroundColor: "black", height: "100%" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          href="/"
          label="Home"
          icon={<Home />}
          sx={{
            color: value === 0 ? "white" : "grey",
            "& .MuiBottomNavigationAction-label": {
              color: value === 0 ? "white" : "grey",
            },
            "&.Mui-selected": {
              color: "white",
            },
          }}
        />
        <BottomNavigationAction
          component={Link}
          href="/shop"
          label="Shop"
          icon={<ShoppingBag />}
          sx={{
            color: value === 1 ? "white" : "grey",
            "& .MuiBottomNavigationAction-label": {
              color: value === 1 ? "white" : "grey",
            },
            "&.Mui-selected": {
              color: "white",
            },
          }}
        />
        <BottomNavigationAction icon={<CustomVideoIcon />} />
        <BottomNavigationAction
          component={Link}
          href="/wallet"
          label="Wallet"
          icon={<Wallet />}
          sx={{
            color: value === 3 ? "white" : "grey",
            "& .MuiBottomNavigationAction-label": {
              color: value === 3 ? "white" : "grey",
            },
            "&.Mui-selected": {
              color: "white",
            },
          }}
        />
        <BottomNavigationAction
          href="/profile"
          label="Profile"
          component={Link}
          icon={<PersonOutline />}
          sx={{
            color: value === 4 ? "white" : "grey",
            "& .MuiBottomNavigationAction-label": {
              color: value === 4 ? "white" : "grey",
            },
            "&.Mui-selected": {
              color: "white",
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}
