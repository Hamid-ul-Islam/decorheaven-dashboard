import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const delivered = async (id) => {
    await axios.put(`/api/orders/`, { id });
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  };
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Orders ({orders.length})</th>
            <th>Date</th>
            <th>Paid</th>
            <th>Total</th>
            <th>Recipient</th>
            <th>Phone</th>
            <th>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders?.map(
              (order, idx) =>
                !order.paid && (
                  <tr key={order._id}>
                    <td>{idx + 1}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td
                      className={order.paid ? "text-green-600" : "text-red-600"}
                    >
                      {order.paid ? "YES" : "NO"}
                    </td>
                    <td>৳ {order.total}</td>
                    <td className="h-[10px]">
                      Name: {order.name}
                     <br/> email: {order.email}
                      <br />
                      Address: {order.city} {order.postalCode} {order.country}
                      <br />
                      {order.streetAddress}
                    </td>
                    <td>{order.phone}</td>
                    <td className="space-y-4">
                      {order?.line_items?.map((l, indx) => (
                        <div>
                          <span className="px-3  rounded bg-violet-300 mr-2">
                            {l.quantity}
                          </span>
                          {l.price_data?.product_data.name}
                        </div>
                      ))}
                    </td>
                    <td>
                      <button
                        onClick={() => delivered(order._id)}
                        className="bg-teal-300 px-3 py-1 rounded text-teal-800 font-semibold"
                      >
                        {" "}
                        Delivered
                      </button>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </Layout>
  );
}
