import React, { useEffect, useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import { FaFire, FaHeart, FaPlus, FaStar } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import FloatingParticle from "../FloatingParticle/FloatingParticle";
import axios from "axios";

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState([]);
  const { addToCart, updateQuantity, removeFromCart, cartItems, API_BASE } = useCart();

  const buildImageUrl = (path) => {
    if (!path) return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjM2EzYTNhIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM2NjYiLz48cGF0aCBkPSJNNjAgMTQwIEwxMDAgMTAwIEwxNDAgMTQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMTAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
    return path.startsWith("http") ? path : `${API_BASE}/uploads/${String(path).replace(/^\/?uploads\//, "")}`;
  };

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/items`, { withCredentials: true })
      .then((res) => setItems(Array.isArray(res.data) ? res.data : res.data?.items ?? []))
      .catch((err) => console.error(err));
  }, [API_BASE]);

  const displayList = Array.isArray(items) ? items.slice(0, showAll ? 8 : 4) : [];

  return (
    <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4 font-[poppins]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold capitalize tracking-wide">
            today's <span className="text-yellow-400 drop-shadow">Special</span> Offers
          </h1>
          <p className="text-gray-300 mt-2 max-w-xl mx-auto">
            Savor the extraordinary with our culinary masterpieces crafted to perfection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayList.map((item) => {
            const cartItem = cartItems.find((ci) => ci.item._id === item._id);
            const qty = cartItem?.quantity || 0;
            const cartId = cartItem?._id;

            return (
              <div key={item._id} className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-md hover:shadow-yellow-500/20 transition-all duration-300">
                <div className="relative h-72 overflow-hidden group">
                  <img
                    src={buildImageUrl(item.imageUrl || item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded text-xs flex items-center gap-1 text-amber-400">
                    <FaStar className="text-sm" />
                    <span className="font-semibold">{item.rating ?? "4.9"}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-xs flex items-center gap-1 text-red-400">
                    <FaHeart className="text-sm" />
                    <span className="font-semibold">{item.hearts ?? "120"}</span>
                  </div>
                </div>

                <div className="p-6 relative z-10 space-y-3">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xl font-bold text-amber-400 flex-1">₹{Number(item.price || 0).toFixed(2)}</span>

                    {qty > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => (qty > 1 ? updateQuantity(cartId, qty - 1) : removeFromCart(cartId))}
                          className="w-8 h-8 rounded-full bg-amber-800/40 hover:bg-amber-700/60 text-white flex items-center justify-center transition"
                        >
                          <HiMinus />
                        </button>

                        <span className="w-8 text-center text-amber-100 font-semibold">{qty}</span>

                        <button
                          onClick={() => updateQuantity(cartId, qty + 1)}
                          className="w-8 h-8 rounded-full bg-amber-800/40 hover:bg-amber-700/60 text-white flex items-center justify-center transition"
                        >
                          <HiPlus />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition"
                      >
                        <FaPlus />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-3">
                  <div className="rounded-lg overflow-hidden">
                    <FloatingParticle />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-md hover:bg-yellow-400 transition"
          >
            <FaFire className="animate-pulse" />
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
