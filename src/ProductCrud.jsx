import React, { useEffect, useState } from "react";
import axios from "axios";

const initialProductState = {
  name: "",
  discount_type: "percent",
  subcategory_id: 3,
  qty: 24,
  image: {},
  brand_id: "1",
  category_id: "3",
  original_price: "100",
  selling_price: "545",
  short_description: "",
  long_description: "",
  meta_title: "",
  meta_keyword: [],
  meta_description: "",
  discount_rate: "1",
  tags: [],
  images: [],
  specification_ans: [],
  specification: [],
  variants: [],
};

const ProductCrud = ({ token }) => {
  const [product, setProduct] = useState(initialProductState);
  const [products, setProducts] = useState([]);

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleProductUpload = async () => {
    try {
      const formData = new FormData();
      for (const key in product) {
        if (key === "image" && product[key]) {
          formData.append(key, product[key], product[key].name); // Append image with its name
        } else {
          formData.append(key, product[key]);
        }
      }

      const response = await axios.post(
        "https://sos.mdperves.com/api/vendor-store-product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set the Content-Type header
          },
        }
      );

      console.log("Product uploaded successfully:", response.data);

      // Reset the product state after successful upload
      setProduct(initialProductState);

      // Fetch the updated list of products
      fetchProducts();
    } catch (error) {

    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://sos.mdperves.com/api/vendor/product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.product.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleProductDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `https://sos.mdperves.com/api/vendor-delete-product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      fetchProducts();
    } catch (error) {

    }
  };

  return (
    <div>
      <h2>Product Upload</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
      </div>

      <button onClick={handleProductUpload}>Upload Product</button>

      <h2>Products List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}

            <button onClick={() => handleProductDelete(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCrud;
