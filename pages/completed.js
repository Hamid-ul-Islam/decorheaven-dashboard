import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Completed() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const returned = async (id) => {
    const res = await axios.post(`/api/orders/`, { id });
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  };
  return (
    <Layout>
      <h1>Completed</h1>
      <table className="basic ">
        <thead>
          <tr>
            <th>Completed ({orders.length})</th>
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
            orders?.map((order, idx) => (
              order.paid && !order.returned && <tr key={order._id}>
                <td>{idx + 1}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "YES" : "NO"}
                </td>
                <td>৳ {order.total}</td>
                <td>
                  <li>Name: {order.name}</li>
                  <li>
                    email: {order.email}
                    <br />
                  </li>
                  <li>
                    Address: {order.city} {order.postalCode} {order.country}
                    <br />
                    {order.streetAddress}
                  </li>
                </td>
                <td>{order.phone}</td>
                <td className="space-y-4">
                  {order?.line_items?.map((l, indx) => (
                    <div key={indx}>
                      <span className="px-3  rounded bg-violet-300 mr-2">
                        {l.quantity}
                      </span>
                      {l.price_data?.product_data.name}
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    onClick={() => returned(order._id)}
                    className="bg-red-200 px-3 text-red-700 py-1 rounded font-semibold"
                  >
                    {" "}
                    Returned
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
