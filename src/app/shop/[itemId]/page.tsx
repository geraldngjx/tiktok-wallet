"use client";

import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useSearchParams } from "next/navigation";

// Define the bottom margin for the fixed-bottom navbar
const BOTTOM_NAVBAR_HEIGHT = "56px";

const ShopItemPage = () => {
  const searchParams = useSearchParams();

  const image = searchParams.get("image");
  const price = searchParams.get("price");
  const name = searchParams.get("name");
  const rating = searchParams.get("rating");
  const deals = searchParams.get("deals");

  return (
    <div
      className="flex flex-col p-4 overflow-y-auto"
      style={{
        minHeight: `calc(100vh - ${BOTTOM_NAVBAR_HEIGHT})`,
        flexGrow: 1,
      }}
    >
      {/* Full Width Image */}
      <CardMedia
        component="img"
        sx={{ height: "70%", width: "100%" }}
        image={image || "/shop-item-placeholder.jpg"}
        alt="shop item"
      />

      {/* Price */}
      <Typography variant="h6" className="my-4">
        {price || "-"}
      </Typography>

      {/* Item Name */}
      <Typography variant="h5" className="my-2">
        {name || "-"}
      </Typography>

      {/* Rating */}
      <div className="flex items-center my-2">
        <StarIcon style={{ color: "#FFD700" }} />
        <Typography variant="body1" className="ml-2">
          {rating || "-"} / 5
        </Typography>
      </div>

      {/* Deals Card */}
      <Card className="w-full max-w-[600px] my-4">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Deals
          </Typography>
          <Typography variant="body2">{deals || "-"}</Typography>
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
