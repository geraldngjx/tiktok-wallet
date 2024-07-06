"use client";

import { useContext, useState } from "react";
import { ShopContext } from "@/providers/ShopProvider";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AnimatedList } from "@/components/magicui/animated-list";
import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 5;

const OrdersPage = () => {
  const { state } = useContext(ShopContext);
  const orders = state.orders;

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  // Calculate the start and end indices for slicing orders
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice the orders array to get only the current page's orders
  const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (orders.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-300">No orders available.</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 overflow-y-auto">
      <AnimatedList delay={100} className="flex flex-col gap-2">
        {currentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center bg-white shadow rounded-sm p-4"
          >
            <Image
              src={order.item_image}
              alt={order.item_name}
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div className="ml-4">
              <h2 className="text-sm font-bold text-black">
                {order.item_name}
              </h2>
              <div className="flex justify-end">
                <div className="flex flex-col items-end">
                  <div className="text-xs text-gray-600">
                    x{order.item_quantity}
                  </div>
                  <div className="text-sm text-gray-600 font-bold">
                    {order.total_price?.toFixed(2)} {order.currency}
                  </div>
                  <Badge
                    variant={order.status ? "default" : "destructive"}
                    className={`px-2 mt-1 ${
                      order.status ? "bg-black text-white" : "bg-red-600"
                    }`}
                  >
                    {order.status ? "Payment Accepted" : "Payment Failed"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex text-black justify-between items-center">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-black rounded disabled:bg-gray-200"
          >
            <ChevronLeft />
          </Button>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-black rounded disabled:bg-gray-200"
          >
            <ChevronRight />
          </Button>
        </div>
      </AnimatedList>
    </div>
  );
};

export default OrdersPage;
