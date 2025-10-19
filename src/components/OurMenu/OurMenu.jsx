import React, { useEffect, useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";

const categories = ["Breakfast", "Lunch", "Dinner", "Mexican", "Italian", "Drinks"];

const OurMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const { cartItems, addToCart, removeFromCart, updateQuantity, API_BASE } = useCart();
  const [menuData, setMenuData] = useState({});

  const buildImageUrl = (path) => {
    if (!path) return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjM2EzYTNhIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM2NjYiLz48cGF0aCBkPSJNNjAgMTQwIEwxMDAgMTAwIEwxNDAgMTQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMTAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
    return path.startsWith("http") ? path : `${API_BASE}/uploads/${String(path).replace(/^\/?uploads\//, "")}`;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/items`, { withCredentials: true });
        const items = Array.isArray(res.data) ? res.data : res.data?.items ?? [];
        const byCategory = items.reduce((acc, item) => {
          const cat = item.category || "Uncategorized";
          (acc[cat] = acc[cat] || []).push(item);
          return acc;
        }, {});
        setMenuData(byCategory);
      } catch (err) {
        console.error("Failed to load menu items", err);
      }
    };
    fetchMenu();
  }, [API_BASE]);

  const getCartEntry = (itemId) => cartItems.find((ci) => ci.item?._id === itemId);
  const displayItems = (menuData[activeCategory] ?? []).slice(0, 12);

  return (
    <div className="bg-[#1e1e1e] text-white px-4 py-16 font-[poppins]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-yellow-400">Our Exclusive Menu</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">A symphony of Flavours</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition duration-200 ${
                activeCategory === cat ? "bg-yellow-400 text-black shadow" : "bg-gray-700 text-white hover:bg-yellow-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayItems.map((item) => {
            const cartEntry = getCartEntry(item._id);
            const quantity = cartEntry?.quantity || 0;
            const cartId = cartEntry?._id;

            return (
              <div key={item._id} className="bg-[#2a2a2a] rounded-xl shadow-lg overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={buildImageUrl(item.imageUrl || item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjM2EzYTNhIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM2NjYiLz48cGF0aCBkPSJNNjAgMTQwIEwxMDAgMTAwIEwxNDAgMTQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMTAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
                    }}
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-yellow-400 font-bold text-lg">₹{Number(item.price || 0).toFixed(2)}</span>

                    <div className="flex items-center gap-2">
                      {quantity > 0 ? (
                        <>
                          <button
                            className="bg-yellow-500 hover:bg-yellow-400 text-black w-8 h-8 flex items-center justify-center rounded-full"
                            onClick={() => (quantity > 1 ? updateQuantity(cartId, quantity - 1) : removeFromCart(cartId))}
                          >
                            <FaMinus />
                          </button>
                          <span className="px-2 text-sm">{quantity}</span>
                          <button
                            className="bg-yellow-500 hover:bg-yellow-400 text-black w-8 h-8 flex items-center justify-center rounded-full"
                            onClick={() => updateQuantity(cartId, quantity + 1)}
                          >
                            <FaPlus />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-1 text-sm rounded-full font-medium"
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
