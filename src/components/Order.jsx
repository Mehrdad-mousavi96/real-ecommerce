import React from "react";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillDelete,
} from "react-icons/ai";

const Order = ({ order, product }) => {

  return (
    <tbody
      className={
        order.isPaymentCompleted
          ? "bg-gray-300"
          : "bg-emerald-300 hover:bg-emerald-400"
      }
    >
      <tr className="border-b">
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {product.productName}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {product.price}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {order.quantity}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {order.isPaymentCompleted ? 'Paid' : (
            <a className="cursor-pointer underline">Gateway</a>
          )}
        </td>
      </tr>
      {}
    </tbody>
  );
};

export default Order;
