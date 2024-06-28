"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import Home from "@mui/icons-material/Home";
import Wallet from "@mui/icons-material/Wallet";
import { PersonOutline } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import CustomVideoIcon from "@/components/ui/bottomNavigation/customVideoIcon";

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
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
            label="Profile"
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
    </Box>
  );
}
