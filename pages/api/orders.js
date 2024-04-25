import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    res.json(await Order.find().sort({ createdAt: -1 }));
  }

  if (method === "PUT") {
    const { id } = req.body;
    const orderDoc = await Order.updateOne({ _id: id }, { paid: true });
    console.log(orderDoc);
    res.json(orderDoc);
  }

  if (method === "POST") {
    const { id } = req.body;
    const orderDoc = await Order.updateOne(
      { _id: id },
      { returned: true },
      { upsert: true }
    );
    console.log(orderDoc);
    res.json(orderDoc);
  }

  if (method === "DELETE") {
    const { id } = req.query;
    const orderDoc = await Order.deleteOne({ _id: id });
    res.json(orderDoc);
  }
}
