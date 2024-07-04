"use client";

import React from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { NavigateNext } from "@mui/icons-material";
import ShopBottomNavigation from "@/components/ui/shop/shop-bottom-navigation";

const BOTTOM_NAV_HEIGHT = 56;
const IMAGE_HEIGHT = `calc(70vh - ${BOTTOM_NAV_HEIGHT}px)`;

const ShopItemPage = () => {
  const searchParams = useSearchParams();

  const image = searchParams.get("image");
  const price = searchParams.get("price");
  const name = searchParams.get("name");
  const rating = searchParams.get("rating");
  const deals = searchParams.get("deals");

  const displayValue = (value: any, fallback: any) => {
    return value ? value : fallback;
  };

  return (
    <Box sx={{ paddingBottom: `${BOTTOM_NAV_HEIGHT}px`, overflowY: "scroll" }}>
      {/* Full Width Image */}
      <CardMedia
        component="img"
        sx={{ height: IMAGE_HEIGHT, width: "100%" }}
        image={image || "/shop-item-placeholder.jpg"}
        alt="shop item"
      />

      <div id="item-description" className="flex flex-col gap-2 p-4">
        {/* Price */}
        <div className="px-2">
          <Typography variant="h6" fontWeight="900">
            {displayValue(price, "Price not available")}
          </Typography>
        </div>

        {/* Item Name */}
        <div className="px-2">
          <Typography variant="h6">
            {displayValue(name, "Name not available")}
          </Typography>
        </div>

        {/* Rating */}
        {/* Padding bottom to create gap between rating and deals card */}
        <div className="flex items-center pb-2">
          <StarIcon style={{ color: "#FFD700" }} />
          <Typography variant="body1" className="ml-2">
            {displayValue(rating, "Rating not available")} / 5
          </Typography>
        </div>

        {/* Deals Card */}
        <Card>
          <CardContent className="flex flex-col gap-2">
            <Typography variant="subtitle1" gutterBottom fontWeight="700">
              Deals
            </Typography>
            <div>
              <Separator />
              {/* Can extract to be a separate component: DealEntry */}
              <div id="deal-entry" className="flex my-2">
                <Typography variant="subtitle1" fontWeight="700">
                  {displayValue(deals, "No deals available")}
                </Typography>
                <NavigateNext className="ml-auto" />
              </div>
            </div>
            <div>
              <Separator />
              {/* Can extract to be a separate component: DealEntry */}
              <div id="deal-entry" className="flex my-2">
                <Typography variant="subtitle1" fontWeight="700">
                  {displayValue(deals, "No deals available")}
                </Typography>
                <NavigateNext className="ml-auto" />
              </div>
            </div>
            <div>
              <Separator />
              {/* Can extract to be a separate component: DealEntry */}
              <div id="deal-entry" className="flex my-2">
                <Typography variant="subtitle1" fontWeight="700">
                  {displayValue(deals, "No deals available")}
                </Typography>
                <NavigateNext className="ml-auto" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Reviews */}
        {/* <div className="w-full max-w-[600px] mt-4">
        <Typography variant="h6" gutterBottom>
          Customer Reviews ({reviews?.length})
        </Typography>
        {reviews?.map((review, index) => (
          <ProductReview
            key={index}
            icon={review.icon}
            rating={review.rating}
            description={review.description}
          />
        ))}
      </div> */}
      </div>
      <ShopBottomNavigation />
    </Box>
  );
};

export default ShopItemPage;
