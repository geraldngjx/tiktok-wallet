import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface ShopItemProps {
  image: string;
  description: string;
}

const ShopItem = ({ image, description }: ShopItemProps) => {
  return (
    <Card
      style={{
        border: "1px solid #BBB", // Thicker and darker border
        borderRadius: "2px",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        flexDirection: "column",
      }}
    >
      {" "}
      <CardMedia
        component="img"
        sx={{ height: "70%", width: "100%" }}
        image={image}
        alt="shop item"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShopItem;
