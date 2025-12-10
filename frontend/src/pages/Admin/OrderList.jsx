import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );

  return (
    <div className="flex">
      <div className="w-1/4 p-3">
        <AdminMenu />
      </div>

      <div className="w-3/4 p-3 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="pl-2 py-1">ITEMS</th>
              <th className="pl-2 py-1">ID</th>
              <th className="pl-2 py-1">USER</th>
              <th className="pl-2 py-1">DATE</th>
              <th className="pl-2 py-1">TOTAL</th>
              <th className="pl-2 py-1">PAID</th>
              <th className="pl-2 py-1">DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-1">
                  {order.orderItems && order.orderItems.length > 0 ? (
                    <img
                      src={order.orderItems[0].image} // Cloudinary URL
                      alt={order._id}
                      className="w-20"
                    />
                  ) : (
                    <span>N/A</span>
                  )}
                </td>
                <td className="p-1">{order._id}</td>
                <td className="p-1">{order.user?.username || "N/A"}</td>
                <td className="p-1">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-1">${Number(order.totalPrice).toFixed(2)}</td>
                <td className="p-1">
                  <p
                    className={`p-1 text-center w-24 rounded-full ${
                      order.isPaid ? "bg-green-400" : "bg-red-400"
                    }`}
                  >
                    {order.isPaid ? "Completed" : "Pending"}
                  </p>
                </td>
                <td className="p-1">
                  <p
                    className={`p-1 text-center w-24 rounded-full ${
                      order.isDelivered ? "bg-green-400" : "bg-red-400"
                    }`}
                  >
                    {order.isDelivered ? "Completed" : "Pending"}
                  </p>
                </td>
                <td className="p-1">
                  <Link to={`/order/${order._id}`}>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded">
                      More
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
