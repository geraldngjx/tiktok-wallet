import React from "react";
import { Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";

interface ProductReviewProps {
  icon: string;
  rating: number;
  description: string;
}

const ProductReview = ({ icon, rating, description }: ProductReviewProps) => {
  return (
    <Box className="flex items-center mb-4">
      {" "}
      {/* Flex layout and margin-bottom */}
      <Image
        src={icon}
        alt="Review Icon"
        className="w-10 h-10 rounded-full mr-4" // Tailwind CSS classes for sizing and styling
      />
      <div>
        <div className="flex items-center mb-2">
          {" "}
          {/* Flex layout and margin-bottom */}
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`text-xl ${
                i < rating ? "text-yellow-500" : "text-gray-300"
              }`} // Conditional styling for stars
            />
          ))}
          <Typography variant="body2" className="ml-2">
            {rating}/5
          </Typography>
        </div>
        <Typography variant="body2">{description}</Typography>
      </div>
    </Box>
  );
};

export default ProductReview;
