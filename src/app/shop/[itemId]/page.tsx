"use client";

import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useSearchParams } from "next/navigation";

// Define the bottom margin for the fixed-bottom navbar
const BOTTOM_NAVBAR_HEIGHT = "56px";

const ShopItemPage = () => {
  const searchParams = useSearchParams();

  return (
    <div
      className="flex flex-col p-4 overflow-y-auto box-border mb-[56px]" // Use Tailwind CSS classes
      style={{
        height: `calc(100vh - ${BOTTOM_NAVBAR_HEIGHT})`, // Adjust height to account for bottom margin
      }}
    >
      {/* Full Width Image */}
      <CardMedia
        component="img"
        sx={{ height: "70%", width: "100%" }}
        image={searchParams.get("image") || "/shop-item-placeholder.jpg"}
        alt="shop item"
      />

      {/* Price */}
      <Typography variant="h6" className="my-4">
        {searchParams.get("price") || "-"}
      </Typography>

      {/* Item Name */}
      <Typography variant="h5" className="my-2">
        {searchParams.get("name") || "-"}
      </Typography>

      {/* Rating */}
      <div className="flex items-center my-2">
        <StarIcon style={{ color: "#FFD700" }} />
        <Typography variant="body1" className="ml-2">
          {searchParams.get("rating") || "-"} / 5
        </Typography>
      </div>

      {/* Deals Card */}
      <Card className="w-full max-w-[600px] my-4">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Deals
          </Typography>
          <Typography variant="body2">
            {searchParams.get("deals") || "-"}
          </Typography>
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
  );
};

export default ShopItemPage;
