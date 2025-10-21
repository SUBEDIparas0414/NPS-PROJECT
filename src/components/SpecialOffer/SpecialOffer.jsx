import React, { useEffect, useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import { FaFire, FaHeart, FaPlus, FaStar, FaTag, FaPercent } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import FloatingParticle from "../FloatingParticle/FloatingParticle";
import axios from "axios";

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, updateQuantity, removeFromCart, cartItems, API_BASE } = useCart();

  const buildImageUrl = (path) => {
    if (!path) return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjM2EzYTNhIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM2NjYiLz48cGF0aCBkPSJNNjAgMTQwIEwxMDAgMTAwIEwxNDAgMTQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMTAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
    return path.startsWith("http") ? path : `${API_BASE}/uploads/${String(path).replace(/^\/?uploads\//, "")}`;
  };

  useEffect(() => {
    const fetchSpecialOffers = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/special-offers/active`, { withCredentials: true });
        setSpecialOffers(response.data || []);
      } catch (err) {
        console.error('Error fetching special offers:', err);
        // Fallback to regular items if special offers fail
        try {
          const response = await axios.get(`${API_BASE}/api/items`, { withCredentials: true });
          setSpecialOffers(Array.isArray(response.data) ? response.data : response.data?.items ?? []);
        } catch (fallbackErr) {
          console.error('Error fetching fallback items:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpecialOffers();
  }, [API_BASE]);

  const displayList = Array.isArray(specialOffers) ? specialOffers.slice(0, showAll ? 8 : 4) : [];

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4 font-[poppins]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-4xl font-bold capitalize tracking-wide mb-4">
            today's <span className="text-yellow-400 drop-shadow">Special</span> Offers
          </div>
          <div className="text-gray-300">Loading amazing offers...</div>
        </div>
      </div>
    );
  }

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

        {displayList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">No special offers available at the moment</div>
            <div className="text-gray-500">Check back soon for amazing deals!</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayList.map((offer) => {
              // Handle both special offers and regular items
              const item = offer.item || offer; // If it's a special offer, use offer.item, otherwise use offer directly
              const cartItem = cartItems.find((ci) => ci.item._id === item._id);
              const qty = cartItem?.quantity || 0;
              const cartId = cartItem?._id;

              // Determine if this is a special offer or regular item
              const isSpecialOffer = offer.item && offer.discountedPrice;
              const displayPrice = isSpecialOffer ? offer.discountedPrice : item.price;
              const originalPrice = isSpecialOffer ? offer.originalPrice : null;
              const discountPercentage = isSpecialOffer ? offer.discountPercentage : null;

              return (
                <div key={offer._id} className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-md hover:shadow-yellow-500/20 transition-all duration-300 relative">
                  {/* Special Offer Badge */}
                  {isSpecialOffer && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10 flex items-center gap-1">
                      <FaTag />
                      {discountPercentage}% OFF
                    </div>
                  )}
                  
                  <div className="relative h-72 overflow-hidden group">
                    <img
                      src={buildImageUrl(offer.imageUrl || item.imageUrl || item.image)}
                      alt={offer.title || item.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-xs flex items-center gap-1 text-amber-400">
                      <FaStar className="text-sm" />
                      <span className="font-semibold">{item.rating ?? "4.9"}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded text-xs flex items-center gap-1 text-red-400">
                      <FaHeart className="text-sm" />
                      <span className="font-semibold">{item.hearts ?? "120"}</span>
                    </div>
                  </div>

                  <div className="p-6 relative z-10 space-y-3">
                    <h3 className="text-xl font-semibold">{offer.title || item.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {offer.description || item.description}
                    </p>
                    
                    {/* Price Display */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        {isSpecialOffer && originalPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-400">₹{Number(displayPrice).toFixed(2)}</span>
                            <span className="text-sm text-gray-400 line-through">₹{Number(originalPrice).toFixed(2)}</span>
                            <span className="text-xs text-red-400 font-semibold">Save ₹{Number(originalPrice - displayPrice).toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold text-amber-400">₹{Number(displayPrice).toFixed(2)}</span>
                        )}
                      </div>

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
        )}

        {displayList.length > 4 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-md hover:bg-yellow-400 transition"
            >
              <FaFire className="animate-pulse" />
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialOffer;
