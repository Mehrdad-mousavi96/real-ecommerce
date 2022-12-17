import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../useContext";
import { OrdersService, ProductService } from "../components/Service";
import Paid from "./Paid";
import Cart from "./Cart";

const Dashboard = () => {
  const userContext = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  const loadDatafromDataBase = async () => {
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
  };

  useEffect(() => {
    loadDatafromDataBase();
  }, [userContext.user.currentUserId]);

  const onBuyNowClick = async (e, orderId, userId, productId, quantity) => {
    e.preventDefault();
    if (window.confirm("Would you like to pay?")) {
      const updateOrder = {
        id: orderId,
        userId,
        productId,
        quantity,
        isPaymentCompleted: true,
      };
      let orderResponse = await fetch(
        `http://localhost:5001/orders/${orderId}`,
        {
          method: "put",
          body: JSON.stringify(updateOrder),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      loadDatafromDataBase();
    }
  };

  const onDeleteClick = async (orderId) => {
    if (window.confirm('Are you sure to delete this item?')) {
      let orderResponse = await fetch(`http://localhost:5001/orders/${orderId}`, {
        method: 'delete'
      })
      if (orderResponse.ok) {
        let orderResponseBody = orderResponse.json()
        loadDatafromDataBase()
      }
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {console.log(OrdersService.getPreviousOrders(orders).length)}
            {/* Paid Orders */}
            <table className={" w-full bg-gray-200"}>
              {OrdersService.getPreviousOrders(orders).length > 0 && (
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
              )}
              {OrdersService.getPreviousOrders(orders).map((order) => (
                <Paid key={order.id} order={order} product={order.product} />
              ))}
            </table>
            {/* end of Paid Orders */}

            {/* cart */}
            <div className=" grid grid-cols-2 px-8">
              {OrdersService.getCart(orders).map((order) => (
                <Cart
                  key={order.id}
                  order={order}
                  product={order.product}
                  onBuyNowClick={onBuyNowClick}
                  onDeleteClick={onDeleteClick}
                />
              ))}
            </div>
            {/* end of cart */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
