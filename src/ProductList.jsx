import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  console.log(products);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://sos.mdperves.com/api/vendor-store-product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.product.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://sos.mdperves.com/api/vendor-store-product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product deleted successfully");
      fetchProducts();
    } catch (error) {}
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
