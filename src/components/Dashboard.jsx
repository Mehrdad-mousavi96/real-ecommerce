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
    if (window.confirm("Are you sure to delete this item?")) {
      let orderResponse = await fetch(
        `http://localhost:5001/orders/${orderId}`,
        {
          method: "delete",
        }
      );
      if (orderResponse.ok) {
        let orderResponseBody = orderResponse.json();
        loadDatafromDataBase();
      }
    }
  };

  return (
    <div className="flex flex-col max-w-[1200px] mx-auto w-5/6">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {/* cart */}
            {OrdersService.getCart(orders).length > 0 && (
              <div className="w-full h-20 flex justify-center items-center mx-auto">
                <h1 className="text-2xl font-light border border-slate-900 px-4 py-2 rounded-sm bg-slate-900 text-white">
                  Your Cart
                </h1>
              </div>
            )}
            <div className=" grid grid-cols-2 px-8 ">
              {OrdersService.getCart(orders).map((order) => (
                <div className="">
                  <Cart
                    key={order.id}
                    order={order}
                    product={order.product}
                    onBuyNowClick={onBuyNowClick}
                    onDeleteClick={onDeleteClick}
                  />
                </div>
              ))}
            </div>
            {/* end of cart */}

            {OrdersService.getPreviousOrders(orders).length > 0 && (
              <div className="w-full h-20 flex justify-center items-center mx-auto">
                <h1 className="text-2xl font-light border border-slate-900 px-4 py-2 rounded-sm bg-slate-900 text-white">
                  Paid Orders
                </h1>
              </div>
            )}
            <div className="flex">
              {/* Paid Orders */}

              {OrdersService.getPreviousOrders(orders).map((order) => (
                <Paid key={order.id} order={order} product={order.product} />
              ))}
              {/* end of Paid Orders */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
