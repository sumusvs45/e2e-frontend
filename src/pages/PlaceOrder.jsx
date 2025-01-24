/* eslint-disable react/prop-types */
/* Frontend: Order Cancel Button (React) */
import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);  // To store the fetched orders
  const [loading, setLoading] = useState(true);  // To show loading spinner

  // Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      const response = await axios.get('https://e2e-backend.onrender.com/api/v1/orders', {
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
      });

      if (response.data.success) {
        const ordersData = response.data.orders;
        ordersData.sort((a, b) => new Date(b.date) - new Date(a.date));

        const allOrders = ordersData.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            pstatus: item.status,
            userId: order.userId,
            orderId: order.orderId,
            date: order.date,
            address: order.address,
          }))
        );

        setOrders(allOrders);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("An error occurred while fetching orders:", error.message);
    } finally {
      setLoading(false);
    }
  };


  

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);  // Empty dependency array means it runs once when the component mounts

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h3 className="text-3xl font-semibold mb-6">Order Page</h3>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-bounce border-t-4 border-8 w-16 h-16 rounded-full border-black"></div>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders found</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Image</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Items</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={order.imgSrc ? `https://e2e-backend.onrender.com/images/${order.imgSrc}` : `${order.imgSrc}`}
                      className="w-[140px] h-[140px] object-cover rounded-lg"
                      alt={order.name}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">{order.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-2 rounded-full text-white text-sm ${
                        order.status === 'Delivered'
                          ? 'bg-green-500'
                          : order.status === 'Shipping'
                          ? 'bg-yellow-500'
                          : order.status === 'Packing'
                          ? 'bg-orange-500'
                          : order.status === 'Out for delivery'
                          ? 'bg-blue-500'
                          : order.status === 'Cancelled'
                          ? 'bg-gray-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.address ? (
                      <div>
                        <p className="font-semibold">
                          {order.address.firstName} {order.address.lastName}
                        </p>
                        <p>
                          {order.address.street}, {order.address.city}, {order.address.zipCode}
                        </p>
                      </div>
                    ) : (
                      <span className="text-gray-500">No address available</span>
                    )}
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
