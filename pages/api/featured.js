import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res, next) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "POST") {
    const { id } = req.body;
    const alreadyFeatured = await Product.findOne({ featured: true });
    await Product.updateOne({ _id: alreadyFeatured._id }, { featured: false });
    const featured = await Product.updateOne(
      { _id: id },
      { featured: true },
      { upsert: true }
    );

    res.json(featured);
  }
}
