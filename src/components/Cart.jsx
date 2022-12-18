import React from "react";
import { useState } from "react";
import {FiHeart} from 'react-icons/fi'
import {FaHeart} from 'react-icons/fa'

const Cart = ({ order, product, onBuyNowClick, onDeleteClick }) => {
  const [heart, setHeart] = useState(false);

  return (
    <div className="flex m-4">
      <div className="flex-none w-56 relative ">
        <img
          src={product.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto font-medium text-slate-900">
            {product.productName}
          </h1>
          <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600">
            ${product.price}
          </div>
          <div className="text-sm font-medium text-slate-400">In stock</div>
        </div>
        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
        <div className="flex space-x-4 mb-5 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
              type="button"
              onClick={(e) => {
                onBuyNowClick(
                  e,
                  order.id,
                  order.userId,
                  order.productId,
                  order.quantity
                );
              }}
            >
              Buy now
            </button>
            <button
              className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900"
              type="button"
              onClick={() => onDeleteClick(
                order.id
              )}
            >
              Remove
            </button>
          </div>
          <button
            className="flex-none flex items-center justify-center w-9 h-9 rounded-full text-violet-600 bg-violet-50"
            type="button"
            aria-label="Like"
            onClick={() => setHeart(!heart)}
          >
            {heart ? <span><FiHeart size={18} /></span> : <span><FaHeart size={18} /></span>}
          </button>
        </div>
        <p className="text-sm text-slate-500">
          Free shipping on all continental US orders.
        </p>
      </form>
    </div>
  );
};

export default Cart;
// <div className="flex font-sans m-4 ">
//     <div className="flex-none w-48 relative">
//       <img
//         src={product.img}
//         alt=""
//         className="absolute inset-0 w-full h-full object-cover"
//         loading="lazy"
//       />
//     </div>
//     <div className="flex flex-wrap bg-red-800">
//       <h1 className="flex-auto text-lg font-semibold text-slate-900">
//         {product.productName}
//       </h1>
//       <div className="text-lg font-semibold text-slate-500">
//         ${product.price}
//       </div>
//       <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
//         In stock
//       </div>
//     </div>
//     <div className="flex space-x-4 mb-6 text-sm font-medium justify-center items-center">
//       <div className="flex-auto flex space-x-4">
//         <button
//           onClick={() => {
//             onBuyNowClick(
//               order.id,
//               order.userId,
//               order.productId,
//               order.quantity
//             );
//           }}
//           className="h-10 px-6 font-semibold rounded-md bg-black text-white"
//         >
//           Buy now
//         </button>
//         <button
//           className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
//           type="button"
//         >
//           Remove
//         </button>
//       </div>
//       <button
//         className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
//         type="button"
//         aria-label="Like"
//       >
//         <svg
//           width="20"
//           height="20"
//           aria-hidden="true"
//           onClick={() => setHeart(!heart)}
//         >
//           <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
//         </svg>
//       </button>
//     </div>
//     <p className="text-sm text-slate-700">
//       Free shipping on all continental US orders.
//     </p>
//   </div>
