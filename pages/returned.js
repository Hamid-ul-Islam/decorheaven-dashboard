import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Returned() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const deleteOrder = async (id) => {
    console.log(id);
    await axios.delete(`/api/orders?id=${id}`);
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  };
  return (
    <Layout>
      <h1>Returned</h1>
      <table className="basic ">
        <thead>
          <tr>
            <th>Returned ({orders.length})</th>
            <th>Date</th>
            <th>Total</th>
            <th>Recipient</th>
            <th>Phone</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders?.map(
              (order, idx) =>
                order.returned && (
                  <tr key={order._id}>
                    <td>{idx + 1}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>

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
                        onClick={() => deleteOrder(order._id)}
                        className="bg-red-500 font-semibold text-white px-3 py-1 rounded"
                      >
                        Delete
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
