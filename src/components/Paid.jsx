import React from "react";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillDelete,
  AiFillShopping,
} from "react-icons/ai";

// {product.productName}
// {product.price}
// {order.quantity}
const Order = ({ order, product }) => {
  return (
    <div className="w-full flex justify-center items-center flex-col m-4 ">
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src={product.img}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.productName}</div>
          <p className="text-gray-700 text-base"></p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            ${product.price}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <span className="flex items-center justify-center">
              <AiFillShopping className="mr-1" size={15} />
              {order.quantity}
            </span>
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2 mb-2">
            Paid
          </span>
        </div>
      </div>
    </div>
  );
};

export default Order;
