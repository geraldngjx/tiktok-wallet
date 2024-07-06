"use client";

import { MAX_WIDTH } from "@/utils/constants";
import CustomVideoIcon from "@/components/ui/bottomNavigation/customVideoIcon";
import { PersonOutline } from "@mui/icons-material";
import Home from "@mui/icons-material/Home";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import Wallet from "@mui/icons-material/Wallet";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const BOTTOM_NAVBAR_HEIGHT = "56px"; // Adjust to match the height of BottomNavigation

export default function BottomNavbar() {
  const pathname = usePathname();
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    // Determine the value based on pathname
    // pathname.startsWith("/shop/") && !pathname.match(/^\/shop\/[^\/]+$/)
    if (pathname === "/") {
      setValue(0);
    } else if (pathname === "/shop") {
      setValue(1);
    } else if (pathname.startsWith("/shop/") && !pathname.includes("/orders")) {
      setValue(-1);
    } else if (pathname === "/wallet") {
      setValue(3);
    } else if (pathname === "/profile") {
      setValue(4);
    } else {
      setValue(null);
    }
  }, [pathname]);

  // Hide the navbar if the pathname matches /shop/[id] format
  // Assuming /shop/[id] is used for dynamic routing
  if (value === -1) {
    return null;
  }

  return (
    <Paper
      sx={{
        backgroundColor: "black",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: BOTTOM_NAVBAR_HEIGHT,
        // Added max width to restrict desktop view
        marginX: "auto",
        maxWidth: MAX_WIDTH,
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
          component={Link}
          href="/profile"
          label="Profile"
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
