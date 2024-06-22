import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch the product data by ID (replace with actual API call)
    const fetchProductData = async () => {
      // Simulate fetching data
      const productData = {
        productID: id,
        title: "Sample Product",
        category: "Business",
        description: "This is a sample product description.",
        thumbnail: "",
        status: "Active",
        reasons: "Sample reasons",
        countries: "Sample countries",
        alternatives: "Sample alternatives",
      };

      setProduct(productData);
    };

    fetchProductData();
  }, [id]);

  const handleDeleteProduct = async () => {
    // Simulate API call to delete the product
    try {
      // TODO: Add logic to delete the product (e.g., send DELETE request to the server)
      console.log("Product deleted:", id);

      // Simulate successful deletion
      setSuccess("Product successfully deleted.");
      setError("");

      // Redirect to the admin dashboard or product list page after deletion
      setTimeout(() => {
        navigate("/admin/myproducts");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError("Failed to delete the product.");
      setSuccess("");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <section className="delete-product">
      <div className="container">
        <h2>Delete Product</h2>
        {error && <p className="form__error-message">{error}</p>}
        {success && <p className="form__success-message">{success}</p>}
        {!success && (
          <>
            <div className="product-details">
              <p><strong>Product ID:</strong> {product.productID}</p>
              <p><strong>Title:</strong> {product.title}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Status:</strong> {product.status}</p>
              <p><strong>Reasons:</strong> {product.reasons}</p>
              <p><strong>Countries:</strong> {product.countries}</p>
              <p><strong>Alternatives:</strong> {product.alternatives}</p>
            </div>
            <button className="btn primary" onClick={handleDeleteProduct}>
              Confirm Delete
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default DeleteProduct;
