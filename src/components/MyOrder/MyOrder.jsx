import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import {
  FiArrowLeft,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiTruck,
  FiUser,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNotifications } from "../../NotificationContext/NotificationContext";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());
  const { notifications, fetchNotifications } = useNotifications();

  const user = JSON.parse(localStorage.getItem("user"));
  const API_BASE = "http://localhost:4000";

  const buildImageUrl = (path) => {
    if (!path) return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjM2EzYTNhIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM2NjYiLz48cGF0aCBkPSJNNjAgMTQwIEwxMDAgMTAwIEwxNDAgMTQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMTAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
    
    // Handle different path formats
    if (path.startsWith("http")) {
      return path;
    } else if (path.startsWith("/uploads/")) {
      return `${API_BASE}${path}`;
    } else if (path.startsWith("uploads/")) {
      return `${API_BASE}/${path}`;
    } else {
      return `${API_BASE}/uploads/${path}`;
    }
  };

  const handleImageError = (itemId) => {
    console.log(`Order history image failed to load for item ${itemId}`);
    setImageErrors(prev => new Set(prev).add(itemId));
  };

  const getImageSrc = (item, orderId) => {
    const itemId = `${orderId}-${item.name}`;
    if (imageErrors.has(itemId)) {
      console.log(`Using fallback image for ${item.name}`);
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyYTJhMmEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjM2EzYTNhIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM2NjYiLz48cGF0aCBkPSJNNjAgMTQwIEwxMDAgMTAwIEwxNDAgMTQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMTAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
    }
    const imageUrl = buildImageUrl(item.imageUrl);
    console.log(`Loading order history image for ${item.name}:`, imageUrl);
    return imageUrl;
  };

  // Handle order deletion by customer
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order from your order history? This will not affect the admin panel.')) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.delete(`http://localhost:4000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        // Remove order from local state
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        
        alert('✅ Order deleted successfully from your order history!\n\nThe admin panel remains unchanged.');
      } else {
        throw new Error(response.data.message || 'Failed to delete order');
      }
    } catch (err) {
      console.error('Error deleting order:', err);
      alert(`❌ Failed to delete order!\n\nError: ${err.response?.data?.message || err.message}\n\nPlease try again.`);
    }
  };

  // fetch orders for a user
  const fetchOrders = useCallback(async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Please login to view your orders");
          setLoading(false);
          return;
        }

        console.log('Fetching orders for user...');
        const response = await axios.get("http://localhost:4000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Orders API response:', response.data);

        // Handle new API format with success wrapper
        const ordersData = response.data.success ? response.data.orders : response.data;
        
        const formattedOrders = ordersData.map((order) => ({
          ...order,
          items: order.items?.map((entry) => {
            console.log(`Order ${order._id} - Item ${entry.item.name}:`, entry.item.imageUrl);
            return {
              _id: entry._id,
              item: {
                ...entry.item,
                imageUrl: entry.item.imageUrl,
              },
              quantity: entry.quantity,
            };
          }) || [],
          createdAt: new Date(order.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          paymentStatus: order.paymentStatus?.toLowerCase() || "pending",
          status: order.status || 'pending',
          expectedDelivery: order.expectedDelivery ? new Date(order.expectedDelivery).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) : null,
          deliveredAt: order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }) : null,
        }));

        console.log(`Formatted ${formattedOrders.length} orders`);
        setOrders(formattedOrders);
        setError(null);
      } catch (err) {
        console.error("error fetching orders", err);
        if (err.response?.status === 401) {
          setError("Please login to view your orders");
        } else {
          setError(
            err.response?.data?.message ||
              "Failed to load orders. Please try again later"
          );
        }
      } finally {
        setLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Auto-refresh orders when a new status notification is fetched
  useEffect(() => {
    const hasOrderUpdate = notifications?.some(n => (n.type === 'status_update' || n.type === 'order_status') && n.orderId);
    if (hasOrderUpdate) {
      fetchOrders();
    }
  }, [notifications, fetchOrders]);

  // Ensure notifications are kept fresh while on this page (every 2s)
  useEffect(() => {
    const id = setInterval(() => fetchNotifications?.(), 2000);
    return () => clearInterval(id);
  }, [fetchNotifications]);

  const statusStyles = {
    pending: {
      color: "text-yellow-400",
      bg: "bg-yellow-900/20",
      icon: <FiClock className="text-lg" />,
      label: "Pending",
    },
    processing: {
      color: "text-blue-400",
      bg: "bg-blue-900/20",
      icon: <FiClock className="text-lg" />,
      label: "Processing",
    },
    preparing: {
      color: "text-orange-400",
      bg: "bg-orange-900/20",
      icon: <FiClock className="text-lg" />,
      label: "Preparing",
    },
    outForDelivery: {
      color: "text-purple-400",
      bg: "bg-purple-900/20",
      icon: <FiTruck className="text-lg" />,
      label: "Out for Delivery",
    },
    delivered: {
      color: "text-green-400",
      bg: "bg-green-900/20",
      icon: <FiCheckCircle className="text-lg" />,
      label: "Delivered",
    },
    cancelled: {
      color: "text-red-400",
      bg: "bg-red-900/20",
      icon: <FiClock className="text-lg" />,
      label: "Cancelled",
    },
    succeeded: {
      color: "text-green-400",
      bg: "bg-green-900/20",
      icon: <FiCheckCircle className="text-lg" />,
      label: "Completed",
    },
  };

  const getPaymentMethodDetails = (method) => {
    switch (method?.toLowerCase()) {
      case "cod":
        return {
          label: "Cash on Delivery",
          class:
            "bg-yellow-600/30 text-yellow-300 border border-yellow-500/50 px-2 py-1 rounded-lg text-sm",
        };
      default:
        return {
          label: "Online Payment",
          class:
            "bg-green-600/30 text-green-400 border border-green-500/50 px-2 py-1 rounded-lg text-sm",
        };
    }
  };

  // error screen
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <p className="text-red-400 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <FiArrowLeft /> <span>Try again</span>
        </button>
      </div>
    );

  // loading screen
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Loading your orders...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition"
          >
            <FiArrowLeft /> <span className="font-bold">Back to Home</span>
          </Link>
          <div className="text-sm text-gray-300">
            Logged in as: <span className="font-medium">{user?.email || "Unknown User"}</span>
          </div>
        </div>

        {/* Orders */}
        <h2 className="text-2xl font-bold mb-4 text-amber-400">Order History</h2>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No orders found</div>
            <p className="text-gray-500 mb-6">
              You haven't placed any orders yet. Start shopping to see your order history here!
            </p>
            <Link
              to="/menu"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4 text-left text-amber-400">Order ID</th>
                  <th className="p-4 text-left text-amber-400">Customer</th>
                  <th className="p-4 text-left text-amber-400">Address</th>
                  <th className="p-4 text-left text-amber-400">Items</th>
                  <th className="p-4 text-left text-amber-400">Total Items</th>
                  <th className="p-4 text-left text-amber-400">Price</th>
                  <th className="p-4 text-left text-amber-400">Payment</th>
                  <th className="p-4 text-left text-amber-400">Status</th>
                  <th className="p-4 text-left text-amber-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const totalItems = order.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  );
                  const totalPrice =
                    order.total ??
                    order.items.reduce(
                      (sum, item) => sum + item.item.price * item.quantity,
                      0
                    );
                  const paymentMethod =
                    getPaymentMethodDetails(order.paymentMethod);
                  const status =
                    statusStyles[order.status] || statusStyles.pending;
                  const paymentStatus =
                    statusStyles[order.paymentStatus] || statusStyles.pending;

                  return (
                    <tr
                      key={order._id}
                      className="border-t border-gray-700 hover:bg-gray-800/50 transition"
                    >
                      <td className="p-4">#{order._id?.slice(-8)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiUser />
                          <div>
                            <p className="font-medium">
                              {order.firstName} {order.lastName}
                            </p>
                            <p className="text-xs text-gray-400">
                              {order.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <FiMapPin />
                          <div className="text-sm text-gray-300">
                            {order.address}, {order.city} - {order.zipCode}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 space-y-2">
                        {order.items.map((entry, index) => (
                          <div
                            key={`${order._id}-${index}`}
                            className="flex items-center gap-3"
                          >
                            <img
                              src={getImageSrc(entry.item, order._id)}
                              alt={entry.item.name}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                              onError={(e) => {
                                console.log('Frontend image failed to load:', e.target.src);
                                handleImageError(`${order._id}-${entry.item.name}`);
                              }}
                            />
                            <div>
                              <span className="block font-medium">
                                {entry.item.name}
                              </span>
                              <div className="text-sm text-gray-400 flex gap-2">
                                <span>₹{entry.item.price}</span>
                                <span>×{entry.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiBox /> <span>{totalItems}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold">
                        ₹{totalPrice.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <span className={paymentMethod.class}>
                            {paymentMethod.label}
                          </span>
                          <span
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${paymentStatus.bg} ${paymentStatus.color}`}
                          >
                            {paymentStatus.icon}
                            {paymentStatus.label}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <span
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${status.bg} ${status.color}`}
                          >
                            {status.icon}
                            {status.label}
                          </span>
                          {order.expectedDelivery && (
                            <div className="text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded">
                              Expected: {order.expectedDelivery}
                            </div>
                          )}
                          {order.deliveredAt && (
                            <div className="text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded">
                              Delivered: {order.deliveredAt}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {(order.status === 'delivered' || order.status === 'cancelled') && (
                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Delete Order"
                            >
                              <FiX />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
