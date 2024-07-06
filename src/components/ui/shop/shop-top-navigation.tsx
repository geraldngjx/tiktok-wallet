"use client";

import { ChevronLeftIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { MoreHoriz, ShoppingCartOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function ShopTopNavigation() {
  const router = useRouter();
  const theme = useTheme(); // Get current theme

  return (
    <div
      className="flex items-center w-full h-fit p-2 shadow-lg z-[999]"
      style={{
        backgroundColor: theme.palette.background.default, // Background color based on theme
        color: theme.palette.text.primary, // Text color based on theme
      }}
    >
      <Button
        variant="ghost"
        className="pl-2"
        onClick={() => router.back()}
        style={{
          color: theme.palette.text.primary, // Icon color based on theme
          backgroundColor: "transparent", // Ensure background is transparent
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-4 ml-auto">
        <Button
          variant="ghost"
          className="p-0"
          style={{
            color: theme.palette.text.primary, // Icon color based on theme
            backgroundColor: "transparent", // Ensure background is transparent
          }}
        >
          <SendIcon />
        </Button>
        <Button
          variant="ghost"
          className="p-0"
          style={{
            color: theme.palette.text.primary, // Icon color based on theme
            backgroundColor: "transparent", // Ensure background is transparent
          }}
        >
          <ShoppingCartOutlined />
        </Button>
        <Button
          variant="ghost"
          className="p-0"
          style={{
            color: theme.palette.text.primary, // Icon color based on theme
            backgroundColor: "transparent", // Ensure background is transparent
          }}
        >
          <MoreHoriz />
        </Button>
      </div>
    </div>
  );
}
