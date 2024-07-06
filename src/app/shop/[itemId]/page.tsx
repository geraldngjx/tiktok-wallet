"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Skeleton,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Separator } from "@/components/ui/separator";
import { NavigateNext } from "@mui/icons-material";
import { ShopItem, ShopItemDeal } from "@/utils/types/shop_types";
import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { usePathname, useSearchParams } from "next/navigation";
import ShopBottomNavigation from "@/components/ui/shop/shop-bottom-navigation";
import { MAX_WIDTH } from "@/utils/constants";

const BOTTOM_NAV_HEIGHT = 56;
const IMAGE_HEIGHT = `calc(70vh - ${BOTTOM_NAV_HEIGHT}px)`;

const ShopItemPage = () => {
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const pathname = usePathname();
  // the resource after "shop" path
  const itemId = pathname.split("/")[2];
  const supabase = useContext(SupabaseBrowserContext);
  const theme = useTheme(); // Get current theme

  const itemIdString = typeof itemId === "string" ? itemId : "";

  const fetchItem = useCallback(
    async (itemIdString: string) => {
      if (itemIdString) {
        try {
          const { data, error } = await supabase
            .from("shopitem")
            .select("*")
            .eq("id", itemIdString)
            .single();

          if (error) {
            console.error("Error fetching item:", error);
          } else {
            setSelectedItem(data);
          }
        } catch (err) {
          console.error("Error:", err);
        }
      }
    },
    [supabase]
  );

  useEffect(() => {
    fetchItem(itemIdString);
  }, [itemIdString, fetchItem]);

  const displayValue = (value: any, fallback: any) => {
    return value ? value : fallback;
  };

  return (
    <Box
      sx={{
        paddingBottom: `${BOTTOM_NAV_HEIGHT}px`,
        overflowY: "scroll",
        bgcolor: theme.palette.background.default, // Background color based on theme
        color: theme.palette.text.primary, // Text color based on theme
      }}
    >
      {!selectedItem ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ height: IMAGE_HEIGHT, width: "100%" }}
        />
      ) : (
        <CardMedia
          component="img"
          sx={{ height: IMAGE_HEIGHT, width: "100%" }}
          image={selectedItem.image ?? "/shop-item-placeholder.jpg"}
          alt="shop item"
        />
      )}

      <div id="item-description" className="flex flex-col gap-2 p-4">
        {/* Price */}
        <div className="px-2">
          {!selectedItem ? (
            <Skeleton variant="rectangular" animation="wave" />
          ) : (
            <Typography
              variant="h6"
              fontWeight="900"
              sx={{ color: theme.palette.text.primary }} // Text color based on theme
            >
              {displayValue(selectedItem?.price, "Price not available")}
            </Typography>
          )}
        </div>
        {/* Item Name */}
        <div className="px-2">
          {!selectedItem ? (
            <Skeleton variant="rectangular" animation="wave" />
          ) : (
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary }} // Text color based on theme
            >
              {displayValue(selectedItem?.name, "Name not available")}
            </Typography>
          )}
        </div>
        {/* Rating */}
        <div className="px-2">
          {!selectedItem ? (
            <Skeleton variant="rectangular" animation="wave" />
          ) : (
            <div className="flex items-center pb-2">
              <StarIcon style={{ color: "#FFD700" }} />
              <Typography
                variant="body1"
                className="ml-2"
                sx={{ color: theme.palette.text.primary }} // Text color based on theme
              >
                {displayValue(selectedItem?.rating, "Rating not available")} / 5
              </Typography>
            </div>
          )}
        </div>
        {/* Deals Card */}
        <Card
          sx={{
            bgcolor: theme.palette.background.paper, // Card background color based on theme
            color: theme.palette.text.primary, // Text color based on theme
          }}
        >
          <CardContent className="flex flex-col gap-2">
            <Typography variant="subtitle1" gutterBottom fontWeight="700">
              Deals
            </Typography>
            <div>
              {!selectedItem ? (
                <Skeleton variant="text" sx={{ height: 40, width: "100%" }} />
              ) : (
                selectedItem?.deals?.map(
                  (deal: ShopItemDeal, index: number) => (
                    <div key={index}>
                      <Separator />
                      <div className="flex my-2">
                        <Typography
                          variant="subtitle1"
                          fontWeight="700"
                          sx={{ color: theme.palette.text.primary }} // Text color based on theme
                        >
                          {displayValue(deal.description, "No deals available")}
                        </Typography>
                        <NavigateNext
                          className="ml-auto"
                          sx={{ color: theme.palette.text.primary }} // Icon color based on theme
                        />
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <ShopBottomNavigation selectedItem={selectedItem} />
    </Box>
  );
};

export default ShopItemPage;
