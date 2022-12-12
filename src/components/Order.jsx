import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Order = React.memo(({ order, product, onBuyNowClick, onDeleteNowClick }) => {
  const [quantity, setQuantity] = useState(order.quantity);
  const [price, setPrice] = useState(product.price);

  return (
    <tbody
      className={
        order.isPaymentCompleted ? "bg-sky-200 hover:bg-sky-300" : "bg-gray-100"
      }
    >
      <tr className="border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {order.id}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {product.productName}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {price * quantity >= 0 ? price * quantity : 0}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center">
          {!order.isPaymentCompleted ? (
            <div className="flex items-center">
              <div>
                <AiFillMinusCircle
                  size={13}
                  className={"mx-2 cursor-pointer text-red-600"}
                  onClick={() => setQuantity(quantity - 1)}
                />
              </div>
              <h1>{quantity >= 0 ? quantity : 0}</h1>
              <div>
                <AiFillPlusCircle
                  size={13}
                  className={"mx-2 cursor-pointer text-lime-900"}
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>
            </div>
          ) : (
            quantity
          )}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {order.isPaymentCompleted ? (
            <p className="font-semibold">Paid</p>
          ) : (
            <div>
              <button
                onClick={() =>
                  onBuyNowClick(
                    order.id,
                    order.userId,
                    order.productId,
                    order.quantity
                  )
                }
                className="mx-2"
              >
                Buy Now
              </button>
              <button className="text-red-900" onClick={() => onDeleteNowClick(order.id)} >Delete Now</button>
            </div>
          )}
        </td>
      </tr>
    </tbody>
  );
});

export default Order;
