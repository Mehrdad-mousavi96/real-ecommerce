import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../useContext";
import { OrdersService, ProductService } from "../components/Service";
import Order from "./Order";

const Dashboard = () => {
  const userContext = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const ordersResponse = await fetch(
        `http://localhost:5001/orders?userId=${userContext.user.currentUserId}`,
        {
          method: "GET",
        }
      );
      if (ordersResponse.ok) {
        let ordersResponseBody = await ordersResponse.json();

        const productsResponse = await ProductService.fetchProducts();
        if (productsResponse.ok) {
          let productsResponseBody = await productsResponse.json();

          ordersResponseBody.forEach((order) => {
            order.product = ProductService.getProductByProductId(
              productsResponseBody,
              order.productId
            );
          });
        }

        setOrders(ordersResponseBody);
      }
    })();
  }, [userContext.user.currentUserId]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {/* table */}
            <table className="min-w-full">
              <thead className="border-b bg-blue-400">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Qunatity
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              {/* Paid Orders */}
              {OrdersService.getPreviousOrders(orders).map((order) => (
                <Order key={order.id} order={order} product={order.product} />
              ))}
              {/* end of Paid Orders */}

              {/* cart */}
              {OrdersService.getCart(orders).map((order) => (
                <Order key={order.id} order={order} product={order.product} />
              ))}
              {/* end of cart */}
            </table>
            {/* end of table */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
