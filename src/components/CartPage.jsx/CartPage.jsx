import React, { useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTimes, FaTrash } from "react-icons/fa";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, API_BASE } =
    useCart();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());

  const buildImageUrl = (path) => {
    if (!path) return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjM2EzYTNhIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM2NjYiLz48cGF0aCBkPSJNNjAgMTQwIEwxMDAgMTAwIEwxNDAgMTQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMTAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
    return path.startsWith("http")
      ? path
      : `${API_BASE}/uploads/${String(path).replace(/^\/?uploads\//, "")}`;
  };

  const handleImageError = (itemId) => {
    setImageErrors(prev => new Set(prev).add(itemId));
  };

  const getImageSrc = (item) => {
    const itemId = item._id;
    if (imageErrors.has(itemId)) {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjM2EzYTNhIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM2NjYiLz48cGF0aCBkPSJNNjAgMTQwIEwxMDAgMTAwIEwxNDAgMTQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMTAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
    }
    return buildImageUrl(item.imageUrl || item.image);
  };

  return (
    <div
      className="min-h-screen py-10 px-5 md:px-20"
      style={{ backgroundColor: "rgb(31,18,10)" }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center tracking-wide">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <p className="text-lg text-gray-200 mb-3">Your cart is empty</p>
          <Link
            to="/menu"
            className="inline-block bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition"
          >
            Browse All Items
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map(({ _id, item, quantity }) => (
              <div
                key={_id}
                className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                {/* Image */}
                <div
                  className="cursor-pointer w-28 h-28 flex-shrink-0 mb-4 md:mb-0"
                  onClick={() =>
                    setSelectedImage(getImageSrc(item))
                  }
                >
                  <img
                    src={getImageSrc(item)}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg border border-amber-700"
                    onError={() => handleImageError(item._id)}
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 text-center md:text-left md:ml-6">
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-amber-400 font-medium">
                    ₹ {Number(item.price || 0).toFixed(2)}
                  </p>
                </div>

                {/* Quantity + Price + Remove in same line */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mt-3 md:mt-0">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        quantity > 1
                          ? updateQuantity(_id, quantity - 1)
                          : removeFromCart(_id)
                      }
                      className="p-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-lg font-medium text-white w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(_id, quantity + 1)}
                      className="p-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-semibold text-amber-400 whitespace-nowrap">
                    ₹{Number((item.price || 0) * quantity).toFixed(2)}
                  </p>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(_id)}
                    className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
                  >
                    <FaTrash /> <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <Link
              to="/menu"
              className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>

            <div className="text-center md:text-right mt-6 md:mt-0 space-y-3">
              <h2 className="text-2xl font-bold text-white">
                Total:{" "}
                <span className="text-amber-400">
                  ₹{Number(totalAmount).toFixed(2)}
                </span>
              </h2>
              <Link
                to="/checkout"
                className="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-amber-700 hover:scale-105 transition-transform"
              >
                Checkout Now
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-xl border-4 border-amber-600"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjM2EzYTNhIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM2NjYiLz48cGF0aCBkPSJNNjAgMTQwIEwxMDAgMTAwIEwxNDAgMTQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMTAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
              }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-200"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
