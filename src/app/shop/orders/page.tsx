"use client";

import { SupabaseBrowserContext } from "@/providers/SupabaseBrowserProvider";
import { SupabaseOrder } from "@/utils/types/shop_types";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AnimatedList } from "@/components/magicui/animated-list";

const OrdersPage = () => {
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useContext(SupabaseBrowserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("Orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [supabase]);

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-300">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <AnimatedList delay={100} className="flex flex-col gap-2">
        {orders.map((order) => (
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
                    {order.total_price.toFixed(2)} {order.currency}
                  </div>
                  <Badge
                    // className={`text-sm mt-2 ${
                    //   order.status ? "text-green-500" : "text-red-500"
                    // }`}
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
      </AnimatedList>
    </div>
  );
};

export default OrdersPage;
