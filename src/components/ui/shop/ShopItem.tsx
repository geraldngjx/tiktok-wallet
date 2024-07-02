import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Link from "next/link";

interface ShopItemProps {
  id: string;
  image: string;
  price: string;
  name: string;
  rating: number;
  deals: string;
  description: string;
}

const ShopItem = ({
  id,
  image,
  price,
  name,
  rating,
  deals,
  description,
}: ShopItemProps) => {
  return (
    <Link
      href={{
        pathname: `/shop/${id}`,
        query: {
          image,
          price,
          name,
          rating,
          deals,
          description,
        },
      }}
      passHref
    >
      <Card className="border border-gray-300 rounded-sm overflow-hidden h-full flex flex-col shadow-md cursor-pointer no-underline">
        <CardMedia
          component="img"
          sx={{ height: "70%", width: "100%" }}
          image={image}
          alt="shop item"
        />
        <CardContent>
          <Typography variant="body2" className="text-gray-600">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ShopItem;
