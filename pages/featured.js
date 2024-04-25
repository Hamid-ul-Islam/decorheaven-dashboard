import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Featured = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const updateFeatured = async (id) => {
    axios.post("/api/featured", { id });
  };
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="font-bold text-xl">Featured Item</h1>
        <select
          onChange={(e) => updateFeatured(e.target.value)}
          className="outline-none border rounded p-2"
        >
          <option disabled selected value={null}>Select Featured Product</option>
          {products?.map((product) => (
            <option key={product._id} value={product._id}>{product.title}</option>
          ))}
        </select>
      </div>
    </Layout>
  );
};

export default Featured;
