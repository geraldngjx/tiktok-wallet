import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";

interface ShopItemProps {
  id: number;
  image: string;
  price: number;
  name: string;
  rating: number;
  onClick: () => void;
}

const ShopItemPanel = ({
  id,
  image,
  price,
  name,
  rating,
  onClick,
}: ShopItemProps) => {
  const displayValue = (value: any, fallback: any) => {
    return value ? value : fallback;
  };
  return (
    <Link
      href={{
        pathname: `/shop/${id}`,
      }}
      passHref
    >
      <Card className="border border-gray-300 rounded-sm overflow-hidden h-full flex flex-col shadow-md cursor-pointer no-underline">
        {!image ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ height: "70%", width: "100%" }}
          />
        ) : (
          <CardMedia
            component="img"
            sx={{ height: "70%", width: "100%" }}
            image={image}
            alt="shop item"
          />
        )}
        <CardContent className="flex flex-col gap-2">
          <Typography variant="body2" className="text-gray-600">
            {name?.substring(0, 50) + "..."}
          </Typography>
          <div>
            <Typography variant="body1" className="text-red-700 font-bold">
              S${price ?? "-"}
            </Typography>
            {/* Rating */}
            {/* Padding bottom to create gap between rating and deals card */}
            <div className="flex items-center">
              <StarIcon style={{ color: "#FFD700", height: "15px" }} />
              <div className="text-xs ml-1">
                {displayValue(rating, "Rating not available")} / 5
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ShopItemPanel;
