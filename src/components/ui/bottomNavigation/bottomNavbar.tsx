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

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div className="h-14 bottom-0 fixed left-0 right-0" ref={ref}>
      <Paper
        sx={{
          backgroundColor: "black",
        }}
        elevation={3}
      >
        <BottomNavigation
          sx={{ backgroundColor: "black" }}
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
              color: value === 0 ? "white" : "grey", // white when selected, else grey
              "& .MuiBottomNavigationAction-label": {
                color: value === 0 ? "white" : "grey", // white when selected, else grey
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
              color: value === 1 ? "white" : "grey", // white when selected, else grey
              "& .MuiBottomNavigationAction-label": {
                color: value === 1 ? "white" : "grey", // white when selected, else grey
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
              color: value === 3 ? "white" : "grey", // white when selected, else grey
              "& .MuiBottomNavigationAction-label": {
                color: value === 3 ? "white" : "grey", // white when selected, else grey
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
              color: value === 4 ? "white" : "grey", // white when selected, else grey
              "& .MuiBottomNavigationAction-label": {
                color: value === 4 ? "white" : "grey", // white when selected, else grey
              },
              "&.Mui-selected": {
                color: "white",
              },
            }}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
